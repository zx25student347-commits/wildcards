package com.daw.wildcards.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@Controller
public class HomeController {

    @GetMapping("/")
    public String inicio() {
        return "index";
    }

     @GetMapping("/pokemon")
    public String verPaginaPokemon() {
        return "pokemon";
    }

    @GetMapping("/onepiece")
    public String verPaginaOnePiece() {
        return "onepiece";
    }

    @GetMapping("/magic")
    public String verPaginaMagic() {
        return "magic";
    }

    @GetMapping("/yugioh")
    public String verPaginaYugioh() {
        return "yugioh";
    }


    @GetMapping("/accesorios")
    public String verPaginaAccesorios() {
        return "accesorios";
    }

    @GetMapping("/login")
    public String login() {
        return "login"; 
    }

    @GetMapping("/registro")
    public String registro() {
        return "registro"; 
    }

    @GetMapping("/carta/{id}")
    public String verCarta(@PathVariable Integer id) {
        return "carta-detalle";
    }

    @GetMapping("/accesorio/{id}")
    public String verAccesorio(@PathVariable Integer id) {
        return "accesorio-detalle";
    }

    @GetMapping("/ayuda")
    public String páginaAyuda() {
        // Retorna el nombre del archivo ayuda.html
        return "ayuda";
    }

    @GetMapping("/devoluciones")
    public String páginaDevoluciones() {
        // Retorna el nombre del archivo devoluciones.html
        return "devoluciones";
    }

    @GetMapping("/contacto")
    public String páginaContacto() {
        // Retorna el nombre del archivo contacto.html
        return "contacto";
    }

    

   



   
    


    

}
