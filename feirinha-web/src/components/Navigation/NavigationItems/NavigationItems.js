import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import auth from '../../../hoc/Auth/Auth';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/" exact>Burger Builder</NavigationItem> */}
        {/* <NavigationItem link="/orders">Orders</NavigationItem> */}
        <NavigationItem link="/feiras">Feiras</NavigationItem>
        <NavigationItem link="/participantes">Participantes</NavigationItem>
        <NavigationItem link="/produtos">Produtos</NavigationItem>
        { !auth.status() ? <NavigationItem link="/Login">Entrar</NavigationItem> : null}
        { auth.status() ? <NavigationItem link="/Cadastro">Cadastro</NavigationItem>  : null}
        { auth.status() ? <NavigationItem link="/Logout">Sair ({auth.user().login})</NavigationItem>  : null}
    </ul>
);

export default navigationItems;