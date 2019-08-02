import React from 'react';

import classes from './Card.module.css';
import noImg from '../../assets/images/no-image-icon.png';


const card = ( props ) => {
    const img = props.img != null ? props.img : noImg;
    return (
            <div className={classes.Card}>
                <div className={classes.Imagem}>
                    <img src={img} alt="Sem Foto" />
                </div>
                <div className={classes.Nome}>
                   <b>{props.nome}</b>
                </div>
                <div className={classes.Descr}>
                        {props.descr}
                </div>
                <div className={classes.Footer}>
                    {props.footer}
                </div>
            </div>
    );
};

export default card;
