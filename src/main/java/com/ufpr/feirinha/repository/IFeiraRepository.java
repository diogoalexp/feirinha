/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.repository;

import com.ufpr.feirinha.model.Categoria;
import com.ufpr.feirinha.model.Feira;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author diogo
 */
public interface IFeiraRepository extends JpaRepository<Feira, Long>{
	Feira findById(long id);
}
