import React from 'react';

import Card from '../Card/Card';

const participante = ( props ) => {
    const footer = props.endereco;
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

export default participante;