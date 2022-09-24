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
  const [products, setProducts] = useState([]);
  // const [quantity, setQuantity] = useState([].length(products.length));
  const history = useHistory();

  async function handleCards() {
    const { data } = await api.get('product')
      .catch((e) => {
        throw e.message;
      });
    console.log('handleCards', data);
    return data;
  }

  /*
    updateProduct = (productUpdate) => {
      const { cartItems } = this.state;
      const productNewList = cartItems
        .filter((element) => (element.id === productUpdate.id ? productUpdate : element));
      this.setState({ cartItems: productNewList });
    }
  */

  function productDecrease(index, price) {
    setValueTotal(valueTotal > 0 ? valueTotal - Number(price) : 0);
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd = element.qtd > 0 ? element.qtd - 1 : 0;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
  }

  function productIncrease(index, price) {
    setValueTotal(valueTotal + Number(price));
    const updateProducts = products
      .map((element) => {
        if (element.id === index) {
          element.qtd += 1;
          return element;
        }
        return element;
      });
    setProducts(updateProducts);
  }

  useEffect(() => {
    const updateProduct = async () => {
      const result = await handleCards();
      result.forEach((element) => { element.qtd = 0; });
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
        onClick={ () => productIncrease(item.id, item.price) }
      />
      <p
        data-testid={ `customer_products__input-card-quantity-${item.id}` }
      >
        { Number(item.qtd) }
      </p>
      <input
        type="button"
        value="-"
        alt="Adicionar produto"
        data-testid={ `customer_products__button-card-rm-item-${item.id}` }
        onClick={ () => productDecrease(item.id, item.price) }
      />
    </section>
  ));

  useEffect(() => {
  }, []);

  return (
    <section>
      <h1>CardsProducts</h1>
      { products.length > 0 && criarCard() }
      <br />
      <br />
      <button
        type="button"
        alt="Ver Carrinho"
        // data-testid="customer_products__checkout-bottom-value"
        data-testid="customer_products__button-cart"
        onClick={ () => { history.push('checkout'); } }
      >
        Ver Carrinho:
        { valueTotal.toFixed(2) }
      </button>
    </section>
  );
}

export default CardsProducts;
