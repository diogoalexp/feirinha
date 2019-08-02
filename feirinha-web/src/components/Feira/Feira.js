import React from 'react';

import Card from '../Card/Card';
import classes from './Feira.module.css';

const feira = ( props ) => {
    const footer = dataFormatada(props.data);

    function dataFormatada(date){
        const data = new Date(date),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
      
    return (
        <Card 
            img={props.img}
            nome={props.nome} 
            descr={props.descr}
            footer={footer}
        />
    );
};

export default feira;