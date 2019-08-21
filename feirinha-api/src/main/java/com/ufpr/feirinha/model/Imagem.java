/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.model;

import javax.persistence.Column;
import javax.persistence.Lob;

/**
 *
 * @author diogo
 */
public class Imagem {
    
    @Lob
//    @Column(name="img", nullable = true)
    private byte[] img;
    
}
