package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.YugiohCarta;

@Repository
public interface YugiohCartaRepository extends JpaRepository<YugiohCarta, Integer> {

    List<YugiohCarta> findByNivel(Integer nivel);
}
