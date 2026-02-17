package com.daw.wildcards.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Admin_DashBoard";
    }

    @GetMapping("/accesorios")
    public String Accesorios() {
        return "Admin_Accesorios";
    }
    
}