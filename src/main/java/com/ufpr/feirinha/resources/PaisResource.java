/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Pais;
import com.ufpr.feirinha.repository.IPaisRepository;
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
@Api(value="API REST Paiss")
public class PaisResource {
    
    @Autowired
    IPaisRepository paisRepository;
  
    @ApiOperation(value="Retorna uma lista de Paiss")
    @GetMapping("/pais")
    public List<Pais> listaPais(){
        return paisRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um pais unico")
    @GetMapping("/pais/{id}")
    public Pais listaPaisUnico(@PathVariable(value="id") long id){
        return paisRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um pais")
    @PostMapping("/pais")
    public Pais salvaPais(@RequestBody @Valid Pais pais) {
        return paisRepository.save(pais);
    }
    
    @ApiOperation(value="Deleta um pais")
    @DeleteMapping("/pais")
    public void deletaPais(@RequestBody @Valid Pais pais) {
            paisRepository.delete(pais);
    }

    @ApiOperation(value="Atualiza um pais")
    @PutMapping("/pais")
    public Pais atualizaPais(@RequestBody @Valid Pais pais) {
            return paisRepository.save(pais);
    }
}
