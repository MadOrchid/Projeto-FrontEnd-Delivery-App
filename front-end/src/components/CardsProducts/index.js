import React from 'react';

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
            />
            <p data-testid={ `customer_products__input-card-quantity-${item.id}` }>0</p>
            <input
              type="button"
              value="-"
              alt="Adicionar produto"
              data-testid={ `customer_products__button-card-rm-item-${item.id}` }
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
      >
        Ver Carrinho
      </button>
    </section>
  );
}

export default CardsProducts;
