package com.daw.wildcards.dto;

// Asumo que el paquete es este, ajústalo si es diferente

public class ProductoBusquedaDTO {
    private Integer id;
    private String nombre;
    private String imagenUrl;
    private Double precio;
    private String tipo; // "carta" o "accesorio"
    private String juego; // "Pokémon TCG", "Magic", etc. o null si no aplica

    // Constructores, Getters y Setters

    public ProductoBusquedaDTO(Integer id, String nombre, String imagenUrl, Double precio, String tipo, String juego) {
        this.id = id;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.precio = precio;
        this.tipo = tipo;
        this.juego = juego;
    }

    public String getUrl() {
        if ("carta".equals(tipo)) {
            return "/carta/" + id;
        } else if ("accesorio".equals(tipo)) {
            return "/accesorio/" + id;
        }
        return "#";
    }

    // Getters y Setters para todos los campos
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }
    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getJuego() { return juego; }
    public void setJuego(String juego) { this.juego = juego; }
}
