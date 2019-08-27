import React from 'react';

import Card from '../Card/Card';

const produto = ( props ) => {
    const footer = props.valor != null ? "R$ " + props.valor.toFixed(2) : null;
    return (
        <Card 
            img={props.img}
            nome={props.nome} 
            descr={props.descr}            
            footer={footer}
            edit={props.edit}
            owner={props.owner}
        />
    );
};

export default produto;