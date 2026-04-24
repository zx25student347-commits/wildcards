package com.daw.wildcards.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daw.wildcards.models.CarritoCompra;
import com.daw.wildcards.models.CarritoItem;
import com.daw.wildcards.models.Carta;
import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.models.Usuario;
import com.daw.wildcards.repositories.CarritoCompraRepository;
import com.daw.wildcards.repositories.CarritoItemRepository;

@Service
public class CarritoService {

    private final CarritoCompraRepository carritoRepository;
    private final CarritoItemRepository carritoItemRepository;
    private final UsuarioService usuarioService;
    private final CartaService cartaService; // Mantener para compatibilidad con actualizarCantidad
    private final AccesoriosService accesoriosService;

    public CarritoService(CarritoCompraRepository carritoRepository, 
                          CarritoItemRepository carritoItemRepository,
                          UsuarioService usuarioService,
                          CartaService cartaService,
                          AccesoriosService accesoriosService) {
        this.carritoRepository = carritoRepository;
        this.carritoItemRepository = carritoItemRepository;
        this.usuarioService = usuarioService;
        this.cartaService = cartaService;
        this.accesoriosService = accesoriosService;
    }

    public CarritoCompra obtenerCarritoPorUsuario(String username) {
        Usuario usuario = usuarioService.buscarPorUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return carritoRepository.findByCliente_IdAndCarritoActivoTrue(usuario.getId())
                .orElseGet(() -> crearNuevoCarrito(usuario));
    }

    private CarritoCompra crearNuevoCarrito(Usuario usuario) {
        CarritoCompra carrito = new CarritoCompra();
        carrito.setCliente(usuario);
        carrito.setFechaCreacion(LocalDateTime.now());
        carrito.setUpdatedAt(LocalDateTime.now());
        carrito.setCarritoActivo(true);
        carrito.setItems(new ArrayList<>());
        return carritoRepository.save(carrito);
    }

    @Transactional
    public CarritoCompra anadirItem(String username, Integer cartaId, Integer accesorioId, Integer cantidad) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);
    
        if (cartaId == null && accesorioId == null) {
            throw new IllegalArgumentException("Debe proporcionar un cartaId o un accesorioId.");
        }
    
        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(item -> 
                    (cartaId != null && item.getCarta() != null && item.getCarta().getCartaId().equals(cartaId)) ||
                    (accesorioId != null && item.getAccesorio() != null && item.getAccesorio().getAccesorioId().equals(accesorioId))
                )
                .findFirst();

        // Gestionar Stock del producto
        if (cartaId != null) {
            Carta carta = cartaService.obtenerPorId(cartaId).orElseThrow(() -> new RuntimeException("Carta no encontrada"));
            if (carta.getStock() < cantidad) throw new RuntimeException("Stock insuficiente");
            carta.setStock(carta.getStock() - cantidad);
            cartaService.guardar(carta);
        } else {
            Accesorios acc = accesoriosService.findById(accesorioId).orElseThrow(() -> new RuntimeException("Accesorio no encontrado"));
            if (acc.getStock() < cantidad) throw new RuntimeException("Stock insuficiente");
            acc.setStock(acc.getStock() - cantidad);
            accesoriosService.save(acc);
        }
    
        if (itemExistente.isPresent()) {
            CarritoItem item = itemExistente.get();
            item.setCantidad(item.getCantidad() + cantidad);
            carritoItemRepository.save(item);
        } else {
            CarritoItem newItem = new CarritoItem();
            newItem.setCarrito(carrito);
            newItem.setCantidad(cantidad);
    
            if (cartaId != null) {
                Carta carta = cartaService.obtenerPorId(cartaId)
                        .orElseThrow(() -> new RuntimeException("Carta no encontrada con ID: " + cartaId));
                newItem.setCarta(carta);
                newItem.setPrecioUnidad(BigDecimal.valueOf(carta.getPrecio()));
            } else { // accesorioId != null
                Accesorios accesorio = accesoriosService.findById(accesorioId)
                        .orElseThrow(() -> new RuntimeException("Accesorio no encontrado con ID: " + accesorioId));
                newItem.setAccesorio(accesorio);
                newItem.setPrecioUnidad(BigDecimal.valueOf(accesorio.getPrecio()));
            }
    
            carrito.getItems().add(newItem);
            carritoItemRepository.save(newItem);
        }
    
        carrito.setUpdatedAt(LocalDateTime.now());
        return carritoRepository.save(carrito);
    }

    @Transactional
    public CarritoCompra actualizarCantidad(String username, Integer cartaId, Integer accesorioId, Integer cantidad) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);

        Optional<CarritoItem> itemOptional = carrito.getItems().stream()
                .filter(item -> 
                    (cartaId != null && item.getCarta() != null && item.getCarta().getCartaId().equals(cartaId)) ||
                    (accesorioId != null && item.getAccesorio() != null && item.getAccesorio().getAccesorioId().equals(accesorioId))
                )
                .findFirst();

        if (itemOptional.isPresent()) {
            CarritoItem item = itemOptional.get();
            int diferencia = cantidad - item.getCantidad();
            
            // Actualizar stock del producto físico
            if (item.getCarta() != null) {
                Carta carta = item.getCarta();
                if (carta.getStock() < diferencia) throw new RuntimeException("No hay stock suficiente");
                carta.setStock(carta.getStock() - diferencia);
                cartaService.guardar(carta);
            } else if (item.getAccesorio() != null) {
                Accesorios acc = item.getAccesorio();
                if (acc.getStock() < diferencia) throw new RuntimeException("No hay stock suficiente");
                acc.setStock(acc.getStock() - diferencia);
                accesoriosService.save(acc);
            }

            if (cantidad <= 0) {
                eliminarItem(username, item.getCarritoItemId());
            } else {
                item.setCantidad(cantidad);
                carritoItemRepository.save(item);
            }
            // Refrescamos el carrito de la base de datos para devolver el estado actual
            return carritoRepository.findById(carrito.getCarritoId()).orElse(carrito);
        } else {
            throw new RuntimeException("El producto no se encuentra en el carrito");
        }
    }

    @Transactional
    public void eliminarItem(String username, Integer itemId) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);
        
        // Verificar que el item pertenece al carrito del usuario
        Optional<CarritoItem> itemToDelete = carrito.getItems().stream()
                .filter(item -> item.getCarritoItemId().equals(itemId))
                .findFirst();

        if (itemToDelete.isPresent()) {
            CarritoItem item = itemToDelete.get();
            // Devolver stock al producto
            if (item.getCarta() != null) {
                item.getCarta().setStock(item.getCarta().getStock() + item.getCantidad());
                cartaService.guardar(item.getCarta());
            } else if (item.getAccesorio() != null) {
                item.getAccesorio().setStock(item.getAccesorio().getStock() + item.getCantidad());
                accesoriosService.save(item.getAccesorio());
            }

            carrito.getItems().remove(itemToDelete.get());
            carritoItemRepository.delete(itemToDelete.get());
            carrito.setUpdatedAt(LocalDateTime.now());
            carritoRepository.save(carrito);
        }
    }

    @Transactional
    public void limpiarCarrito(String username) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);
        
        // Eliminar todos los items del carrito
        if (carrito.getItems() != null && !carrito.getItems().isEmpty()) {
            carritoItemRepository.deleteAll(carrito.getItems());
            carrito.getItems().clear();
        }
        
        // Desactivar el carrito para que se cree uno nuevo la próxima vez
        carrito.setCarritoActivo(false);
        carrito.setUpdatedAt(LocalDateTime.now());
        carritoRepository.save(carrito);
    }
}
