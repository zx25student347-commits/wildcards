package com.daw.wildcards.controllers.api;


import com.daw.wildcards.models.Carta;
import com.daw.wildcards.services.CartaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
