import React, { useContext, useState } from 'react';
import CartContext from '../../context/Cart';
import { getKey } from '../../services/LocalStorage';

function Checkout() {
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

  const data = JSON.parse(localStorage.getItem('user'));

  console.log(data);

  return (
    <>
      <h3
        data-testid="customer_checkout__element-order-table-name"
      >
        Produto:
        {' '}
        { console.log(cart) }

      </h3>

      <h3
        data-testid="customer_checkout__element-order-table-name"
      >
        Produto:
        {' '}

      </h3>
      <h3
        data-testid="customer_checkout__element-order-table-quantity"
      >
        Quantidade:
        {' '}

      </h3>
      <h3
        data-testid="customer_checkout__element-order-table-unit-price"
      >
        Preço: R$

      </h3>
      <h3
        data-testid="customer_checkout__element-order-table-sub-total"
      >
        Subtotal:  R$

      </h3>
      <button
        data-testid="customer_checkout__element-order-table-remove"
        type="button"
      >
        REMOVE
      </button>
      <section>
        <div>
          <select
            data-testid="customer_checkout__select-seller"
            name="sellerId"
          >
            <option value="1">Janeiro</option>
          </select>
          <input
            data-testid="customer_checkout__input-address "
            placeholder="Endereço de entrega"
            type="text"
            name="deliveryAddress"
          />
          <input
            data-testid="customer_checkout__input-addressNumber"
            placeholder="Número de entrega"
            type="text"
            name="deliveryNumber"

          />
          <h3
            data-testid="customer_checkout__element-order-total-price"
          >
            Total: R$
          </h3>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
          >
            Finalizar Pedido
          </button>
        </div>
      </section>
    </>
  );
}

export default Checkout;
