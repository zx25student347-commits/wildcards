package com.daw.wildcards.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class CarritoWebController {

    @GetMapping("/carrito")
    public String verCarrito() {
        return "carrito";
    }

    @GetMapping("/pedidos")
    public String verPedidos() {
        return "pedidos";
    }
    

}
