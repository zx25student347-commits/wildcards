package com.daw.wildcards.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.daw.wildcards.security.service.CustomUserDetailsService;
import com.daw.wildcards.security.jwt.jwtAuthFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final jwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(jwtAuthFilter jwtAuthFilter,
            CustomUserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // permite acceso libre a las rutas de autenticación y la página inicial
                        .requestMatchers("/auth/**" , "/").permitAll()
                        // sólo usuarios con rol ADMIN pueden acceder a /admin/**
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        // cualquier otro endpoint de la API necesita un token válido
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/api/pedido/**","/api/carrito/**").authenticated()
                        // otras rutas estáticas o públicas se siguen permitiendo
                        .anyRequest().permitAll())
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                // redirige al formulario de login si no hay autenticación
                .exceptionHandling(ex -> ex.authenticationEntryPoint((req, res, authEx) -> {
                    // para llamadas a /api devolvemos 401, en páginas web redirigimos
                    if (req.getRequestURI().startsWith("/api")) {
                        res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                    } else {
                        String target = "/login?redirect=" + req.getRequestURI();
                        res.sendRedirect(target);
                    }
                }))
                // configuración básica de logout (borrará cookies si se usan)
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .deleteCookies("token")
                        .permitAll());

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}