package com.daw.wildcards.controllers.api;


import com.daw.wildcards.models.Carta;
import com.daw.wildcards.services.CartaService;
import com.daw.wildcards.services.FileSystemStorageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cartas") // Ruta base para la API
public class CartaController {

    private CartaService cartaService;
    private FileSystemStorageService storageService;

    public CartaController(CartaService cartaService, FileSystemStorageService storageService) {
        this.cartaService = cartaService;
        this.storageService = storageService;
    }




   @GetMapping("/juego/{juego}")
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
            case "yu-gi-oh!":
            case "yugioh":
                cartas = cartaService.obtenerTodasYu();
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

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Carta> crearCarta(
            @RequestPart("carta") Carta carta,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        
        if (file != null && !file.isEmpty()) {
            String filename = storageService.store(file);
            // Guardamos la ruta relativa para que HTML la pueda leer
            carta.setImagenUrl("/img/" + filename);
        }

        Carta nuevaCarta = cartaService.guardar(carta);
        return new ResponseEntity<>(nuevaCarta, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Carta> actualizarCarta(
            @PathVariable Integer id, 
            @RequestPart("carta") Carta carta,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        
        Optional<Carta> cartaExistente = cartaService.obtenerPorId(id);
        if (cartaExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        carta.setCartaId(id);
        if (file != null && !file.isEmpty()) {
            String filename = storageService.store(file);
            carta.setImagenUrl("/img/" + filename);
        } else {
            // Mantener la imagen anterior si no se sube una nueva
            carta.setImagenUrl(cartaExistente.get().getImagenUrl());
        }

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
