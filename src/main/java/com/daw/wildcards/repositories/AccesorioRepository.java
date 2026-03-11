package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.Accesorios;

@Repository
public interface AccesorioRepository extends JpaRepository<Accesorios, Integer> {

    @Query("SELECT a.nombre FROM Accesorios a WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :consulta, '%'))")
    List<String> findNombresByNombreContainingIgnoreCase(@Param("consulta") String consulta, Pageable pageable);

    List<Accesorios> findByNombreContainingIgnoreCase(String nombre);
}
