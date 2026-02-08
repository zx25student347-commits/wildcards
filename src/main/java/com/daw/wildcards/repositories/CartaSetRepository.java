package com.daw.wildcards.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.CartaSet;

@Repository
public interface CartaSetRepository extends JpaRepository<CartaSet, Integer> {

    List<CartaSet> findByJuego_JuegoId(Integer juegoId);

    Optional<CartaSet> findByCodigoSet(String codigoSet);
}

