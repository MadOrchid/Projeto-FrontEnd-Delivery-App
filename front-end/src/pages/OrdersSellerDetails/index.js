import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableSaller from '../../components/TableSaller';
import ContextGlobal from '../../context/ContextGlobal';
import { api, updateStatus } from '../../services/fetchtRegister';
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
  const { token } = getKey('user');

  useEffect(() => {
    const updateOrder = async () => {
      const { pathname } = history.location;
      const getId = pathname.match(/(\d+)/);
      console.log('ID', getId);
      const { data } = await api
        .get(`sale/${getId[0]}`, { headers: { Authorization: token } });
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
          {}
        </h3>

        <h3 data-testid={ Status }>
          { order.status }
        </h3>

        <button
          type="button"
          data-testid={ PreparingCheck }
          onClick={ () => updateStatus({ id: order.id, status: 'Preparando ', token }) }
        >
          PREPARANDO PEDIDO
        </button>

        <button
          type="button"
          data-testid={ DispatchCheck }
          onClick={ () => updateStatus({
            id: order.id, status: 'Em Trânsito', token,
          }) }
        >
          SAIU PARA ENTREGA
        </button>
      </section>
      <TableSaller />

      <h2>
        Total:
        {' '}
        <span data-testid={ TotalPrice }>
          {order.totalPrice}
        </span>
      </h2>
    </>
  );
}

export default OrdersSellerDetails;
