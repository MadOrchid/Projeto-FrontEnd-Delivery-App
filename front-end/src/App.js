import React from 'react';
import './App.css';
import Routes from './Routes';
// import Provider from './context/Provider';
import CartProvider from './context/Cart';

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>

  );
}

export default App;
