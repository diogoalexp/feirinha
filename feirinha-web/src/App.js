import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Feiras from './containers/Feiras/Feiras';
import Participantes from './containers/Participantes/Participantes';
import Produtos from './containers/Produtos/Produtos';
import Details from './containers/Feiras/Details/Details';
import Login from './containers/Login/Login';
import Logout from './containers/Login/Logout';
import FormFeira from './containers/Feiras/FormFeira/FormFeira';
import FormProduto from './containers/Produtos/FormProduto/FormProduto';
import FormCadastro from './containers/Login/FormCadastro/FormCadastro';
import FormParticipante from './containers/Participantes/FormParticipante/FormParticipante';
import Home from './containers/Home/Home';


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/feiras" component={Feiras} />
            <Route path="/participantes" component={Participantes} />
            <Route path="/produtos" component={Produtos} />
            <Route path="/feira" component={FormFeira} />
            <Route path="/participante" component={FormParticipante} />
            <Route path="/produto" component={FormProduto} />
            <Route path="/cadastro" component={FormCadastro} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={Feiras} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
