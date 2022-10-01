import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableOrders from '../../components/TableOrders';
import ContextGlobal from '../../context/ContextGlobal';
import { api, getSeller, updateStatus } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersClientDetails() {
  const OrderId = 'customer_order_details__element-order-details-label-order-id';
  const SellerName = 'customer_order_details__element-order-details-label-seller-name';
  const OrderDate = 'customer_order_details__element-order-details-label-order-date';
  const Status = 'customer_order_details__element-order-details-label-delivery-status';
  const TotalPrice = 'customer_order_details__element-order-total-price';
  const DeliveryCheck = 'customer_order_details__button-delivery-check';
  const { order, setOrder, setSellers, dateConvert } = useContext(ContextGlobal);
  const [seller, setSeller] = useState({ name: '' });
  const [status, setStatus] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { token } = getKey('user');
  const history = useHistory();
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '750px',
    backgroundColor: 'pink',
  };

  const updateSellers = async () => {
    const data = await getSeller();
    setSellers(data);
    setSeller(data.find((s) => s.id === order.sellerId));
  };

  const updateOrder = async () => {
    const { pathname } = history.location;
    const getId = pathname.match(/(\d+)/);
    const { data } = await api
      .get(`sale/${getId[0]}`, { headers: { Authorization: token } });
    setOrder(data);
    console.log(data);
    setStatus(data.status);
  };

  const disabledButtonStatus = () => {
    console.log('status de state', status);
    console.log('status de state', order.status);
    if (status === 'Em Trânsito' || order.status === 'Em Trânsito') {
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    updateSellers();
    updateOrder();
    disabledButtonStatus();
  }, []);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section style={ style }>
        <h3 data-testid={ OrderId }>
          Pedido:
          {' '}
          { order.id }
        </h3>

        <h3 data-testid={ SellerName }>
          P. Vend:
          {' '}
          { seller.name }
        </h3>

        <h3 data-testid={ OrderDate }>
          { console.log(order) }
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
          disabled={ isDisabled }
        >
          MARCAR COMO ENTREGUE
        </button>
      </section>
      <TableOrders />

      <h2>
        Total: R$
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
