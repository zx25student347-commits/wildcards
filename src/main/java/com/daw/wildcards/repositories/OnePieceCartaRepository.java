package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.OnePieceCarta;

@Repository
public interface OnePieceCartaRepository extends JpaRepository<OnePieceCarta, Integer> {

    List<OnePieceCarta> findByColor(String color);
}
