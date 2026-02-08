package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.Carta;

@Repository
public interface CartaRepository extends JpaRepository<Carta, Integer> {

    List<Carta> findByNombreContainingIgnoreCase(String nombre);

    List<Carta> findByJuego_JuegoId(Integer juegoId);

    List<Carta> findBySet_SetId(Integer setId);

    List<Carta> findByRareza(String rareza);
}

