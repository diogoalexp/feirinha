/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.validator.constraints.Length;

/**
 *
 * @author diogo
 */
@Entity
@Table(name="Pais")
public class Pais extends AbstractEntity{

    @Column(name = "nome", unique=true, nullable = false, length = 100)  
    private String nome;   
   
    public Pais(long id,String name){
		this.setId(id); 
		this.nome=nome;
	}
    public Pais(){
    }

    /**
     * @return the nome
     */    
    public String getNome() {
        return nome;
    }

    /**
     * @param nome the nome to set
     */
    public void setNome(String nome) {
        this.nome = nome;
    } 
}
