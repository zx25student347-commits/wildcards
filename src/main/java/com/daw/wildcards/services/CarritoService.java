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
import com.daw.wildcards.models.Usuario;
import com.daw.wildcards.repositories.CarritoCompraRepository;
import com.daw.wildcards.repositories.CarritoItemRepository;

@Service
public class CarritoService {

    private final CarritoCompraRepository carritoRepository;
    private final CarritoItemRepository carritoItemRepository;
    private final UsuarioService usuarioService;
    private final CartaService cartaService;

    public CarritoService(CarritoCompraRepository carritoRepository, 
                          CarritoItemRepository carritoItemRepository,
                          UsuarioService usuarioService,
                          CartaService cartaService) {
        this.carritoRepository = carritoRepository;
        this.carritoItemRepository = carritoItemRepository;
        this.usuarioService = usuarioService;
        this.cartaService = cartaService;
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
    public CarritoCompra anadirItem(String username, Integer cartaId, Integer cantidad) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);
        Carta carta = cartaService.obtenerPorId(cartaId)
                .orElseThrow(() -> new RuntimeException("Carta no encontrada"));

        // Buscar si el item ya existe en el carrito
        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(item -> item.getCarta().getCartaId().equals(cartaId))
                .findFirst();

        if (itemExistente.isPresent()) {
            CarritoItem item = itemExistente.get();
            item.setCantidad(item.getCantidad() + cantidad);
            carritoItemRepository.save(item);
        } else {
            CarritoItem newItem = new CarritoItem();
            newItem.setCarrito(carrito);
            newItem.setCarta(carta);
            newItem.setCantidad(cantidad);
            newItem.setPrecioUnidad(BigDecimal.valueOf(carta.getPrecio()));
            newItem.setCondicion("NM"); // Default Near Mint
            // newItem.setIdioma("ES");    // Default Español
            
            carrito.getItems().add(newItem);
            carritoItemRepository.save(newItem);
        }

        carrito.setUpdatedAt(LocalDateTime.now());
        return carritoRepository.save(carrito);
    }

    @Transactional
    public void eliminarItem(String username, Integer itemId) {
        CarritoCompra carrito = obtenerCarritoPorUsuario(username);
        
        // Verificar que el item pertenece al carrito del usuario
        Optional<CarritoItem> itemToDelete = carrito.getItems().stream()
                .filter(item -> item.getCarritoItemId().equals(itemId))
                .findFirst();

        if (itemToDelete.isPresent()) {
            carrito.getItems().remove(itemToDelete.get());
            carritoItemRepository.delete(itemToDelete.get());
            carrito.setUpdatedAt(LocalDateTime.now());
            carritoRepository.save(carrito);
        }
    }
}
