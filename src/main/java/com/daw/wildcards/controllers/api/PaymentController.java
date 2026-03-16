package com.daw.wildcards.controllers.api;
import com.daw.wildcards.services.CarritoService;
import com.daw.wildcards.services.PedidoService;
import com.daw.wildcards.models.CarritoCompra;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final CarritoService carritoService;
    private final PedidoService pedidoService;
    private final String webhookSecret;

    public PaymentController(CarritoService carritoService, PedidoService pedidoService, @Value("${stripe.webhook.secret}") String webhookSecret) {
        this.carritoService = carritoService;
        this.pedidoService = pedidoService;
        this.webhookSecret = webhookSecret;
    }

    // Clase simple para la respuesta JSON
    private static class CreatePaymentResponse {
        private String clientSecret;
        public CreatePaymentResponse(String clientSecret) {
            this.clientSecret = clientSecret;
        }
        public String getClientSecret() { return clientSecret; }
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body("Usuario no autenticado");
        }
        String username = authentication.getName();

        // 1. Validar stock ANTES de intentar crear la intención de pago
        try {
            pedidoService.validarStockCarrito(username);
        } catch (IllegalStateException e) {
            // Si no hay stock o el carrito está vacío, devolvemos un 400 Bad Request con el mensaje de error.
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        CarritoCompra carrito = carritoService.obtenerCarritoPorUsuario(username);

        // Stripe requiere el monto en la unidad monetaria más pequeña (céntimos para EUR)
        long amountInCents = carrito.getPrecioTotal().multiply(new java.math.BigDecimal(100)).longValue();

        // Esta validación se mantiene como una segunda capa de seguridad.
        if (amountInCents <= 0) { 
            return ResponseEntity.badRequest().body("El carrito está vacío o el total es cero.");
        }

        try {
            PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("eur")
                    // Añadimos metadatos para identificar al usuario en el webhook
                    .putMetadata("username", username)
                    .addPaymentMethodType("card")
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            return ResponseEntity.ok(new CreatePaymentResponse(paymentIntent.getClientSecret()));
        } catch (StripeException e) {
            return ResponseEntity.status(500).body("Error al crear la intención de pago: " + e.getMessage());
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(400).body("Error al verificar la firma del webhook.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Webhook error.");
        }

        // Manejar el evento
        switch (event.getType()) {
            case "payment_intent.succeeded":
                PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElse(null);
                if (paymentIntent == null) {
                    // Error en la deserialización (posible desajuste de versiones API)
                    break;
                }
                String username = paymentIntent.getMetadata().get("username");
                if (username != null) {
                    // El pago fue exitoso, creamos el pedido final en nuestro sistema
                    try {
                        pedidoService.crearPedidoDesdeCarrito(username);
                    } catch (IllegalStateException e) {
                        // Es posible que el frontend ya haya creado el pedido y vaciado el carrito.
                        // Ignoramos el error para que Stripe reciba el 200 OK.
                        System.out.println("Aviso: " + e.getMessage());
                    }
                }
                break;
            case "payment_intent.payment_failed":
                // El pago falló. Podemos registrar el fallo o notificar al usuario.
                break;
            default:
                System.out.println("Evento no manejado: " + event.getType());
        }

        return ResponseEntity.ok("");
    }
}
