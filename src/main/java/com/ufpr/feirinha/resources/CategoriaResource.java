/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Categoria;
import com.ufpr.feirinha.repository.ICategoriaRepository;
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
@Api(value="API REST Categoria")
public class CategoriaResource {
    
    @Autowired
    ICategoriaRepository categoriaRepository;
  
    @ApiOperation(value="Retorna uma lista de Categorias")
    @GetMapping("/categoria")
    public List<Categoria> listaCategorias(){
        return categoriaRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um categoria unico")
    @GetMapping("/categoria/{id}")
    public Categoria listaCategoriaUnico(@PathVariable(value="id") long id){
        return categoriaRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um categoria")
    @PostMapping("/categoria")
    public Categoria salvaCategoria(@RequestBody @Valid Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    @ApiOperation(value="Deleta um categoria")
    @DeleteMapping("/categoria")
    public void deletaCategoria(@RequestBody @Valid Categoria categoria) {
            categoriaRepository.delete(categoria);
    }

    @ApiOperation(value="Atualiza um categoria")
    @PutMapping("/categoria")
    public Categoria atualizaCategoria(@RequestBody @Valid Categoria categoria) {
            return categoriaRepository.save(categoria);
    }
}
