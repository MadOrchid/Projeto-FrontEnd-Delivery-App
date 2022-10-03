import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersSeller() {
  const { orders, setOrders, setOrder, dateConvert } = useContext(ContextGlobal);
  const id = getKey('keyUser');
  const { token } = getKey('user');
  const history = useHistory();

  useEffect(() => {
    const updateOrder = async () => {
      const { data } = await api
        .get(`sale/user/${id}`, { headers: { Authorization: token } });
      setOrders(data);
    };
    updateOrder();
  }, []);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section>
        { orders.map((order) => (
          <button
            type="button"
            key={ order.id }
            onClick={ () => {
              setOrder(order);
              history.push(`/seller/orders/${order.id}`);
            } }
          >
            <h3>
              Pedido:
              {' '}
              <span
                data-testid={ `seller_orders__element-order-id-${order.id}` }
              >
                { order.id }
              </span>
            </h3>

            <h3
              data-testid={ `seller_orders__element-order-date-${order.id}` }
            >
              { dateConvert(order.saleDate) }
            </h3>

            <h3
              data-testid={ `seller_orders__element-delivery-status-${id}` }
            >
              { order.status }
            </h3>
            <p>
              {' R$ '}
              <span data-testid={ `seller_orders__element-card-price-${order.id}` }>
                { order.totalPrice }
              </span>
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${order.id}` }
            >
              Endereço:
              { order.deliveryAddress }
              ,
              {order.deliveryNumber}
            </p>
          </button>
        ))}
      </section>
    </>
  );
}

export default OrdersSeller;

/*

*/
