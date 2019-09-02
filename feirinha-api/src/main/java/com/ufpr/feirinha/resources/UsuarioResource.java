/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Usuario;
import com.ufpr.feirinha.repository.IUsuarioRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author diogo
 */
@RestController
@RequestMapping(value="/api")
@CrossOrigin(origins = "*")
@Api(value="API REST Usuarios")
public class UsuarioResource {
        
    @Autowired
    IUsuarioRepository usuarioRepository;
  
    @ApiOperation(value="Retorna uma lista de Usuarios")
    @GetMapping("/usuario")
    public List<Usuario> listaUsuarios(){
        return usuarioRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um usuario unico")
    @GetMapping("/usuario/{id}")
    public Usuario listaUsuarioUnico(@PathVariable(value="id") long id){
        return usuarioRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um usuario")
    @PostMapping("/usuario")
    public Usuario salvaUsuario(@RequestBody @Valid Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    @ApiOperation(value="Deleta um usuario")
    @DeleteMapping("/usuario")
    public void deletaUsuario(@RequestBody @Valid Usuario usuario) {
            usuarioRepository.delete(usuario);
    }

    @ApiOperation(value="Atualiza um usuario")
    @PutMapping("/usuario")
    public Usuario atualizaUsuario(@RequestBody @Valid Usuario usuario) {
            return usuarioRepository.save(usuario);
    }
    
    @ApiOperation(value="Salva um login")
    @PostMapping("/login")
    @Transactional
    public long login(@RequestBody Usuario usuario) {
        long id = 0;
        List<Usuario> users = usuarioRepository.findByLoginAndSenha(usuario.getLogin(), usuario.getSenha());
        
        if(!users.isEmpty())
            id = users.get(0).getId();
        
        return id;
    }
    
    
}
