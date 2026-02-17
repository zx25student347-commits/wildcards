package com.daw.wildcards.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "onepiece_cartas")
public class OnePieceCarta extends Carta {

    private Integer coste;
    private Integer power;
    private String color;
    private String tipo;
    private Integer counter;

    @Column(columnDefinition = "TEXT")
    private String effect;

    public OnePieceCarta() {
    }

    

    public OnePieceCarta(Juego juego, CartaSet set, String nombre, String numeroCarta, String rareza, String tipo,
            Double precio, String descripcion, String imagenUrl, Integer stock, String idioma, Integer coste, Integer power, String color,
            String tipo2, Integer counter, String effect) {
        super(juego, set, nombre, numeroCarta, rareza, tipo, precio, descripcion, imagenUrl, stock, idioma);
        this.coste = coste;
        this.power = power;
        this.color = color;
        tipo = tipo2;
        this.counter = counter;
        this.effect = effect;
    }



    public Integer getCoste() {
        return coste;
    }

    public void setCoste(Integer coste) {
        this.coste = coste;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getCounter() {
        return counter;
    }

    public void setCounter(Integer counter) {
        this.counter = counter;
    }

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }

    
}
