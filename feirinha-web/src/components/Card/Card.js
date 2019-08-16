import React from 'react';

import classes from './Card.module.css';
import noImg from '../../assets/images/no-image-icon.png';
import edit from '../../assets/images/edit-icon.png';
import auth from '../../hoc/Auth/Auth';


const card = ( props ) => {
    const img = props.img != null ? "data:image/png;base64,"+props.img : noImg;
    const CardClasses = [classes.Card];
    let owner = false;
    if (props.owner && auth.user() && props.owner.id == auth.user().id){
        CardClasses.push(classes.Owner);        
        owner = true;
    }

    return (
            <div className={CardClasses.join(" ")} onClick={props.edit}>
                {owner ? 
                    <div className={classes.Edit}>
                        <img src={edit} alt="Sem Foto" />
                    </div>
                : null}
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
