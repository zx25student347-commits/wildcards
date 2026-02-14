package com.daw.wildcards.controllers.api;


import com.daw.wildcards.models.Carta;
import com.daw.wildcards.services.CartaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cartas") // Ruta base para la API
public class CartaController {

    private CartaService cartaService;
   

    

    public CartaController(CartaService cartaService) {
        this.cartaService = cartaService;
    }




   @GetMapping("/{juego}")
    public ResponseEntity<List<? extends Carta>> obtenerCartasPorJuego(@PathVariable String juego) {
        List<? extends Carta> cartas;

        switch (juego.toLowerCase()) {
            case "onepiece":
                cartas = cartaService.obtenerTodasOne();
                break;
            case "pokemon":
                cartas = cartaService.obtenerTodasPk();
                break;
            case "magic":
                cartas = cartaService.obtenerTodasMag();
                break;
            default:
                return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cartas);
    }
    
    

    @GetMapping
    public ResponseEntity<List<Carta>> listarTodas() {
        return ResponseEntity.ok(cartaService.listarTodas());
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<Carta> obtenerPorId(@PathVariable Integer id) {
        Optional<Carta> carta = cartaService.obtenerPorId(id);
        return carta.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Carta> crearCarta(@RequestBody Carta carta) {
        Carta nuevaCarta = cartaService.guardar(carta);
        return new ResponseEntity<>(nuevaCarta, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carta> actualizarCarta(@PathVariable Integer id, @RequestBody Carta carta) {
        if (cartaService.obtenerPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        carta.setCartaId(id);
        Carta cartaActualizada = cartaService.guardar(carta);
        return ResponseEntity.ok(cartaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarta(@PathVariable Integer id) {
        if (cartaService.obtenerPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        cartaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

   

}
