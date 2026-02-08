package com.daw.wildcards.repositories;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.Inventario;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Integer> {

    List<Inventario> findByCarta_CartaId(Integer cartaId);

    List<Inventario> findByCondicionAndIdioma(String condicion, String idioma);

    List<Inventario> findByPrecioBetween(BigDecimal min, BigDecimal max);
}

