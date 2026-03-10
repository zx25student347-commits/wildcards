package com.daw.wildcards.controllers.api;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SugerenciaService {

    private final CartaRepository cartaRepository;
    private final AccesorioRepository accesorioRepository;

    public SugerenciaService(CartaRepository cartaRepository, AccesorioRepository accesorioRepository) {
        this.cartaRepository = cartaRepository;
        this.accesorioRepository = accesorioRepository;
    }

//     public List<String> getSugerencias(String consulta) {
//         Pageable pageRequest = PageRequest.of(0, 5);

//         List<String> sugerenciasCartas = cartaRepository.findNombresByNombreContaining(consulta, pageRequest);
//         List<String> sugerenciasAccesorios = accesorioRepository.findNombresByNombreContaining(consulta, pageRequest);

//         return Stream.concat(sugerenciasCartas.stream(), sugerenciasAccesorios.stream())
//                 .distinct()
//                 .collect(Collectors.toList());
//     }
 }