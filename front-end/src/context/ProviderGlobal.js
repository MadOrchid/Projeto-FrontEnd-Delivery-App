import PropTypes from 'prop-types';
import { useState } from 'react';
import { setKey } from '../services/LocalStorage';
import ContextGlobal from './ContextGlobal';

export default function ProviderGlobal({ children }) {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const { Provider } = ContextGlobal;

  function removeFromCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (item && item.qtd > 0) {
      item.qtd -= 1;
      item.subTotal = item.qtd * item.price;
      setCart(copyCart);
    }
    setKey('carrinho', cart);
  }

  function updateToCart(products) {
    if (!products) {
      setCart(products);
      const valueTotal = products
        .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
      setTotal(valueTotal);
    }
  }

  const value = {
    cart,
    total,
    setCart,
    setTotal,
    removeFromCart,
    updateToCart,
  };

  return <Provider value={ value }>{children}</Provider>;
}

ProviderGlobal.propTypes = {
  children: PropTypes.node.isRequired,
};
