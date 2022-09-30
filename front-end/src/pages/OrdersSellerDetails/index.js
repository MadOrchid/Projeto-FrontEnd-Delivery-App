import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableSaller from '../../components/TableSaller';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersSellerDetails() {
  const OrderId = 'seller_order_details__element-order-details-label-order-id';
  const Status = 'seller_order_details__element-order-details-label-delivery-status';
  const OrderDate = 'seller_order_details__element-order-details-label-order-date';
  const PreparingCheck = 'seller_order_details__button-preparing-check';
  const DispatchCheck = 'seller_order_details__button-dispatch-check';
  const TotalPrice = 'seller_order_details__element-order-total-price';

  const { order, setOrder } = useContext(ContextGlobal);
  const history = useHistory();

  useEffect(() => {
    const updateOrder = async () => {
      const { token } = getKey('user');
      const { hash } = history.location;
      const { data } = await api
        .get(`sale/${hash}`, { headers: { Authorization: token } });
      setOrder(data);
    };
    updateOrder();
  }, []);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section>
        <h3>
          Pedido:
          {' '}
          <span data-testid={ OrderId }>
            { order.id }
          </span>
        </h3>

        <h3 data-testid={ OrderDate }>
          {new Intl.DateTimeFormat('pt-BR').format(newData)}
        </h3>

        <h3 data-testid={ Status }>
          { order.status }
        </h3>

        <button
          type="button"
          data-testid={ PreparingCheck }
          onClick={ () => {} }
        >
          PREPARANDO PEDIDO
        </button>

        <button
          type="button"
          data-testid={ DispatchCheck }
          onClick={ () => {} }
        >
          SAIU PARA ENTREGA
        </button>
      </section>
      <TableSaller />

      <h2>
        Total:
        {' '}
        <span data-testid={ TotalPrice }>
          {order.totalPrice.toString().replace('.', ',')}
        </span>
      </h2>
    </>
  );
}

export default OrdersSellerDetails;
