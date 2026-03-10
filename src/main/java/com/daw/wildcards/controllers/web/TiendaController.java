package com.daw.wildcards.controllers.web;

import com.daw.wildcards.dto.ProductoBusquedaDTO;
import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.models.Carta;
import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
@RequestMapping("/tienda")
public class TiendaController {

    private CartaRepository cartaRepository;
    private AccesorioRepository accesorioRepository;

    public TiendaController(CartaRepository cartaRepository, AccesorioRepository accesorioRepository) {
        this.cartaRepository = cartaRepository;
        this.accesorioRepository = accesorioRepository;
    }

    @GetMapping("/buscar")
    public String buscarProductos(
            @RequestParam(value = "q", required = false, defaultValue = "") String consulta,
            @RequestParam(required = false) Double maxPrecio,
            @RequestParam(required = false) List<String> categorias,
            Model model) {

        // 1. Búsqueda inicial
        List<Carta> cartasEncontradas = cartaRepository.findByNombreContainingIgnoreCase(consulta);
        List<Accesorios> accesoriosEncontrados = accesorioRepository.findByNombreContainingIgnoreCase(consulta);

        List<ProductoBusquedaDTO> todosLosResultados = Stream.concat(
            cartasEncontradas.stream().map(c -> new ProductoBusquedaDTO(c.getCartaId(), c.getNombre(), c.getImagenUrl(), c.getPrecio(), "carta")),
            accesoriosEncontrados.stream().map(a -> new ProductoBusquedaDTO(a.getId(), a.getNombre(), a.getImagenUrl(), a.getPrecio(), "accesorio"))
        ).collect(Collectors.toList());

        // 2. Preparar datos para filtros
        double maxPrecioPosible = todosLosResultados.stream()
                .mapToDouble(p -> p.getPrecio() != null ? p.getPrecio() : 0.0)
                .max().orElse(100.0);

        // 3. Aplicar filtros
        List<ProductoBusquedaDTO> resultadosFiltrados = todosLosResultados.stream()
                .filter(p -> maxPrecio == null || p.getPrecio() == null || p.getPrecio() <= maxPrecio)
                .filter(p -> categorias == null || categorias.isEmpty() || categorias.contains(p.getTipo()))
                .collect(Collectors.toList());

        // 4. Añadir atributos al modelo
        model.addAttribute("resultados", resultadosFiltrados);
        model.addAttribute("consulta", consulta);
        model.addAttribute("totalResultados", resultadosFiltrados.size());
        model.addAttribute("maxPrecioPosible", Math.ceil(maxPrecioPosible));
        model.addAttribute("currentMaxPrecio", maxPrecio);
        model.addAttribute("currentCategorias", categorias != null ? categorias : List.of());

        return "resultados-busqueda";
    }
}