import React from 'react';

import classes from './EditButton.module.css';
import noImg from '../../../assets/images/no-image-icon.png';

const editButton = (props) => (
    <input
        type="image"
        src={noImg}
        // disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
    // >{props.children}
    ></input>
);

export default editButton;