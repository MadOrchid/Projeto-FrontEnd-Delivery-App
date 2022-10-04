import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';
import '../../styles/pages/orders-client.css';

function OrdersClient() {
  const { orders, setOrders, setOrder, dateConvert } = useContext(ContextGlobal);
  // const [saleData, setSalesData] = useState([]);
  const history = useHistory();
  const style = {
    backgroundColor: 'red',
  }
  useEffect(() => {
    const updateOrders = async () => {
      const { token } = getKey('user');
      const id = getKey('keyUser');
      const { data } = await api
        .get(`sale/user/${id}`, { headers: { Authorization: token } });
      setOrders(data);
    };
    updateOrders();
  }, []);

  return (
    <>
      <HearderProducts />
      <main id="mainOrders">
        { orders.map((sale) => (
          <button
            type="button"
            key={ sale.id }
            onClick={ () => {
              setOrder(sale);
              history.push(`/customer/orders/${sale.id}`);
            } }
          >
            <p>
              Pedido:
              {' '}
              <span data-testid={ `customer_orders__element-order-id-${sale.id}` }>
                { sale.id }
              </span>
            </p>
            <h2
              data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
              style={ (e) => handleStyle(e) }
            >
              {sale.status}
            </h2>
            <div id="orderDatePrice">
              <p
                data-testid={ `customer_orders__element-order-date-${sale.id}` }
              >
                { dateConvert(sale.saleDate) }
              </p>
              <p>
                {' R$ '}
                <span data-testid={ `customer_orders__element-card-price-${sale.id}` }>
                  { sale.totalPrice.toString().replace('.', ',') }
                </span>
              </p>
            </div>
          </button>
        ))}
      </main>
    </>
  );
}

export default OrdersClient;
