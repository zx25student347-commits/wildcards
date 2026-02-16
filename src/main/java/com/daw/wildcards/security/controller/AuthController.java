package com.daw.wildcards.security.controller;


import com.daw.wildcards.dto.*;
import com.daw.wildcards.models.Usuario;
import com.daw.wildcards.security.jwt.JwtService;
import com.daw.wildcards.security.service.CustomUserDetailsService;
import com.daw.wildcards.services.UsuarioService;


import org.springframework.security.authentication.AuthenticationManager;
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

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}
