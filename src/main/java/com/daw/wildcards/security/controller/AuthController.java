package com.daw.wildcards.security.controller;


import com.daw.wildcards.dto.*;
import com.daw.wildcards.security.jwt.JwtService;
import com.daw.wildcards.security.service.CustomUserDetailsService;
import com.daw.wildcards.services.UsuarioService;
import org.springframework.beans.factory.annotation.Value;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioService usuarioService;
    private final CustomUserDetailsService userDetailsService;
    
    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UsuarioService usuarioService,
                          CustomUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
        this.userDetailsService = userDetailsService;
    }

    // 🔹 REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO request) {

        if (usuarioService.existeUsuario(request.getUsername())) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        usuarioService.registrarUsuario(request.getUsername(), request.getPassword());

        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    // 🔹 LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            // Si las credenciales son incorrectas, devolvemos un 401 Unauthorized
            return ResponseEntity.status(401).body(new AuthResponseDTO(null, "Usuario o contraseña incorrectos"));
        }
        
        var userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        String token = jwtService.generateToken(userDetails);

        // crear cookie HttpOnly para envío automático en futuras peticiones
        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie.from("token", token)
                .httpOnly(true)
                .path("/")
                .maxAge(jwtExpirationMs / 1000) 
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AuthResponseDTO(token, "Inicio de sesión exitoso"));
    }

    // 🔹 LOGOUT (borra la cookie en el servidor y redirige al login)
    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString());
        // redirige a la página de login
        return ResponseEntity.status(302)
                .header(org.springframework.http.HttpHeaders.LOCATION, "/login")
                .build();
    }
}
