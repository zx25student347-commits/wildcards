package com.daw.wildcards.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.wildcards.models.MagicCarta;
import com.daw.wildcards.models.OnePieceCarta;
import com.daw.wildcards.models.PokemonCarta;
import com.daw.wildcards.repositories.MagicCartaRepository;
import com.daw.wildcards.repositories.OnePieceCartaRepository;
import com.daw.wildcards.repositories.PokemonCartaRepository;

@Service
public class CartaService {

    private OnePieceCartaRepository onePieceCartaRepository;
    private PokemonCartaRepository pokemonCartaRepository;
    private MagicCartaRepository magicCartaRepository;

    

    public CartaService(OnePieceCartaRepository onePieceCartaRepository,PokemonCartaRepository pokemonCartaRepository, MagicCartaRepository magicCartaRepository) {
        this.onePieceCartaRepository = onePieceCartaRepository;
        this.pokemonCartaRepository = pokemonCartaRepository;
        this.magicCartaRepository = magicCartaRepository;
    }

    public List<OnePieceCarta> obtenerTodasOne() {
        
        return onePieceCartaRepository.findAll();
    }

    public List<PokemonCarta> obtenerTodasPk() {
        
        return pokemonCartaRepository.findAll();
    }

    public List<MagicCarta> obtenerTodasMag() {
        
        return magicCartaRepository.findAll();
    }

}
