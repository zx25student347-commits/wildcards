package com.daw.wildcards.controllers.api;

import com.daw.wildcards.models.Carta;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartaRepository extends JpaRepository<Carta, Integer> {
    @Query("SELECT c.nombre FROM Carta c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :consulta, '%'))")
    List<String> findNombresByNombreContaining(String consulta, Pageable pageable);
}