import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Admin from '../pages/Admin';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import OrdersClientDetails from '../pages/OrdersClientDetails';
import OrdersClient from '../pages/OrdersClient';
import OrdersSeller from '../pages/OrdersSeller';
import OrdersSellerDetails from '../pages/OrdersSellerDetails';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Seller from '../pages/Seller';

function Rotas() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/admin/manage" component={ Admin } />
      <Route exact path="/seller/orders" component={ Seller } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:id" component={ OrdersClientDetails } />
      <Route exact path="/customer/orders" component={ OrdersClient } />
      <Route exact path="/seller/orders" component={ OrdersSeller } />
      <Route exact path="/seller/orders/:id" component={ OrdersSellerDetails } />
    </Switch>
  );
}

export default Rotas;
