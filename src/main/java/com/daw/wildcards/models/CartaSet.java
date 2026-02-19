package com.daw.wildcards.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "cartas_sets")
public class CartaSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer setId;

    @ManyToOne
    @JoinColumn(name = "juego_id")
    private Juego juego;

    @Column
    private String nombre;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @Column(name = "codigo_set")
    private String codigoSet;

    @Column(name = "cartas_total")
    private Integer cartasTotal;
   

    
   
    public CartaSet() {
    }


    public CartaSet(Juego juego, String nombre, LocalDate fechaSalida, String codigoSet, Integer cartasTotal) {
        this.juego = juego;
        this.nombre = nombre;
        this.fechaSalida = fechaSalida;
        this.codigoSet = codigoSet;
        this.cartasTotal = cartasTotal;
    }


    public Integer getSetId() {
        return setId;
    }


    public void setSetId(Integer setId) {
        this.setId = setId;
    }


    public Juego getJuego() {
        return juego;
    }


    public void setJuego(Juego juego) {
        this.juego = juego;
    }


    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public LocalDate getFechaSalida() {
        return fechaSalida;
    }


    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }


    public String getCodigoSet() {
        return codigoSet;
    }


    public void setCodigoSet(String codigoSet) {
        this.codigoSet = codigoSet;
    }


    public Integer getCartasTotal() {
        return cartasTotal;
    }


    public void setCartasTotal(Integer cartasTotal) {
        this.cartasTotal = cartasTotal;
    }


    
    
}

