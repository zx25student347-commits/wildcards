package com.daw.wildcards.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



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

    @GetMapping("/login")
    public String login() {
        return "login"; // Busca login.html
    }

    @GetMapping("/registro")
    public String registro() {
        return "registro"; // Busca registro.html (o el nombre que tenga tu vista de registro)
    }

   
    


    

}
