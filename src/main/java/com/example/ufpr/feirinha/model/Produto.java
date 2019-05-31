/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.ufpr.feirinha.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author diogo
 */
@Entity
@Table(name="Produto")
public class Produto implements Serializable  {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    
    private String nome;

    /**
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * @return the nome
     */
    public String getNome() {
        return nome;
    }
    
}