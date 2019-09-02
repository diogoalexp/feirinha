import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home/Home';
import Layout from './hoc/Layout/Layout';
import Feiras from './containers/Feiras/Feiras';
import Participantes from './containers/Participantes/Participantes';
import Produtos from './containers/Produtos/Produtos';
import FormFeira from './containers/Feiras/FormFeira/FormFeira';
import FormProduto from './containers/Produtos/FormProduto/FormProduto';
import FormParticipante from './containers/Participantes/FormParticipante/FormParticipante';
import FormCadastro from './containers/Login/FormCadastro/FormCadastro';
import Login from './containers/Login/Login';
import Logout from './containers/Login/Logout';


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
            <Route path="/" exact component={Feiras} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
