package com.daw.wildcards.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cartas")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "@type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = MagicCarta.class, name = "MagicCarta"),
    @JsonSubTypes.Type(value = PokemonCarta.class, name = "PokemonCarta"),
    @JsonSubTypes.Type(value = YugiohCarta.class, name = "YugiohCarta"),
    @JsonSubTypes.Type(value = OnePieceCarta.class, name = "OnePieceCarta")
})
public abstract class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartaId;

    @ManyToOne
    @JoinColumn(name = "juego_id")
    private Juego juego;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "set_id")
    private CartaSet set;

    private String nombre;
    private String numeroCarta;
    private String rareza;
    private String tipo;
    private Double precio;
    private Integer stock;
    private String idioma;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String imagenUrl;

    public Carta() {
    }




    public Carta(Juego juego, CartaSet set, String nombre, String numeroCarta, String rareza, String tipo,
            Double precio, String descripcion, String imagenUrl, Integer stock, String idioma) {
        this.juego = juego;
        this.set = set;
        this.nombre = nombre;
        this.numeroCarta = numeroCarta;
        this.rareza = rareza;
        this.tipo = tipo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.stock = stock;
        this.idioma = idioma;
    }









    public Integer getCartaId() {
        return cartaId;
    }

    public void setCartaId(Integer cartaId) {
        this.cartaId = cartaId;
    }

    public Juego getJuego() {
        return juego;
    }

    public void setJuego(Juego juego) {
        this.juego = juego;
    }

    public CartaSet getSet() {
        return set;
    }

    public void setSet(CartaSet set) {
        this.set = set;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumeroCarta() {
        return numeroCarta;
    }

    public void setNumeroCarta(String numeroCarta) {
        this.numeroCarta = numeroCarta;
    }

    public String getRareza() {
        return rareza;
    }

    public void setRareza(String rareza) {
        this.rareza = rareza;
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

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }




    public Double getPrecio() {
        return precio;
    }




    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }





    
}
