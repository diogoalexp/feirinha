import React from 'react';

import Card from '../Card/Card';

const produto = ( props ) => {
    const footer = props.valor;
    return (
        <Card 
            img={props.img}
            nome={props.nome} 
            descr={props.descr}
            footer={footer}
        />
    );
};

export default produto;