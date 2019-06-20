/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpr.feirinha.resources;

import com.ufpr.feirinha.model.Participante;
import com.ufpr.feirinha.repository.IParticipanteRepository;
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
@Api(value="API REST Participantes")
public class ParticipanteResource {
    @Autowired
    IParticipanteRepository participanteRepository;
  
    @ApiOperation(value="Retorna uma lista de Participantes")
    @GetMapping("/participante")
    public List<Participante> listaParticipantes(){
        return participanteRepository.findAll();
    }
    
    @ApiOperation(value="Retorna um participante unico")
    @GetMapping("/participante/{id}")
    public Participante listaParticipanteUnico(@PathVariable(value="id") long id){
        return participanteRepository.findById(id);
    }
    
    @ApiOperation(value="Salva um participante")
    @PostMapping("/participante")
    public Participante salvaParticipante(@RequestBody @Valid Participante participante) {
        return participanteRepository.save(participante);
    }
    
    @ApiOperation(value="Deleta um participante")
    @DeleteMapping("/participante")
    public void deletaParticipante(@RequestBody @Valid Participante participante) {
            participanteRepository.delete(participante);
    }

    @ApiOperation(value="Atualiza um participante")
    @PutMapping("/participante")
    public Participante atualizaParticipante(@RequestBody @Valid Participante participante) {
            return participanteRepository.save(participante);
    }    
}
