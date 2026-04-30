package com.daw.wildcards.controllers.web;

import com.daw.wildcards.dto.ProductoBusquedaDTO;
import com.daw.wildcards.models.Accesorios;
import com.daw.wildcards.models.Carta;
import com.daw.wildcards.repositories.AccesorioRepository;
import com.daw.wildcards.repositories.CartaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
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
            @RequestParam(required = false) Double minPrecio,
            @RequestParam(required = false) Double maxPrecio,
            @RequestParam(required = false) List<String> categorias,
            @RequestParam(required = false) List<String> juegos,
            @RequestParam(required = false, defaultValue = "relevance") String sort,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "12") int size,
            Model model) {

        // 1. Búsqueda inicial
        List<Carta> cartasEncontradas = cartaRepository.findByNombreContainingIgnoreCase(consulta);
        List<Accesorios> accesoriosEncontrados = accesorioRepository.findByNombreContainingIgnoreCase(consulta);

        // Nota: Se asume que has modificado ProductoBusquedaDTO para aceptar el nombre del juego.
        // Ver la explicación sobre cómo modificar este DTO.
        List<ProductoBusquedaDTO> todosLosResultados = Stream.concat(
            cartasEncontradas.stream().map(c -> new ProductoBusquedaDTO(c.getCartaId(), c.getNombre(), c.getImagenUrl(), c.getPrecio(), "carta", c.getJuego() != null ? c.getJuego().getNombre() : null)),
            accesoriosEncontrados.stream().map(a -> new ProductoBusquedaDTO(a.getAccesorioId(), a.getNombre(), a.getImagenUrl(), a.getPrecio(), "accesorio", null))
        ).collect(Collectors.toList());

        // 2. Preparar datos para filtros
        double maxPrecioPosible = todosLosResultados.stream()
                .mapToDouble(p -> p.getPrecio() != null ? p.getPrecio() : 0.0)
                .max().orElse(100.0);

        // 3. CÁLCULO DE RECUENTOS Y FILTRADO

        // Pre-filtrar por precio, que se aplica a todos los cálculos de recuento
        List<ProductoBusquedaDTO> resultadosFiltradosPorPrecio = todosLosResultados.stream()
                .filter(p -> (minPrecio == null || p.getPrecio() == null || p.getPrecio() >= minPrecio) &&
                             (maxPrecio == null || p.getPrecio() == null || p.getPrecio() <= maxPrecio))
                .collect(Collectors.toList());

        // Calcular recuentos para CATEGORÍAS (considerando filtro de JUEGO si está activo)
        Map<String, Long> categoriaCounts = resultadosFiltradosPorPrecio.stream()
                .filter(p -> juegos == null || (p.getJuego() != null && juegos.contains(p.getJuego())))
                .filter(p -> p.getTipo() != null)
                .collect(Collectors.groupingBy(ProductoBusquedaDTO::getTipo, Collectors.counting()));

        // Calcular recuentos para JUEGOS (considerando filtro de CATEGORÍA si está activo)
        Map<String, Long> juegoCounts = resultadosFiltradosPorPrecio.stream()
                .filter(p -> categorias == null || categorias.contains(p.getTipo()))
                .filter(p -> p.getJuego() != null)
                .collect(Collectors.groupingBy(ProductoBusquedaDTO::getJuego, Collectors.counting()));

        // Aplicar filtros finales para obtener la lista de resultados a mostrar
        List<ProductoBusquedaDTO> resultadosFiltrados = resultadosFiltradosPorPrecio.stream()
                .filter(p -> categorias == null || categorias.contains(p.getTipo()))
                .filter(p -> juegos == null || (p.getJuego() != null && juegos.contains(p.getJuego())))
                .collect(Collectors.toList());

        // Aplicar ordenación
        if ("price_asc".equals(sort)) {
            resultadosFiltrados.sort(Comparator.comparing(ProductoBusquedaDTO::getPrecio, Comparator.nullsLast(Comparator.naturalOrder())));
        } else if ("price_desc".equals(sort)) {
            resultadosFiltrados.sort(Comparator.comparing(ProductoBusquedaDTO::getPrecio, Comparator.nullsLast(Comparator.reverseOrder())));
        } else if ("name_asc".equals(sort)) {
            resultadosFiltrados.sort(Comparator.comparing(ProductoBusquedaDTO::getNombre, String.CASE_INSENSITIVE_ORDER));
        }
        // Para "relevance" (por defecto), no se hace nada, se mantiene el orden de la base de datos.

        // --- LÓGICA DE PAGINACIÓN ---
        int totalItems = resultadosFiltrados.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        // Asegurar que la página solicitada es válida
        if (page < 0) page = 0;
        if (totalPages > 0 && page >= totalPages) page = totalPages - 1;

        int start = page * size;
        int end = Math.min(start + size, totalItems);

        List<ProductoBusquedaDTO> paginaResultados = (start > totalItems) ? List.of() : resultadosFiltrados.subList(start, end);

        // 4. Añadir atributos al modelo
        model.addAttribute("resultados", paginaResultados); // Enviamos solo la página actual
        model.addAttribute("consulta", consulta);
        model.addAttribute("totalResultados", totalItems);
        model.addAttribute("maxPrecioPosible", Math.ceil(maxPrecioPosible));
        model.addAttribute("currentMinPrecio", minPrecio);
        model.addAttribute("currentMaxPrecio", maxPrecio);
        model.addAttribute("currentCategorias", categorias);
        model.addAttribute("currentJuegos", juegos);
        model.addAttribute("currentSort", sort);
        model.addAttribute("categoriaCounts", categoriaCounts);
        model.addAttribute("juegoCounts", juegoCounts);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", totalPages);

        return "resultados-busqueda";
    }
}