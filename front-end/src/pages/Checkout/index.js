import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { getSeller, saveSale } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';
import '../../styles/pages/checkout.css';

function Checkout() {
  const { cart, total, removeFromCart, sellers, setSellers } = useContext(ContextGlobal);
  // const [sellers, setSeller] = useState([]);
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({
    userId: getKey('keyUser'),
    sellerId: 2,
    totalPrice: Number(total.toFixed(2)),
    deliveryAddress: '',
    deliveryNumber: '',
    /* products: cart.map((p) => ({
      productId: p.id,
      quantity: p.qtd,
    })), */
  });

  const history = useHistory();

  useEffect(() => {
    const updateSellers = async () => {
      const data = await getSeller();
      setSellers(data);
      setSale({ ...sale, sellerId: data[0].id });
    };
    updateSellers();
  }, []);

  useEffect(() => {
    const updateProducts = cart
      .map((element) => ({ productId: element.id, quantity: element.qtd }));
    setProducts(updateProducts);
  }, [cart]);

  const handleSubmit = async () => {
    const { token } = getKey('user');
    const id = await saveSale(token, { sale, products });
    history.push(`/customer/orders/${id}`);
  };

  return (
    <>
      <HearderProducts />
      <h1 id="title">Finalizar Pedido</h1>
      <table>
        <tbody style={ { textAlign: 'center' } }>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Subtotal</th>
            <th>Remover Item</th>
          </tr>
        </tbody>
        <tbody style={ { textAlign: 'center' } }>
          {cart.length > 0 && cart
            .map((item, index) => (
              <tr key={ item.id }>
                <td
                  id="id"
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  id="name"
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { item.name }
                </td>
                <td
                  id="quantity"
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { item.qtd }
                </td>
                <td
                  id="unitPrice"
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  R$
                  {' '}
                  { item.price.replace(/\./, ',') }
                </td>
                <td id="subTotal">
                  R$
                  {' '}
                  <span
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {
                      (item.price * item.qtd).toFixed(2).toString().replace(/\./, ',')
                    }
                  </span>
                </td>
                <td id="remove">
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => {
                      removeFromCart(item);
                    } }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            )) }
        </tbody>
        <h1
          data-testid="customer_checkout__element-order-total-price"
        >
          Total: R$
          { total.toFixed(2).replace(/\./, ',') }
        </h1>
      </table>

      <section id="addressDetails">
        <h1>Detalhes e Endereço para entrega</h1>
        <div id="informationSeller">
          <label htmlFor="sellerId">
            P. Vendedor(a) Responsável:
            <select
              data-testid="customer_checkout__select-seller"
              name="sellerId"
              onChange={ (e) => setSale({ ...sale, sellerId: Number(e.target.value) }) }
              id="sellerId"
            >
              {sellers && sellers.map((seller) => (
                <option
                  key={ seller.id }
                  value={ seller.id }
                >
                  {seller.name}
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="deliveryAddress">
            Endereço:
            <input
              data-testid="customer_checkout__input-address"
              placeholder="Travessa Santa Birita de Meu Rei"
              type="text"
              name="deliveryAddress"
              id="deliveryAddress"
              onChange={ (e) => setSale({ ...sale, deliveryAddress: e.target.value }) }
            />
          </label>

          <label htmlFor="deliveryNumber">
            Número:
            <input
              data-testid="customer_checkout__input-address-number"
              placeholder="123"
              type="number"
              name="deliveryNumber"
              id="deliveryNumber"
              onChange={ (e) => setSale({ ...sale, deliveryNumber: e.target.value }) }
            />
          </label>
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            id="submitOrder"
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
