package com.daw.wildcards.services;

import java.util.List;
import java.util.Optional;
import com.daw.wildcards.repositories.YugiohCartaRepository;
import org.springframework.stereotype.Service;

import com.daw.wildcards.models.Carta;
import com.daw.wildcards.models.MagicCarta;
import com.daw.wildcards.models.OnePieceCarta;
import com.daw.wildcards.models.PokemonCarta;
import com.daw.wildcards.models.YugiohCarta;
import com.daw.wildcards.repositories.CartaRepository;
import com.daw.wildcards.repositories.MagicCartaRepository;
import com.daw.wildcards.repositories.OnePieceCartaRepository;
import com.daw.wildcards.repositories.PokemonCartaRepository;

@Service
public class CartaService {

    private final YugiohCartaRepository yugiohCartaRepository;

    private OnePieceCartaRepository onePieceCartaRepository;
    private PokemonCartaRepository pokemonCartaRepository;
    private MagicCartaRepository magicCartaRepository;
    private CartaRepository cartaRepository;

    

    public CartaService(OnePieceCartaRepository onePieceCartaRepository, PokemonCartaRepository pokemonCartaRepository, MagicCartaRepository magicCartaRepository, CartaRepository cartaRepository, YugiohCartaRepository yugiohCartaRepository) {
        this.onePieceCartaRepository = onePieceCartaRepository;
        this.pokemonCartaRepository = pokemonCartaRepository;
        this.magicCartaRepository = magicCartaRepository;
        this.cartaRepository = cartaRepository;
        this.yugiohCartaRepository = yugiohCartaRepository;
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

    public List<YugiohCarta> obtenerTodasYu() {
        return yugiohCartaRepository.findAll();
    }

    // Métodos CRUD generales

    public List<Carta> listarTodas() {
        return cartaRepository.findAll();
    }

    public Optional<Carta> obtenerPorId(Integer id) {
        return cartaRepository.findById(id);
    }

    public Carta guardar(Carta carta) {
        return cartaRepository.save(carta);
    }

    public void eliminar(Integer id) {
        cartaRepository.deleteById(id);
    }

    

}
