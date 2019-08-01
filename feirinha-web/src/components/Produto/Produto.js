import React from 'react';

import classes from './Produto.module.css';

const produto = ( props ) => {
    return (
        <div className={classes.Produto}>
            <p>Nome: {props.nome}</p>
            <p>descr: {props.descr}</p>
        </div>
    );
};

export default produto;