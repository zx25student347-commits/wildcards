package com.daw.wildcards.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.CarritoCompra;

@Repository
public interface CarritoCompraRepository extends JpaRepository<CarritoCompra, Integer> {

    Optional<CarritoCompra> findByClienteIdAndCarritoActivoTrue(Integer clienteId);

    Optional<CarritoCompra> findBySessionIdAndCarritoActivoTrue(String sessionId);
}
