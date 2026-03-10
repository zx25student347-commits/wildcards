package com.daw.wildcards.controllers.api;

import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/productos")
public class ProductoApiController {


    private CartaRepository cartaRepository;
    private AccesorioRepository accesorioRepository;

    public ProductoApiController(CartaRepository cartaRepository, AccesorioRepository accesorioRepository) {
        this.cartaRepository = cartaRepository;
        this.accesorioRepository = accesorioRepository;
    }

    @GetMapping("/sugerencias")
    public List<String> getSugerencias(@RequestParam("q") String consulta) {
        // Limitar el número de resultados por cada categoría para mejorar el rendimiento
        Pageable pageRequest = PageRequest.of(0, 5);

        // Buscar en cartas y accesorios
        List<String> sugerenciasCartas = cartaRepository.findNombresByNombreContaining(consulta, pageRequest);
        List<String> sugerenciasAccesorios = accesorioRepository.findNombresByNombreContaining(consulta, pageRequest);

        // Combinar, eliminar duplicados y devolver el resultado. El total será como máximo 10.
        return Stream.concat(sugerenciasCartas.stream(), sugerenciasAccesorios.stream())
                .distinct()
                .collect(Collectors.toList());
    }
}