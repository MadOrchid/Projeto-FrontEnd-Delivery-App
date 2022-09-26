import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  // const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  async function handleCards() {
    const { data } = await api.get('product')
      .catch((e) => {
        throw e.message;
      });
    // console.log('handleCards', data);
    return data;
  }

  function productDecrease(index, price) {
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd = element.qtd <= 0 ? 0 : element.qtd - 1;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
    setValueTotal(valueTotal <= 0.00 ? 0 : valueTotal - Number(price));
    // setQuantity(quantity > 0 ? quantity - 1 : 0);
  }

  function productIncrease(index, price) {
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd += 1;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
    setValueTotal(valueTotal + Number(price));
    // setQuantity(quantity + 1);
  }

  useEffect(() => {
    const updateProduct = async () => {
      const result = await handleCards();
      result.forEach((element) => { element.qtd = 0; });
      setProducts(result);
      // console.log(result);
      return result;
    };
    updateProduct();
  }, []);

  const criarCard = () => products.map((item) => (
    <section key={ item.id }>
      {/* { console.log('"teste de item"', item) } */}
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
        onClick={ () => productIncrease(item.id, item.price) }
      >
        +
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${item.id}` }
        type="number"
        min={ 0 }
        value={ Number(item.qtd) /* quantity */ }
      />
      <button
        type="button"
        value="-"
        alt="Remover produto"
        data-testid={ `customer_products__button-card-rm-item-${item.id}` }
        onClick={ () => productDecrease(item.id, item.price) }
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
