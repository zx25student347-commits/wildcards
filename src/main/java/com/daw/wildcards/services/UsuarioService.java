package com.daw.wildcards.services;

import com.daw.wildcards.models.Usuario;
import com.daw.wildcards.repositories.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrarUsuario(String username, String rawPassword) {
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(rawPassword));
        return usuarioRepository.save(usuario);
    }

    public boolean existeUsuario(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario guardar(Usuario usuario) {
        // Si es una actualización y la contraseña viene vacía o nula, mantenemos la existente.
        if (usuario.getId() != null && (usuario.getPassword() == null || usuario.getPassword().isEmpty())) {
            usuarioRepository.findById(usuario.getId())
                    .ifPresent(usuarioExistente -> usuario.setPassword(usuarioExistente.getPassword()));
        } else {
            // Si es un usuario nuevo o se está actualizando la contraseña, la codificamos.
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
