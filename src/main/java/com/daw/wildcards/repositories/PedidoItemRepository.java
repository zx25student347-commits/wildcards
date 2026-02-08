package com.daw.wildcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.daw.wildcards.models.PedidoItem;

@Repository
public interface PedidoItemRepository extends JpaRepository<PedidoItem, Integer> {

    List<PedidoItem> findByPedido_PedidoId(Integer pedidoId);
}

