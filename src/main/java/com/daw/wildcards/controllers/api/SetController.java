package com.daw.wildcards.controllers.api;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.wildcards.models.CartaSet;
import com.daw.wildcards.services.SetService;

@RestController
@RequestMapping("/api/sets")
public class SetController {

    private final SetService setService;

    public SetController(SetService setService) {
        this.setService = setService;
    }

    @GetMapping
    public ResponseEntity<List<CartaSet>> listarSets() {
        return ResponseEntity.ok(setService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<CartaSet> crearSet(@RequestBody CartaSet set) {
        return new ResponseEntity<>(setService.guardar(set), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSet(@PathVariable Integer id) {
        if (setService.obtenerPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        setService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
