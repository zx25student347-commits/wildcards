package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.PokemonCarta;

@Repository
public interface PokemonCartaRepository extends JpaRepository<PokemonCarta, Integer> {

    List<PokemonCarta> findByPokemonTipo(String pokemonTipo);
}

