package com.daw.wildcards.services;

import com.daw.wildcards.models.Juego;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;
import com.daw.wildcards.repositories.JuegoRepository;

import java.text.Normalizer;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SugerenciaService {

    private final CartaRepository cartaRepository;
    private final AccesorioRepository accesorioRepository;
    private final JuegoRepository juegoRepository;

    public SugerenciaService(CartaRepository cartaRepository, AccesorioRepository accesorioRepository, JuegoRepository juegoRepository) {
        this.cartaRepository = cartaRepository;
        this.accesorioRepository = accesorioRepository;
        this.juegoRepository = juegoRepository;
    }

    private String normalizar(String texto) {
        if (texto == null) return "";
        return Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase();
    }

    public List<String> getSugerencias(String consulta) {
        String consultaNorm = normalizar(consulta);
        Pageable pageRequest = PageRequest.of(0, 5); // Límite para nombres de productos

        // 1. Sugerencias de productos (cartas y accesorios)
        List<String> sugerenciasCartas = cartaRepository.findNombresByNombreContainingIgnoreCase(consulta, pageRequest);
        List<String> sugerenciasAccesorios = accesorioRepository.findNombresByNombreContainingIgnoreCase(consulta, pageRequest);

        // 2. Sugerencias de juegos
        // Se asume que JuegoRepository está inyectado y tiene un método findAll()
        List<String> sugerenciasJuegos = juegoRepository.findAll().stream()
                .map(Juego::getNombre)
                .filter(nombre -> normalizar(nombre).contains(consultaNorm))
                .collect(Collectors.toList());

        // 3. Sugerencias de categorías (Solo generales, los juegos ya vienen de la base de datos)
        List<String> categorias = List.of("Cartas", "Accesorios");
        List<String> sugerenciasCategorias = categorias.stream()
                .filter(cat -> normalizar(cat).contains(consultaNorm))
                .collect(Collectors.toList());

        // 4. Combinar todas las sugerencias, dando prioridad a categorías y juegos
        return Stream.of(
                        sugerenciasCategorias.stream(),
                        sugerenciasJuegos.stream(),
                        sugerenciasCartas.stream(),
                        sugerenciasAccesorios.stream())
                .flatMap(s -> s)
                .distinct()
                .limit(8) // Limitar el número total de sugerencias para una mejor UX
                .collect(Collectors.toList());
    }
 }