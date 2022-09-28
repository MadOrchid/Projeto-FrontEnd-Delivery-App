import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { getSeller, saveSale } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function Checkout() {
  const { cart, total, removeFromCart } = useContext(ContextGlobal);
  const [sellers, setSeller] = useState([]);
  // const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({
    sellerName: '',
    userName: getKey('user').name,
    totalPrice: total,
    deliveryAddress: '',
    deliveryNumber: '',
    products: cart.map((p) => ({
      productId: p.id,
      quantity: p.qtd,
    })),
  });

  const history = useHistory();

  useEffect(() => {
    const updateSellers = async () => {
      const data = await getSeller();
      setSeller(data);
      setSale({ ...sale, sellerName: data[0].name });
    };
    updateSellers();
  }, []);

  const handleSubmit = async () => {
    const { token } = getKey('user');
    const id = await saveSale(token, sale);
    history.push(`/customer/orders/${id}`);
  };

  return (
    <>
      <HearderProducts />
      <h3>Finalizar Pedido</h3>

      <section>
        {cart.length > 0 && cart
          .map((item, index) => (
            <div
              key={ item.id }
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
                { item.qtd }

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
                { (item.price * item.qtd).toFixed(2).replace(/\./, ',') }
              </h3>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                type="button"
                onClick={ () => {
                  removeFromCart(item);
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
            onChange={ (e) => setSale({ ...sale, sellerName: e.target.value }) }
          >

            {sellers && sellers.map((seller) => (
              <option
                key={ seller }
                value={ seller }
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
            onChange={ (e) => setSale({ ...sale, deliveryAddress: e.target.value }) }
          />
          <input
            data-testid="customer_checkout__input-address-number"
            placeholder="Número de entrega"
            type="text"
            name="deliveryNumber"
            onChange={ (e) => setSale({ ...sale, deliveryNumber: e.target.value }) }
          />
          <h3
            data-testid="customer_checkout__element-order-total-price"
          >
            Total: R$
            { total.toFixed(2).replace(/\./, ',') }
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
