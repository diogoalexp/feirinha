/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.ufpr.feirinha.repository;

import com.example.ufpr.feirinha.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author diogo
 */
public interface IProdutoRepository extends JpaRepository<Produto, Long>{
    
}
