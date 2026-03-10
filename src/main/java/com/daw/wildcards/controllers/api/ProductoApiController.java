package com.daw.wildcards.controllers.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoApiController {

    private final SugerenciaService sugerenciaService;

    public ProductoApiController(SugerenciaService sugerenciaService) {
        this.sugerenciaService = sugerenciaService;
    }

    // @GetMapping("/sugerencias")
    // public List<String> getSugerencias(@RequestParam("q") String consulta) {
    //     return sugerenciaService.getSugerencias(consulta);
    // }
}