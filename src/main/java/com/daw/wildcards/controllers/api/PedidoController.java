package com.daw.wildcards.controllers.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.wildcards.models.Pedido;

@RestController
@RequestMapping("/api/pedido")
public class PedidoController {

    @GetMapping
    public List<String> ListadoPedidos(){
        return Pedido;
    } 
}
