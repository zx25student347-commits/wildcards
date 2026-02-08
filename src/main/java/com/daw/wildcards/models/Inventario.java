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
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventarioId;

    @ManyToOne
    @JoinColumn(name = "carta_id")
    private Carta carta;

    private String condicion;
    private String idioma;
    private String calidad;
    private BigDecimal precio;


    

    public Inventario() {
    }


    public Inventario(Carta carta, String condicion, String idioma, String calidad, BigDecimal precio) {
        this.carta = carta;
        this.condicion = condicion;
        this.idioma = idioma;
        this.calidad = calidad;
        this.precio = precio;
    }


    public Integer getInventarioId() {
        return inventarioId;
    }


    public void setInventarioId(Integer inventarioId) {
        this.inventarioId = inventarioId;
    }


    public Carta getCarta() {
        return carta;
    }


    public void setCarta(Carta carta) {
        this.carta = carta;
    }


    public String getCondicion() {
        return condicion;
    }


    public void setCondicion(String condicion) {
        this.condicion = condicion;
    }


    public String getIdioma() {
        return idioma;
    }


    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }


    public String getCalidad() {
        return calidad;
    }


    public void setCalidad(String calidad) {
        this.calidad = calidad;
    }


    public BigDecimal getPrecio() {
        return precio;
    }


    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    

    
}

