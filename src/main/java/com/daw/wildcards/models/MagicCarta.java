package com.daw.wildcards.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "magic_cartas")
public class MagicCarta extends Carta {

    @Column
    private String manaCost;

    @Column
    private String cardType;

    @Column
    private String power;

    @Column
    private String toughness;

    @Column(columnDefinition = "TEXT")
    private String abilities;

    @Column
    private String colors;

    public MagicCarta() {
    }

    

    public MagicCarta(Juego juego, CartaSet set, String nombre, String numeroCarta, String rareza, String tipo,
            Double precio, String descripcion, String imagenUrl, Integer stock, String idioma, String manaCost, String cardType, String power,
            String toughness, String abilities, String colors) {
        super(juego, set, nombre, numeroCarta, rareza, tipo, precio, descripcion, imagenUrl, stock, idioma);
        this.manaCost = manaCost;
        this.cardType = cardType;
        this.power = power;
        this.toughness = toughness;
        this.abilities = abilities;
        this.colors = colors;
    }



    public String getManaCost() {
        return manaCost;
    }

    public void setManaCost(String manaCost) {
        this.manaCost = manaCost;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getToughness() {
        return toughness;
    }

    public void setToughness(String toughness) {
        this.toughness = toughness;
    }

    public String getAbilities() {
        return abilities;
    }

    public void setAbilities(String abilities) {
        this.abilities = abilities;
    }

    public String getColors() {
        return colors;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    
}
