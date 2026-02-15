package com.daw.wildcards.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.wildcards.models.CartaSet;
import com.daw.wildcards.repositories.CartaSetRepository;

@Service
public class SetService {

    private final CartaSetRepository setRepository;

    public SetService(CartaSetRepository setRepository) {
        this.setRepository = setRepository;
    }

    public List<CartaSet> listarTodos() {
        return setRepository.findAll();
    }

    public Optional<CartaSet> obtenerPorId(Integer id) {
        return setRepository.findById(id);
    }

    public CartaSet guardar(CartaSet set) {
        return setRepository.save(set);
    }

    public void eliminar(Integer id) {
        setRepository.deleteById(id);
    }
}
