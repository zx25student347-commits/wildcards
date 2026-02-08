package com.daw.wildcards.models;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedido_items")
public class PedidoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pedidoItemId;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "carta_id")
    private Carta carta;

    private String calidadCompra;
    private BigDecimal precioCompra;
   
   
    public PedidoItem() {
    }


    public PedidoItem(Pedido pedido, Carta carta, String calidadCompra, BigDecimal precioCompra) {
        this.pedido = pedido;
        this.carta = carta;
        this.calidadCompra = calidadCompra;
        this.precioCompra = precioCompra;
    }


    public Integer getPedidoItemId() {
        return pedidoItemId;
    }


    public void setPedidoItemId(Integer pedidoItemId) {
        this.pedidoItemId = pedidoItemId;
    }


    public Pedido getPedido() {
        return pedido;
    }


    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }


    public Carta getCarta() {
        return carta;
    }


    public void setCarta(Carta carta) {
        this.carta = carta;
    }


    public String getCalidadCompra() {
        return calidadCompra;
    }


    public void setCalidadCompra(String calidadCompra) {
        this.calidadCompra = calidadCompra;
    }


    public BigDecimal getPrecioCompra() {
        return precioCompra;
    }


    public void setPrecioCompra(BigDecimal precioCompra) {
        this.precioCompra = precioCompra;
    }

    
}