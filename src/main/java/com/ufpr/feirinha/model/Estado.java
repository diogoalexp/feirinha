/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.model;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author diogo
 */
@Entity
@Table(name="Estado")
public class Estado extends AbstractEntity {  
    @Column(name = "nome", nullable = false, length = 100)  
    private String nome;
   
    @OneToOne
    @JoinColumn(name="pais_id")
    private Pais pais; 
    
    public Estado(long id,String name, Pais pais){
            this.setId(id);
            this.nome=nome;
            this.pais=pais;
    }
    public Estado(){
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

    /**
     * @return the pais
     */
    public Pais getPais() {
        return pais;
    }

    /**
     * @param pais the pais to set
     */
    public void setPais(Pais pais) {
        this.pais = pais;
    }
}
