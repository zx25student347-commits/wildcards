package com.daw.wildcards.controllers.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.wildcards.models.CarritoCompra;
import com.daw.wildcards.services.CarritoService;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    private String getUsuarioActual() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public ResponseEntity<CarritoCompra> verCarrito() {
        CarritoCompra carrito = carritoService.obtenerCarritoPorUsuario(getUsuarioActual());
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/items")
    public ResponseEntity<CarritoCompra> anadirItem(@RequestBody Map<String, Integer> payload) {
        Integer cartaId = payload.get("cartaId");
        Integer cantidad = payload.getOrDefault("cantidad", 1);

        if (cartaId == null) {
            return ResponseEntity.badRequest().build();
        }

        CarritoCompra carritoActualizado = carritoService.anadirItem(getUsuarioActual(), cartaId, cantidad);
        return ResponseEntity.ok(carritoActualizado);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> eliminarItem(@PathVariable Integer itemId) {
        carritoService.eliminarItem(getUsuarioActual(), itemId);
        return ResponseEntity.noContent().build();
    }
}
