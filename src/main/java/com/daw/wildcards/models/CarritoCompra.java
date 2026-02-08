package com.daw.wildcards.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "carrito_compra")
public class CarritoCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carritoId;

    private Integer clienteId;

    @Column(name = "session_id", length = 100)
    private String sessionId;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "carrito_activo")
    private Boolean carritoActivo;

    // Relación con los items del carrito
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarritoItem> items = new ArrayList<>();

    

    public CarritoCompra() {
    }



    public CarritoCompra(Integer clienteId, String sessionId, LocalDateTime fechaCreacion, LocalDateTime updatedAt,
            Boolean carritoActivo, List<CarritoItem> items) {
        this.clienteId = clienteId;
        this.sessionId = sessionId;
        this.fechaCreacion = fechaCreacion;
        this.updatedAt = updatedAt;
        this.carritoActivo = carritoActivo;
        this.items = items;
    }



    public Integer getCarritoId() {
        return carritoId;
    }



    public void setCarritoId(Integer carritoId) {
        this.carritoId = carritoId;
    }



    public Integer getClienteId() {
        return clienteId;
    }



    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }



    public String getSessionId() {
        return sessionId;
    }



    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }



    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }



    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }



    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }



    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }



    public Boolean getCarritoActivo() {
        return carritoActivo;
    }



    public void setCarritoActivo(Boolean carritoActivo) {
        this.carritoActivo = carritoActivo;
    }



    public List<CarritoItem> getItems() {
        return items;
    }



    public void setItems(List<CarritoItem> items) {
        this.items = items;
    }

    

    
}

