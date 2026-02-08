package com.daw.wildcards.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "yugioh_cartas")
public class YugiohCarta extends Carta {

    private Integer nivel;
    private String atributo;
    private String tipoDetalle;
    private Integer ataque;
    private Integer defensa;

    @Column(columnDefinition = "TEXT")
    private String textoEfecto;


    public YugiohCarta() {
    }


    public YugiohCarta(Juego juego, CartaSet set, String nombre, String numeroCarta, String rareza, String tipo,
            String descripcion, String imagenUrl) {
        super(juego, set, nombre, numeroCarta, rareza, tipo, descripcion, imagenUrl);
    }


    public Integer getNivel() {
        return nivel;
    }


    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }


    public String getAtributo() {
        return atributo;
    }


    public void setAtributo(String atributo) {
        this.atributo = atributo;
    }


    public String getTipoDetalle() {
        return tipoDetalle;
    }


    public void setTipoDetalle(String tipoDetalle) {
        this.tipoDetalle = tipoDetalle;
    }


    public Integer getAtaque() {
        return ataque;
    }


    public void setAtaque(Integer ataque) {
        this.ataque = ataque;
    }


    public Integer getDefensa() {
        return defensa;
    }


    public void setDefensa(Integer defensa) {
        this.defensa = defensa;
    }


    public String getTextoEfecto() {
        return textoEfecto;
    }


    public void setTextoEfecto(String textoEfecto) {
        this.textoEfecto = textoEfecto;
    }

    

    


}

