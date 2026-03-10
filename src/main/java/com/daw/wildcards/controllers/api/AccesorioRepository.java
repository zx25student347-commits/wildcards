package com.daw.wildcards.controllers.api;

import com.daw.wildcards.models.Accesorios;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccesorioRepository extends JpaRepository<Accesorios, Integer> {
    @Query("SELECT a.nombre FROM Accesorios a WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :consulta, '%'))")
    List<String> findNombresByNombreContaining(String consulta, Pageable pageable);
}