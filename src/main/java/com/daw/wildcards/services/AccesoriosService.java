package com.daw.wildcards.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.repositories.AccesorioRepository;

@Service
public class AccesoriosService {

    private final AccesorioRepository accesorioRepository;

    public AccesoriosService(AccesorioRepository accesorioRepository) {
        this.accesorioRepository = accesorioRepository;
    }

    public List<Accesorios> findAll() {
        return accesorioRepository.findAll();
    }

    public Optional<Accesorios> findById(Integer id) {
        return accesorioRepository.findById(id);
    }

    public Accesorios save(Accesorios accesorio) {
        return accesorioRepository.save(accesorio);
    }

    public void delete(Integer id) {
        accesorioRepository.deleteById(id);
    }
}
