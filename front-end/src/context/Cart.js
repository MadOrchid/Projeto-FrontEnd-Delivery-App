import PropTypes from 'prop-types';
import { createContext, useState, useMemo } from 'react';
import { setKey } from '../services/LocalStorage';

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

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
  function addToCart(product) {
    const copyCart = [...cart];
    const item = copyCart.find((cartItem) => cartItem.id === product.id);

    if (!item) {
      setCart([...cart, { ...product, qtd: 1, subTotal: +product.price }]);
    }
  }

  function updateToCart(products) {
    if (!item) {
      setCart(products);
      const valueTotal = products
        .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
      setTotal(valueTotal);
    }
  }

  const addCart = (product) => {
    setCart((old) => ({
      ...old,
      [product.id]: product,
    }));
  };

  const state = useMemo(
    () => (
      {
        cart,
        setCart,
        setTotal,
        removeFromCart,
        addToCart,
        updateToCart,
        total,
        addCart,
      }),
    [cart],
  );

  return (
    <CartContext.Provider
      value={ { state } }
    >
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

// export const useCart = () => {
//   const cart = useContext(CartContext);
//   return cart;
// };
