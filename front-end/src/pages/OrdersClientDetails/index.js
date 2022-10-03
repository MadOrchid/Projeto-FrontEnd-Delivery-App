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
  const { pathname } = history.location;
  const [getId] = pathname.match(/(\d+)/);

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '750px',
    backgroundColor: 'pink',
  };

  const disabledButtonStatus = () => {
    if (status === 'Em Trânsito' || order.status === 'Em Trânsito') {
      return setIsDisabled(false);
    }
    setIsDisabled(true);
  };

  useEffect(() => {
    const updateStates = async () => {
      const { data } = await api
        .get(`sale/${getId}`, { headers: { Authorization: token } });
      setOrder(data);
      setStatus(data.status);
      const result = await getSeller();
      setSellers(result);
      setSeller(result.find((s) => s.id === data.sellerId));
    };
    updateStates();
  }, []);

  useEffect(() => disabledButtonStatus(), [status]);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section style={ style }>
        <h3 data-testid={ OrderId }>
          Pedido:
          {' '}
          { order !== undefined && order.id }
        </h3>

        <h3 data-testid={ SellerName }>
          P. Vend:
          {' '}
          { seller.name }
        </h3>

        <h3 data-testid={ OrderDate }>
          { !!order.saleDate && dateConvert(order.saleDate) }
        </h3>

        <h3 data-testid={ Status }>
          Status:
          {' '}
          { status }
        </h3>

        <button
          type="button"
          data-testid={ DeliveryCheck }
          onClick={ () => {
            updateStatus({ token, id: order.id, status: 'Entregue' });
            setStatus('Entregue');
            setIsDisabled(true);
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
          { !!order.totalPrice && order.totalPrice.toString().replace('.', ',') }
        </span>
      </h2>
    </>
  );
}

export default OrdersClientDetails;
