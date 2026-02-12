package com.daw.wildcards.dto;

import java.util.Set;

public class UsuarioDTO {
    private Long id;
    private String username;
    private Set<String> roles;
    
    public UsuarioDTO() {
    }

    

    public UsuarioDTO(String username, Set<String> roles) {
        this.username = username;
        this.roles = roles;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }



    public Long getId() {
        return id;
    }

    
    
}
