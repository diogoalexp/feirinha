/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Cidade;
import com.ufpr.feirinha.repository.ICidadeRepository;
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
@Api(value="API REST Cidades")
public class CidadeResource {
    
    @Autowired
    ICidadeRepository cidadeRepository;
  
    @ApiOperation(value="Retorna uma lista de Cidades")
    @GetMapping("/cidade")
    public List<Cidade> listaCidades(){
        return cidadeRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um cidade unico")
    @GetMapping("/cidade/{id}")
    public Cidade listaCidadeUnico(@PathVariable(value="id") long id){
        return cidadeRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um cidade")
    @PostMapping("/cidade")
    public Cidade salvaCidade(@RequestBody @Valid Cidade cidade) {
        return cidadeRepository.save(cidade);
    }
    
    @ApiOperation(value="Deleta um cidade")
    @DeleteMapping("/cidade")
    public void deletaCidade(@RequestBody @Valid Cidade cidade) {
            cidadeRepository.delete(cidade);
    }

    @ApiOperation(value="Atualiza um cidade")
    @PutMapping("/cidade")
    public Cidade atualizaCidade(@RequestBody @Valid Cidade cidade) {
            return cidadeRepository.save(cidade);
    }
}
