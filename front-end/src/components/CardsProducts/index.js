/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
/*
  - 15: customer_products__element-card-title-<id>
  - 16: customer_products__element-card-price-<id>
  - 17: customer_products__img-card-bg-image-<id>
  - 18: customer_products__button-card-add-item-<id>
  - 19: customer_products__button-card-rm-item-<id>
  - 20: customer_products__input-card-quantity-<id>
  - 21: customer_products__checkout-bottom-value
*/

function CardsProducts() {
  const [valueTotal, setValueTotal] = useState(0.00);
  const [isDisabled, setIsDisabled] = useState();
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { setCart, setTotal } = useContext(ContextGlobal);

  async function handleCards() {
    const { data } = await api.get('product', { headers: { Authorization: token } })
      .catch((e) => {
        throw e.message;
      });
    console.log('handleCards', data);
    return data;
  }

  const sumTotalPrice = (list) => {
    setIsDisabled(valueTotal);
    console.log('Valor Total', valueTotal);
    const newList = list
      .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
    setValueTotal(newList <= 0.00 ? 0.00 : newList);
    if (valueTotal > 0 || valueTotal > 0.00) return setIsDisabled(false);
    return setIsDisabled(true);
  };

  function handleQuantity({ target }, id) {
    const { value } = target;
    if (Number(value) <= 0) { setValueTotal(0); }
    const updateQuantity = products
      .map((element) => {
        if (element.id === id) {
          element.qtd = Number(value);
          return element;
        }
        return element;
      });
    setProducts(updateQuantity);
    sumTotalPrice(updateQuantity);
  }

  function productDecrease(index) {
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd = element.qtd <= 0 ? 0 : element.qtd - 1;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
    sumTotalPrice(updateProducts);
  }

  function productIncrease(index) {
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd += 1;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
    sumTotalPrice(updateProducts);
  }

  useEffect(() => {
    const updateProduct = async () => {
      const result = await handleCards();
      result.forEach((element) => { element.qtd = 0; });
      setProducts(result);
      return result;
    };
    updateProduct();
  }, []);

  useEffect(() => {
    const cart = products.filter((itemCart) => itemCart.qtd !== 0);
    setTotal(valueTotal);
    setCart(cart);
  }, [valueTotal]);

  const criarCard = () => products.map((item) => (
    <section key={ item.id }>
      <h2 data-testid={ `customer_products__element-card-title-${item.id}` }>
        {item.name}
      </h2>
      <h3 data-testid={ `customer_products__element-card-price-${item.id}` }>
        {`${item.price.toString().replace('.', ',')}`}
      </h3>
      <img
        src={ item.urlImage }
        alt={ item.name }
        data-testid={ `customer_products__img-card-bg-image-${item.id}` }
        height="250px"
      />
      <button
        type="button"
        alt="Adicionar produto"
        data-testid={ `customer_products__button-card-add-item-${item.id}` }
        onClick={ () => productIncrease(item.id) }
      >
        +
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${item.id}` }
        type="number"
        min={ 0 }
        onChange={ (e) => handleQuantity(e, item.id) }
        value={ item.qtd }
      />
      <button
        type="button"
        value="-"
        alt="Remover produto"
        data-testid={ `customer_products__button-card-rm-item-${item.id}` }
        onClick={ () => productDecrease(item.id) }
      >
        -
      </button>
    </section>
  ));

  return (
    <section>
      <h1>CardsProducts</h1>
      { products.length > 0 && criarCard() }
      <br />
      <br />
      <button
        type="button"
        alt="Ver Carrinho"
        onClick={ () => { history.push('checkout'); } }
        data-testid="customer_products__button-cart"
        disabled={ isDisabled }
      >
        Ver Carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          { `${valueTotal.toFixed(2).toString().replace('.', ',')}` }
        </span>
      </button>
    </section>
  );
}

export default CardsProducts;
