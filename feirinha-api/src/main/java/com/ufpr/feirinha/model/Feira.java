/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author diogo
 */
@Entity
@Table(name="Feira")
public class Feira extends AbstractEntity{    
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    
    @Column(name = "local", nullable = true, length = 256)
    private String local;
    
    @Column(name = "endereco", nullable = false, length = 256)
    private String endereco;
    
    @Column(name = "descr", nullable = true, length = 256)
    private String descr;
    
    @Column(name = "data", nullable = false)
    private Date data;
    
    @Column(name = "recorrente", nullable = true)
    private boolean recorrente;
    
    @Lob
    @Column(name="img", nullable = true)
    private byte[] img;
    
    @OneToOne
    @JoinColumn(name="cidade_id")
    private Cidade cidade;
        
    @OneToOne
    @JoinColumn(name="usuario_id")
    private Usuario usuario;
    
    @OneToMany
    private List<Participante> participantes = new ArrayList<>();
      
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
     * @return the local
     */
    public String getLocal() {
        return local;
    }

    /**
     * @param local the local to set
     */
    public void setLocal(String local) {
        this.local = local;
    }

    /**
     * @return the endereco
     */
    public String getEndereco() {
        return endereco;
    }

    /**
     * @param endereco the endereco to set
     */
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    /**
     * @return the descr
     */
    public String getDescr() {
        return descr;
    }

    /**
     * @param descr the descr to set
     */
    public void setDescr(String descr) {
        this.descr = descr;
    }

    /**
     * @return the data
     */
    public Date getData() {
        return data;
    }

    /**
     * @param data the data to set
     */
    public void setData(Date data) {
        this.data = data;
    }

    /**
     * @return the recorrente
     */
    public boolean isRecorrente() {
        return recorrente;
    }

    /**
     * @param recorrente the recorrente to set
     */
    public void setRecorrente(boolean recorrente) {
        this.recorrente = recorrente;
    }

    /**
     * @return the img
     */
    public byte[] getImg() {
        return img;
    }

    /**
     * @param img the img to set
     */
    public void setImg(byte[] img) {
        this.img = img;
    }

    /**
     * @return the cidade
     */
    public Cidade getCidade() {
        return cidade;
    }

    /**
     * @param cidade the cidade to set
     */
    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    /**
     * @return the usuario
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * @param usuario the usuario to set
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    /**
     * @return the participantes
     */
    public List<Participante> getParticipantes() {
        return participantes;
    }

    /**
     * @param participantes the participantes to set
     */
    public void setParticipantes(List<Participante> participantes) {
        this.participantes = participantes;
    }
}
