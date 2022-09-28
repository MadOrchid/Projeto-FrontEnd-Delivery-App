import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersClient() {
  const { orders, setOrders } = useContext(ContextGlobal);
  // const [saleData, setSalesData] = useState([]);
  const date = new Date();

  const history = useHistory();

  useEffect(() => {
    const updateOrders = async () => {
      const { token } = getKey('user');
      const { data } = await api
        .get('sale/user/3', { headers: { Authorization: token } });
      console.log(data);
      setOrders(data);
    };
    updateOrders();
  }, []);

  return (
    <>
      <HearderProducts />
      <div>
        { orders.map((sale) => (

          <button
            type="button"
            key={ sale.id }
            data-testid={ `customer_orderselement-order-id-${sale.id}` }
            onClick={ () => history.push('/customer/orders/10') }
          >
            <h3
              data-testid="customer_orderselement-delivery-status"
            >
              Pedido
            </h3>
            <p
              data-testid=" customer_orderselement-order-date-"
            >
              {new Intl.DateTimeFormat('pt-BR').format(date)}
            </p>
            <p
              data-testid="customer_orderselement-card-price"
            >
              Total:
              {' '}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}

export default OrdersClient;
