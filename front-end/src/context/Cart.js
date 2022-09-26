import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';
import { setKey } from '../services/LocalStorage';

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function removeFromCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (item && item.quantity > 0) {
      item.quantity -= 1;
      item.subTotal = item.quantity * item.price;
      setCart(copyCart);
    }
    setKey('carrinho', cart);
  }

  const state = useMemo(
    () => (
      {
        cart,
        setCart,
        total,
        setTotal,
        removeFromCart,
      }),
    [cart],
  );

  return (
    <CartContext.Provider
      value={ state }
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
