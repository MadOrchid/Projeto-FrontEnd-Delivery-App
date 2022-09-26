import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Seller from '../pages/Seller';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route exact path="/seller/orders" component={ Seller } />
    </Switch>
  );
}

export default Rotas;
