/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Produto;
import com.ufpr.feirinha.repository.IProdutoRepository;
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
@Api(value="API REST Produtos")
public class ProdutoResource {
    
    @Autowired
    IProdutoRepository produtoRepository;
  
    @ApiOperation(value="Retorna uma lista de Produtos")
    @GetMapping("/produto")
    public List<Produto> listaProdutos(){
        return produtoRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um produto unico")
    @GetMapping("/produto/{id}")
    public Produto listaProdutoUnico(@PathVariable(value="id") long id){
        return produtoRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um produto")
    @PostMapping("/produto")
    public Produto salvaProduto(@RequestBody @Valid Produto produto) {
        return produtoRepository.save(produto);
    }
    
    @ApiOperation(value="Deleta um produto")
    @DeleteMapping("/produto")
    public void deletaProduto(@RequestBody @Valid Produto produto) {
            produtoRepository.delete(produto);
    }

    @ApiOperation(value="Atualiza um produto")
    @PutMapping("/produto")
    public Produto atualizaProduto(@RequestBody @Valid Produto produto) {
            return produtoRepository.save(produto);
    }
}
