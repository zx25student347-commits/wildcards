package com.daw.wildcards.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "accesorios")
public class Accesorios {
    @Id    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accesorioId;

    @Column
    private String nombre;

    @Column
    private String tipo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column
    private Double precio;

    @Column
    private String imagenUrl;

    @Column
    private Integer stock;

    @JsonIgnore
    @OneToMany(mappedBy = "accesorio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarritoItem> carritoItems = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "accesorio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoItem> pedidoItems = new ArrayList<>();

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
