/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Feira;
import com.ufpr.feirinha.repository.IFeiraRepository;
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
@Api(value="API REST Feiras")
public class FeiraResource { 
    @Autowired
    IFeiraRepository feiraRepository;
  
    @ApiOperation(value="Retorna uma lista de Feiras")
    @GetMapping("/feira")
    public List<Feira> listaFeiras(){
        return feiraRepository.findAll();
    }
    
    @ApiOperation(value="Retorna uma feira unica")
    @GetMapping("/feira/{id}")
    public Feira listaFeiraUnico(@PathVariable(value="id") long id){
        return feiraRepository.findById(id);
    }
    
    @ApiOperation(value="Salva uma feira")
    @PostMapping("/feira")
    public Feira salvaFeira(@RequestBody @Valid Feira feira) {
        return feiraRepository.save(feira);
    }
    
    @ApiOperation(value="Deleta uma feira")
    @DeleteMapping("/feira")
    public void deletaFeira(@RequestBody @Valid Feira feira) {
            feiraRepository.delete(feira);
    }

    @ApiOperation(value="Atualiza uma feira")
    @PutMapping("/feira")
    public Feira atualizaFeira(@RequestBody @Valid Feira feira) {
            return feiraRepository.save(feira);
    }    
}
