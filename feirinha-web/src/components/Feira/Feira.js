import React from 'react';

import Card from '../Card/Card';
import classes from './Feira.module.css';


const feira = ( props ) => {
    const footer =  dataFormatada(props.data);

    function dataFormatada(date){
        var data = new Date(date),
                dia  = data.getDate().toString().padStart(2, '0'),//data.getUTCDate().toString().padStart(2, '0'),
                mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }
      
    return (
        <div className={classes.Feira}>
        <Card 
            img={props.img}
            nome={props.nome} 
            descr={props.descr}
            footer={footer}
            edit={props.edit}
            owner={props.owner}
        />
        </div>
    );
};

export default feira;