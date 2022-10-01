import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableOrders from '../../components/TableOrders';
import ContextGlobal from '../../context/ContextGlobal';
import { getSeller, updateStatus } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersClientDetails() {
  const OrderId = 'customer_order_details__element-order-details-label-order-id';
  const SellerName = 'customer_order_details__element-order-details-label-seller-name';
  const OrderDate = 'customer_order_details__element-order-details-label-order-date';
  const Status = 'customer_order_details__element-order-details-label-delivery-status';
  const TotalPrice = 'customer_order_details__element-order-total-price';
  const DeliveryCheck = 'customer_order_details__button-delivery-check';
  const { order, setOrder, setSellers } = useContext(ContextGlobal);
  const [seller, setSeller] = useState({ name: '' });
  const [status, setStatus] = useState('');
  const { token } = getKey('user');
  const history = useHistory();
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '750px',
    backgroundColor: 'pink',
  };

  useEffect(() => {
    const updateSellers = async () => {
      const data = await getSeller();
      setSellers(data);
      setSeller(data.find((s) => s.id === order.sellerId));
    };
    updateSellers();
  }, []);

  useEffect(() => {
    const updateOrder = async () => {
      const { pathname } = history.location;
      const getId = pathname.match(/(\d+)/);
      const { data } = await api
        .get(`sale/${getId[0]}`, { headers: { Authorization: token } });
      setOrder(data);
      setStatus(data.status);
    };
    updateOrder();
  }, []);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section style={ style }>
        <h3>
          Pedido:
          {' '}
          <span
            data-testid={ OrderId }
          >
            { order.id }
          </span>
        </h3>

        <h3>
          P. Vend:
          {' '}
          <span
            data-testid={ SellerName }
          >
            { seller.name }
          </span>
        </h3>

        <h3 data-testid={ OrderDate }>
          { dateConvert(order.saleDate) }
        </h3>

        <h3 data-testid={ `${Status}-${order.id}` }>
          { status }
        </h3>

        <button
          type="button"
          data-testid={ DeliveryCheck }
          onClick={ () => {
            updateStatus({ token, id: order.id, status: 'Entregue' });
            setStatus('Entregue');
          } }
        >
          MARCAR COMO ENTREGUE
        </button>
      </section>
      <TableOrders />

      <h2>
        Total:
        {' '}
        <span data-testid={ TotalPrice }>
          { console.log(order) }
          { order.totalPrice.toString().replace('.', ',') }
        </span>
      </h2>
    </>
  );
}

export default OrdersClientDetails;
