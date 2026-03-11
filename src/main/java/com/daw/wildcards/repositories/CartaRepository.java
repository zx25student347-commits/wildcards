package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daw.wildcards.models.Carta;

public interface CartaRepository extends JpaRepository<Carta, Integer> {

    @Query("SELECT c.nombre FROM Carta c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :consulta, '%'))")
    List<String> findNombresByNombreContainingIgnoreCase(@Param("consulta") String consulta, Pageable pageable);

    List<Carta> findByNombreContainingIgnoreCase(String nombre);
}