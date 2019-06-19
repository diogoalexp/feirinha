/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.repository;

import com.ufpr.feirinha.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author diogo
 */
public interface IEstadoRepository extends JpaRepository<Estado, Long>{
	Estado findById(long id);
}