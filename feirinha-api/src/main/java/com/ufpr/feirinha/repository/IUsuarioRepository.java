/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.repository;

import com.ufpr.feirinha.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author diogo
 */
public interface IUsuarioRepository extends JpaRepository<Usuario, Long>{
    Usuario findById(long id);
    List<Usuario> findByLoginAndSenha(String login, String senha);
    List<Usuario> findByCpfAndSenha(String cpf, String senha);
}
