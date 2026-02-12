package com.daw.wildcards.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "pokemon_cartas")
public class PokemonCarta extends Carta {

    private Integer hp;
    private String pokemonTipo;
    private String fase;
    private String evolucionaDe;

    @Column(columnDefinition = "TEXT")
    private String ataques;

    private String debilidad;
    private String resistencia;
    private String costeRetirada;

    
    public PokemonCarta() {
    }


    


    public PokemonCarta(Juego juego, CartaSet set, String nombre, String numeroCarta, String rareza, String tipo,
            Double precio, String descripcion, String imagenUrl, Integer hp, String pokemonTipo, String fase,
            String evolucionaDe, String ataques, String debilidad, String resistencia, String costeRetirada) {
        super(juego, set, nombre, numeroCarta, rareza, tipo, precio, descripcion, imagenUrl);
        this.hp = hp;
        this.pokemonTipo = pokemonTipo;
        this.fase = fase;
        this.evolucionaDe = evolucionaDe;
        this.ataques = ataques;
        this.debilidad = debilidad;
        this.resistencia = resistencia;
        this.costeRetirada = costeRetirada;
    }





    public Integer getHp() {
        return hp;
    }


    public void setHp(Integer hp) {
        this.hp = hp;
    }


    public String getPokemonTipo() {
        return pokemonTipo;
    }


    public void setPokemonTipo(String pokemonTipo) {
        this.pokemonTipo = pokemonTipo;
    }


    public String getFase() {
        return fase;
    }


    public void setFase(String fase) {
        this.fase = fase;
    }


    public String getEvolucionaDe() {
        return evolucionaDe;
    }


    public void setEvolucionaDe(String evolucionaDe) {
        this.evolucionaDe = evolucionaDe;
    }


    public String getAtaques() {
        return ataques;
    }


    public void setAtaques(String ataques) {
        this.ataques = ataques;
    }


    public String getDebilidad() {
        return debilidad;
    }


    public void setDebilidad(String debilidad) {
        this.debilidad = debilidad;
    }


    public String getResistencia() {
        return resistencia;
    }


    public void setResistencia(String resistencia) {
        this.resistencia = resistencia;
    }


    public String getCosteRetirada() {
        return costeRetirada;
    }


    public void setCosteRetirada(String costeRetirada) {
        this.costeRetirada = costeRetirada;
    }

    
}
