import React, { useContext, useEffect, useState } from 'react';
import HearderProducts from '../../components/HeaderProducts';
import TableOrders from '../../components/TableOrders';
import ContextGlobal from '../../context/ContextGlobal';
import { getSeller, updateStatus } from '../../services/fetchtRegister';

function OrdersClientDetails() {
  const { order, setSeller } = useContext(ContextGlobal);
  const [seller, setSellers] = useState({ name: '' });
  const newData = new Date();
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '750px',
    backgroundColor: 'pink',
  };

  const OrderId = 'customer_order_details__element-order-details-label-order-id';
  const SellerName = 'customer_order_details__element-order-details-label-seller-name';
  const OrderDate = 'customer_order_details__element-order-details-label-order-date';
  const Status = 'customer_order_details__element-order-details-label-delivery-status';
  const TotalPrice = 'customer_order_details__element-order-total-price';
  const DeliveryCheck = 'customer_order_details__button-delivery-check';

  useEffect(() => {
    const updateSellers = async () => {
      const data = await getSeller();
      setSeller(data);
      setSellers(data.find((s) => s.id === order.sellerId));
    };
    updateSellers();
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
          {new Intl.DateTimeFormat('pt-BR').format(newData)}
        </h3>

        <h3 data-testid={ `${Status}-${order.id}` }>
          { order.status }
        </h3>

        <button
          type="button"
          data-testid={ DeliveryCheck }
          onClick={ () => updateStatus({ token, id: order.id, status: 'Entregue' }) }
        >
          MARCAR COMO ENTREGUE
        </button>
      </section>
      <TableOrders />

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

export default OrdersClientDetails;
