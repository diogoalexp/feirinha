import React from 'react';

import classes from './Participante.module.css';

const participante = ( props ) => {
    return (
        <div className={classes.Participante}>
            <p>Nome: {props.nome}</p>
            <p>descr: {props.descr}</p>
        </div>
    );
};

export default participante;