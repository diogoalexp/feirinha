import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/feiras">Feiras</NavigationItem>
        <NavigationItem link="/participantes">Participantes</NavigationItem>
        <NavigationItem link="/produtos">Produtos</NavigationItem>
    </ul>
);

export default navigationItems;