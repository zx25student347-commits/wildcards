package com.daw.wildcards.dto;

public class ProductoBusquedaDTO {
    private Integer id;
    private String nombre;
    private String imagenUrl;
    private Double precio;
    private String tipo; // "carta" o "accesorio"
    private String url;

    public ProductoBusquedaDTO(Integer id, String nombre, String imagenUrl, Double precio, String tipo) {
        this.id = id;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.precio = precio;
        this.tipo = tipo;
        this.url = "/" + tipo + "/" + id;
    }

    // Getters
    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public String getImagenUrl() { return imagenUrl; }
    public Double getPrecio() { return precio; }
    public String getTipo() { return tipo; }
    public String getUrl() { return url; }
}