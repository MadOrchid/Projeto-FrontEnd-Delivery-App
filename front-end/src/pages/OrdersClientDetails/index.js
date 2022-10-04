import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableOrders from '../../components/TableOrders';
import ContextGlobal from '../../context/ContextGlobal';
import { api, getSeller, updateStatus } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';
import '../../styles/components/table-orders.css';

function OrdersClientDetails() {
  const OrderId = 'customer_order_details__element-order-details-label-order-id';
  const SellerName = 'customer_order_details__element-order-details-label-seller-name';
  const OrderDate = 'customer_order_details__element-order-details-label-order-date';
  const Status = 'customer_order_details__element-order-details-label-delivery-status';
  const DeliveryCheck = 'customer_order_details__button-delivery-check';
  const { order, setOrder, setSellers, dateConvert } = useContext(ContextGlobal);
  const [seller, setSeller] = useState({ name: '' });
  const [status, setStatus] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { token } = getKey('user');
  const history = useHistory();

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
      <div id="father">
        <h1 id="tittleTable">Detalhes do Pedido</h1>
        <main className="table">
          <section>
            <h3 data-testid={ OrderId } id="orderId">
              Pedido:
              {' 000'}
              { order.id }
            </h3>

            <h3 data-testid={ SellerName } id="sellerName">
              P. Vend:
              {' '}
              { seller.name }
            </h3>

            <h3 data-testid={ OrderDate } id="orderDate">
              { dateConvert(order.saleDate) }
            </h3>

            <h3 data-testid={ Status } id="status">
              { status }
            </h3>

            <button
              type="button"
              id="deliveryCheck"
              alt="Entregue"
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
        </main>
      </div>
    </>
  );
}

export default OrdersClientDetails;
