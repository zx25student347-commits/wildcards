package com.daw.wildcards.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.models.CarritoCompra;
import com.daw.wildcards.models.CarritoItem;
import com.daw.wildcards.models.Carta;
import com.daw.wildcards.models.EstadoPedido;
import com.daw.wildcards.models.Pedido;
import com.daw.wildcards.models.PedidoItem;
import com.daw.wildcards.models.Usuario;
import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;
import com.daw.wildcards.repositories.PedidoRepository;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final CarritoService carritoService;
    private final UsuarioService usuarioService;
    private final CartaRepository cartaRepository;
    private final AccesorioRepository accesorioRepository;

    public PedidoService(PedidoRepository pedidoRepository, CarritoService carritoService,
            UsuarioService usuarioService, CartaRepository cartaRepository, 
            AccesorioRepository accesorioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.carritoService = carritoService;
        this.usuarioService = usuarioService;
        this.cartaRepository = cartaRepository;
        this.accesorioRepository = accesorioRepository;
    }

    /**
     * Crea un nuevo pedido a partir del carrito de compras activo de un usuario.
     * @param username El nombre de usuario del cliente.
     * @return El pedido creado.
     */
    @Transactional
    public Pedido crearPedidoDesdeCarrito(String username) {
        // 1. Obtener el carrito del usuario
        CarritoCompra carrito = carritoService.obtenerCarritoPorUsuario(username);
        if (carrito.getItems() == null || carrito.getItems().isEmpty()) {
            throw new IllegalStateException("El carrito está vacío, no se puede crear un pedido.");
        }

        // 2. Crear el objeto Pedido
        Pedido pedido = new Pedido();
        pedido.setCliente(carrito.getCliente());
        pedido.setFechaPedido(LocalDateTime.now());
        pedido.setEstado(EstadoPedido.PAGADO); // Estado inicial tras un pago exitoso

        // 3. Convertir CarritoItems a PedidoItems
        List<PedidoItem> pedidoItems = carrito.getItems().stream().map(carritoItem -> {
            PedidoItem pedidoItem = new PedidoItem();
            pedidoItem.setPedido(pedido);

            if (carritoItem.getCarta() != null) {
                pedidoItem.setCarta(carritoItem.getCarta());

                // Actualizar stock de la carta
                Carta carta = cartaRepository.findById(carritoItem.getCarta().getCartaId())
                        .orElseThrow(() -> new RuntimeException("Error interno: La carta del carrito no existe."));
                
                if (carta.getStock() < carritoItem.getCantidad()) {
                    // Esto causa un rollback de la transacción. En un escenario real, esto requeriría
                    // un proceso de reembolso ya que el pago ya se procesó.
                    throw new IllegalStateException("Stock insuficiente para la carta: " + carta.getNombre());
                }
                carta.setStock(carta.getStock() - carritoItem.getCantidad());

            } else if (carritoItem.getAccesorio() != null) {
                pedidoItem.setAccesorio(carritoItem.getAccesorio());

                // Actualizar stock del accesorio
                Accesorios accesorio = accesorioRepository.findById(carritoItem.getAccesorio().getAccesorioId())
                        .orElseThrow(() -> new RuntimeException("Error interno: El accesorio del carrito no existe."));
                
                if (accesorio.getStock() < carritoItem.getCantidad()) {
                    throw new IllegalStateException("Stock insuficiente para el accesorio: " + accesorio.getNombre());
                }
                accesorio.setStock(accesorio.getStock() - carritoItem.getCantidad());
            }

            pedidoItem.setCantidadCompra(carritoItem.getCantidad());
            pedidoItem.setPrecioCompra(carritoItem.getPrecioUnidad());
            return pedidoItem;
        }).collect(Collectors.toList());

        pedido.setItems(pedidoItems);

        // 4. Calcular el total
        BigDecimal total = pedidoItems.stream()
                .map(item -> item.getPrecioCompra().multiply(new BigDecimal(item.getCantidadCompra())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        pedido.setTotal(total);

        // 5. Guardar el pedido (los items se guardan por cascada)
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // 6. Limpiar/desactivar el carrito
        carritoService.limpiarCarrito(username);

        return pedidoGuardado;
    }

    /**
     * Valida si hay stock suficiente para todos los productos en el carrito de un usuario.
     * @param username El nombre de usuario.
     * @throws IllegalStateException si no hay stock para algún producto o el carrito está vacío.
     */
    @Transactional(readOnly = true) // Es una operación de solo lectura, no modifica nada.
    public void validarStockCarrito(String username) {
        CarritoCompra carrito = carritoService.obtenerCarritoPorUsuario(username);
        if (carrito.getItems() == null || carrito.getItems().isEmpty()) {
            throw new IllegalStateException("El carrito está vacío, no se puede proceder al pago.");
        }

        for (CarritoItem item : carrito.getItems()) {
            if (item.getCarta() != null) {
                Carta carta = cartaRepository.findById(item.getCarta().getCartaId())
                        .orElseThrow(() -> new RuntimeException("La carta con ID " + item.getCarta().getCartaId() + " no existe."));
                if (carta.getStock() < item.getCantidad()) {
                    throw new IllegalStateException("Stock insuficiente para la carta: '" + carta.getNombre() + "'. Disponible: " + carta.getStock() + ", en carrito: " + item.getCantidad());
                }
            } else if (item.getAccesorio() != null) {
                Accesorios accesorio = accesorioRepository.findById(item.getAccesorio().getAccesorioId())
                        .orElseThrow(() -> new RuntimeException("El accesorio con ID " + item.getAccesorio().getAccesorioId() + " no existe."));
                if (accesorio.getStock() < item.getCantidad()) {
                    throw new IllegalStateException("Stock insuficiente para el accesorio: '" + accesorio.getNombre() + "'. Disponible: " + accesorio.getStock() + ", en carrito: " + item.getCantidad());
                }
            }
        }
    }

    public List<Pedido> obtenerPedidosDeUsuario(String username) {
        Usuario usuario = usuarioService.buscarPorUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
        return pedidoRepository.findByCliente_Id(usuario.getId());
    }

    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> obtenerPorId(Integer id) {
        return pedidoRepository.findById(id);
    }

    public Pedido actualizarEstadoPedido(Integer pedidoId, EstadoPedido nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con id: " + pedidoId));
        pedido.setEstado(nuevoEstado);
        return pedidoRepository.save(pedido);
    }

    public void eliminarPedido(Integer pedidoId) {
        if (!pedidoRepository.existsById(pedidoId)) {
            throw new RuntimeException("Pedido no encontrado con id: " + pedidoId);
        }
        pedidoRepository.deleteById(pedidoId);
    }
}
