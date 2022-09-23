import React from 'react';
import { useHistory } from 'react-router-dom';
/*
  - 15: customer_products__element-card-title-<id>
  - 16: customer_products__element-card-price-<id>
  - 17: customer_products__img-card-bg-image-<id>
  - 18: customer_products__button-card-add-item-<id>
  - 19: customer_products__button-card-rm-item-<id>
  - 20: customer_products__input-card-quantity-<id>
  - 21: customer_products__checkout-bottom-value
*/

/* async function handleCards() {
  await api.get('products')
    .catch((e) => {
      throw e.message;
    });
} */

function CardsProducts() {
  // const [valueTotal, setValueTotal] = useState(0.00);
  const history = useHistory();
  return (
    <section>
      <h1>CardsProducts</h1>
      {
        /*
        handleCards().map((item) => (
          <>
            <h3
              data-testid={ `customer_products__element-card-title-${item.id}` }
            >
              {item.price}
            </h3>
            <img
              src={ item.url_image }
              alt="imagem da bebida"
              data-testid={ `customer_products__img-card-bg-image-${item.id}` }
            />
            <h4 data-testid="customer_products__element-card-title-">{item.name}</h4>
            <input
              type="button"
              value="+"
              alt="Adicionar produto"
              data-testid={ `customer_products__button-card-add-item-${item.id}` }
              onClick={ () => { setValueTotal(valueTotal + Number(item.price) ) } }
            />
            <p data-testid={ `customer_products__input-card-quantity-${item.id}` }>0</p>
            <input
              type="button"
              value="-"
              alt="Adicionar produto"
              data-testid={ `customer_products__button-card-rm-item-${item.id}` }
              onClick={ () => { setValueTotal(valueTotal - Number(item.price) ) } }
            />
          </>
        )) */
      }
      <br />
      <br />
      <button
        type="button"
        alt="Ver Carrinho"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => { history.push('checkout'); } }
      >
        Ver Carrinho: 0.00
        { /* valueTotal */ }
      </button>
    </section>
  );
}

export default CardsProducts;
