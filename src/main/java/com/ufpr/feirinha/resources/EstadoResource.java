/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Estado;
import com.ufpr.feirinha.repository.IEstadoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
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
@Api(value="API REST Estados")
public class EstadoResource {
    
    @Autowired
    IEstadoRepository estadoRepository;
  
    @ApiOperation(value="Retorna uma lista de Estados")
    @GetMapping("/estado")
    public List<Estado> listaEstados(){
        return estadoRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um estado unico")
    @GetMapping("/estado/{id}")
    public Estado listaEstadoUnico(@PathVariable(value="id") long id){
        return estadoRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um estado")
    @PostMapping("/estado")
    public Estado salvaEstado(@RequestBody @Valid Estado estado) {
        return estadoRepository.save(estado);
    }
    
    @ApiOperation(value="Deleta um estado")
    @DeleteMapping("/estado")
    public void deletaEstado(@RequestBody @Valid Estado estado) {
            estadoRepository.delete(estado);
    }

    @ApiOperation(value="Atualiza um estado")
    @PutMapping("/estado")
    public Estado atualizaEstado(@RequestBody @Valid Estado estado) {
            return estadoRepository.save(estado);
    }
}
