package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.EstadoPedido;
import com.daw.wildcards.models.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByCliente_Id(Long clienteId);

    List<Pedido> findByEstado(EstadoPedido estado);
}
