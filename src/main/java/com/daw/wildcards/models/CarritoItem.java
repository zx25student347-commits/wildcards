package com.daw.wildcards.models;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carrito_items")
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carritoItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrito_id")
    private CarritoCompra carrito;

    @ManyToOne
    @JoinColumn(name = "carta_id")
    private Carta carta;

    @ManyToOne
    @JoinColumn(name = "accesorio_id")
    private Accesorios accesorio;

    private String condicion;
    private String idioma;
    private Integer cantidad;
    private BigDecimal precioUnidad;


    public CarritoItem() {
    }

    

    public CarritoItem(CarritoCompra carrito, Carta carta, String condicion, String idioma, Integer cantidad,
            BigDecimal precioUnidad) {
        this.carrito = carrito;
        this.carta = carta;
        this.condicion = condicion;
        this.idioma = idioma;
        this.cantidad = cantidad;
        this.precioUnidad = precioUnidad;
    }




    public Integer getCarritoItemId() {
        return carritoItemId;
    }
    public void setCarritoItemId(Integer carritoItemId) {
        this.carritoItemId = carritoItemId;
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
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    public BigDecimal getPrecioUnidad() {
        return precioUnidad;
    }
    public void setPrecioUnidad(BigDecimal precioUnidad) {
        this.precioUnidad = precioUnidad;
    }



    public CarritoCompra getCarrito() {
        return carrito;
    }



    public void setCarrito(CarritoCompra carrito) {
        this.carrito = carrito;
    }

    
}
