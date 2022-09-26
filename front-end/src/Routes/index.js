import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CartProvider from '../context/Cart';
import Admin from '../pages/Admin';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
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
      <CartProvider>
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </CartProvider>
    </Switch>
  );
}

export default Rotas;
