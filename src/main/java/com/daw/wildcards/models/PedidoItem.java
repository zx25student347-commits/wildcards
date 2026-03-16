package com.daw.wildcards.models;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
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
    @JsonBackReference
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "carta_id")
    private Carta carta;

    @ManyToOne
    @JoinColumn(name = "accesorio_id")
    private Accesorios accesorio;

    @Column(name = "cantidad_compra")
    private Integer cantidadCompra;

    @Column(name = "precio_compra")
    private BigDecimal precioCompra;
   
   
    public PedidoItem() {
    }


    public PedidoItem(Pedido pedido, Carta carta, Integer cantidadCompra, BigDecimal precioCompra) {
        this.pedido = pedido;
        this.carta = carta;
        this.cantidadCompra = cantidadCompra;
        this.precioCompra = precioCompra;
    }

    public PedidoItem(Pedido pedido, Accesorios accesorio, Integer cantidadCompra, BigDecimal precioCompra) {
        this.pedido = pedido;
        this.accesorio = accesorio;
        this.cantidadCompra = cantidadCompra;
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

    public Accesorios getAccesorio() {
        return accesorio;
    }

    public void setAccesorio(Accesorios accesorio) {
        this.accesorio = accesorio;
    }


   

    public BigDecimal getPrecioCompra() {
        return precioCompra;
    }


    public void setPrecioCompra(BigDecimal precioCompra) {
        this.precioCompra = precioCompra;
    }


    public Integer getCantidadCompra() {
        return cantidadCompra;
    }


    public void setCantidadCompra(Integer cantidadCompra) {
        this.cantidadCompra = cantidadCompra;
    }

    
}