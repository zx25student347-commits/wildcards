package com.daw.wildcards.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.daw.wildcards.models.Carta;

public interface CartaRepository extends JpaRepository<Carta, Integer> {
}