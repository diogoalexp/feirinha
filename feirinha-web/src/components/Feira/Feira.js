import React from 'react';

import classes from './Feira.module.css';

const feira = ( props ) => {
    return (
        <tr>
            <td className={classes.Feira}>
                Nome: {props.nome}
            </td>
            <td className={classes.Feira}>
                descr: {props.descr}
            </td>
        </tr>
    );
};

export default feira;