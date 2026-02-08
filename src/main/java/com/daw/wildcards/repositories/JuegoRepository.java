package com.daw.wildcards.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.Juego;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Integer> {
    Optional<Juego> findByNombreIgnoreCase(String nombre);
}
