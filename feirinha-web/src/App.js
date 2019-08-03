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


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/feiras" component={Feiras} />
            <Route path="/participantes" component={Participantes} />
            <Route path="/produtos" component={Produtos} />
            <Route path="/feira" component={Details} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
