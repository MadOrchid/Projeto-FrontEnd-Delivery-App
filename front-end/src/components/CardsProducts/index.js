import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';

import '../../styles/components/cards-products.css';

function CardsProducts() {
  const [valueTotal, setValueTotal] = useState(0.00);
  const [isDisabled, setIsDisabled] = useState(true);
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { setCart, setTotal } = useContext(ContextGlobal);

  async function handleCards() {
    const { data } = await api.get('product', { headers: { Authorization: token } })
      .catch((e) => {
        throw e.message;
      });
    return data;
  }

  const sumTotalPrice = (list) => {
    setIsDisabled(valueTotal);
    const newList = list
      .reduce((a, c) => a + Number(c.price) * Number(c.qtd), 0);
    setValueTotal(newList <= 0.00 ? 0.00 : newList);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cart = products.filter((itemCart) => itemCart.qtd !== 0);
    setTotal(valueTotal);
    setCart(cart);
    if (valueTotal !== 0) return setIsDisabled(false);
    return setIsDisabled(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTotal]);

  const criarCard = () => products.map((item) => (
    <section key={ item.id } id="cardProducts">
      <h2>
        R$
        {' '}
        <span data-testid={ `customer_products__element-card-price-${item.id}` }>
          {`${item.price.toString().replace('.', ',')}`}
        </span>
      </h2>
      <img
        src={ item.urlImage }
        alt={ item.name }
        data-testid={ `customer_products__img-card-bg-image-${item.id}` }
        height="250px"
      />
      <p data-testid={ `customer_products__element-card-title-${item.id}` }>
        {item.name}
      </p>
      <div id="adicionar">
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
          <span>
            -
          </span>
        </button>
      </div>
    </section>
  ));

  return (
    <main>
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
        Ver Carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          { `${valueTotal.toFixed(2).toString().replace('.', ',')}` }
        </span>
      </button>
    </main>
  );
}

export default CardsProducts;
