/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.ufpr.feirinha.resources;

import com.example.ufpr.feirinha.model.Produto;
import com.example.ufpr.feirinha.repository.IProdutoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author diogo
 */
@RestController
@RequestMapping(value="/api")
public class ProdutoResource {
    
    @Autowired
    IProdutoRepository produtoRepository;
    
    @GetMapping("/produtos")
    public List<Produto> listaProdutos(){
        return produtoRepository.findAll();
    }
    
}
