package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.MagicCarta;

@Repository
public interface MagicCartaRepository extends JpaRepository<MagicCarta, Integer> {

    List<MagicCarta> findByColorsContaining(String color);
}

