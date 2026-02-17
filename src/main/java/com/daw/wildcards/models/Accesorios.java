package com.daw.wildcards.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "accesorios")
public class Accesorios {
    @Id    
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer accesorioId;
    private String nombre;
    private String tipo;
    private String descripcion;
    private Double precio;
    private String imagenUrl;
    private Integer stock;

    public Accesorios() {
    }

    public Accesorios(Integer accesorioId, String nombre, String tipo, String descripcion, Double precio,
            String imagenUrl, Integer stock) {
        this.accesorioId = accesorioId;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
        this.stock = stock;
    }

    public Integer getAccesorioId() {
        return accesorioId;
    }

    public void setAccesorioId(Integer accesorioId) {
        this.accesorioId = accesorioId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    
}
