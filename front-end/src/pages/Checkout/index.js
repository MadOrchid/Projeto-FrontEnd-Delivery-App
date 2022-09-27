import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import CartContext from '../../context/Cart';
import { getKey } from '../../services/LocalStorage';

function Checkout() {
  console.log(useContext(CartContext));
  const cart = useContext(CartContext);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sale, setSalve] = useState({
    sellerId: '',
    userId: getKey('user').id,
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    saleDate: new Date(),
    status: 'Pendente',
  });
  console.log([cart]);

  const history = useHistory();

  const handleChange = () => {

  };

  const handleSubmit = () => {
    history.push('/customer/orders');
  };

  return (
    <>
      <HearderProducts />
      <h3>Finalizar Pedido</h3>
      <section>
        {cart && cart
          .filter((item) => (item.quantity > 0))
          .map((item, index) => (
            <div
              key={ item.id }
              className={ style.cartItem }
            >
              <h3
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                Item:
                {' '}
                { index + 1 }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                Produto:
                {' '}
                { item.name }

              </h3>
              <h3
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                Quantidade:
                {' '}
                { item.quantity }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                Preço: R$
                { item.price.replace(/\./, ',') }

              </h3>
              <h3
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                Subtotal:  R$
                { item.subTotal.toFixed(2).replace(/\./, ',') }

              </h3>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                type="button"
                onClick={ () => {
                  removeItemFromCart(item);
                } }
              >
                REMOVE
              </button>
            </div>
          )) }
      </section>
      <section>
        <div>
          <h3>Detalhes e Endereço para entrega</h3>
          <select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
            onChange={ handleChange }
            onClick={ handleChange }
          >
            {sellers && sellers.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
              >
                {seller.name}
              </option>
            ))}

          </select>
          <input
            data-testid="customer_checkout__input-address"
            placeholder="Endereço de entrega"
            type="text"
            name="deliveryAddress"
            onChange={ handleChange }
          />
          <input
            data-testid="customer_checkout__input-addressNumber"
            placeholder="Número de entrega"
            type="text"
            name="deliveryNumber"
            onChange={ handleChange }
          />
          <h3
            data-testid="customer_checkout__element-order-total-price"
          >
            Total: R$
            { sale.totalPrice.toFixed(2).replace(/\./, ',') }
          </h3>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
          >
            Finalizar Pedido
          </button>
        </div>
      </section>
    </>
  );
}

export default Checkout;
