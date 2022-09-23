import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/fetchtRegister';
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
  const [products, setProducts] = useState([]);
  const history = useHistory();

  async function handleCards() {
    const { data } = await api.get('product')
      .catch((e) => {
        throw e.message;
      });
    console.log('handleCards', data);
    return data;
  }

  useEffect(() => {
    const updateProduct = async () => {
      const result = await handleCards();
      setProducts(result);
      console.log(result);
      return result;
    };
    updateProduct();
  }, []);

  const criarCard = () => products.map((item) => (
    <section key={ item.id }>
      { console.log('"teste de item"', item) }
      <div data-testid={ `customer_products__element-card-price-${item.id}` }>
        {item.price}
      </div>
      <img
        src={ item.urlImage }
        alt="imagem da bebida"
        data-testid={ `customer_products__img-card-bg-image-${item.id}` }
      />
      <h4
        data-testid={ `customer_products__element-card-title-${item.id}` }
      >
        {item.name}
      </h4>
      <input
        type="button"
        value="+"
        alt="Adicionar produto"
        data-testid={ `customer_products__button-card-add-item-${item.id}` }
        onClick={ () => { setValueTotal(valueTotal + Number(item.price)); } }
      />
      <p data-testid={ `customer_products__input-card-quantity-${item.id}` }>0</p>
      <input
        type="button"
        value="-"
        alt="Adicionar produto"
        data-testid={ `customer_products__button-card-rm-item-${item.id}` }
        onClick={ () => { setValueTotal(valueTotal - Number(item.price)); } }
      />
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
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => { history.push('checkout'); } }
      >
        Ver Carrinho:
        { valueTotal }
      </button>
    </section>
  );
}

export default CardsProducts;
