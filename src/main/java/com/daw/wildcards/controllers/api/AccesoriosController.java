package com.daw.wildcards.controllers.api;

import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.services.AccesoriosService;
import com.daw.wildcards.services.FileSystemStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/accesorios")
public class AccesoriosController {

    private final AccesoriosService accesoriosService;
    private final FileSystemStorageService storageService;

    public AccesoriosController(AccesoriosService accesoriosService, FileSystemStorageService storageService) {
        this.accesoriosService = accesoriosService;
        this.storageService = storageService;
    }

    @GetMapping
    public ResponseEntity<List<Accesorios>> listarTodos() {
        List<Accesorios> accesorios = accesoriosService.findAll();
        return ResponseEntity.ok(accesorios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accesorios> obtenerPorId(@PathVariable Integer id) {
        return accesoriosService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Accesorios> crearAccesorio(
            @RequestPart("accesorio") Accesorios accesorio,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        if (file != null && !file.isEmpty()) {
            String filename = storageService.store(file);
            accesorio.setImagenUrl("/img/" + filename);
        }

        Accesorios nuevoAccesorio = accesoriosService.save(accesorio);
        return new ResponseEntity<>(nuevoAccesorio, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAccesorio(@PathVariable Integer id) {
        if (accesoriosService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        accesoriosService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
