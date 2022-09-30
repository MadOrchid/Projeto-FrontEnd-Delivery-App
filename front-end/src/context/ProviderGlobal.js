import PropTypes from 'prop-types';
import { useState } from 'react';
import { setKey } from '../services/LocalStorage';
import ContextGlobal from './ContextGlobal';

export default function ProviderGlobal({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const { Provider } = ContextGlobal;

  function removeFromCart(product) {
    const copyCart = [...cart];
    const newCart = copyCart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
    const newTotal = newCart
      .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
    setTotal(newTotal <= 0.00 ? 0.00 : newTotal);

    // if (item && item.qtd > 0) {
    //   item.qtd -= 1;
    //   item.subTotal = item.qtd * item.price;
    //   setCart(copyCart);
    // }
    setKey('carrinho', cart);
  }
  /*
  function updateToCart(products) {
    if (!products) {
      setCart(products);
      const valueTotal = products
        .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
      setTotal(valueTotal);
    }
  } */

  function updateToCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (!item) {
      setCart([...cart], { ...product, qtd: 1, subTotal: +product.price });
      setCart(copyCart);
    }
    setKey('carrinho', cart);
  }

  function clearCart() {
    setCart([]);
    setKey('carrinho', cart);
  }

  function dateConvert(date) {
    const TEN = 10;
    const dateUSA = new Date(date.substring(0, TEN));
    return new Intl.DateTimeFormat('pt-BR')
      .format(dateUSA);
  }

  const value = {
    cart,
    total,
    order,
    orders,
    sellers,
    setCart,
    setTotal,
    setOrder,
    setOrders,
    setSellers,
    removeFromCart,
    updateToCart,
    clearCart,
    dateConvert,
  };

  return <Provider value={ value }>{children}</Provider>;
}

ProviderGlobal.propTypes = {
  children: PropTypes.node.isRequired,
};
