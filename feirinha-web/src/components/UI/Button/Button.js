import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button
        type={props.type}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        value={props.value}
        onClick={props.clicked}>{props.children}</button>
);

export default button;