package com.daw.wildcards.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.CarritoItem;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Integer> {

    List<CarritoItem> findByCarrito_CarritoId(Integer carritoId);

    Optional<CarritoItem> findByCarrito_CarritoIdAndCarta_CartaId(
            Integer carritoId,
            Integer cartaId
    );
}

