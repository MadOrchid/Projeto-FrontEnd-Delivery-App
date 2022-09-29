import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersClient() {
  const { orders, setOrders } = useContext(ContextGlobal);
  // const [saleData, setSalesData] = useState([]);
  const newData = new Date();
  const history = useHistory();

  useEffect(() => {
    const updateOrders = async () => {
      const { token } = getKey('user');
      const id = getKey('keyUser');
      const { data } = await api
        .get(`sale/user/${id}`, { headers: { Authorization: token } });
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
            onClick={ () => history.push(`/customer/orders/${sale.id}`) }
          >
            <p data-testid={ `customer_orderselement-order-id-${sale.id}` }>
              Pedido
              {sale.id}
            </p>
            <h2
              data-testid={ `customer_orderselement-delivery-status-${sale.id}` }
            >
              {sale.status}
            </h2>
            <p
              data-testid={ ` customer_orderselement-order-date-${sale.id}` }
            >
              {new Intl.DateTimeFormat('pt-BR').format(newData)}
            </p>
            <p
              data-testid={ `customer_orderselement-card-price-${sale.id}` }
            >
              Total:
              {' '}
              {sale.totalPrice}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}

export default OrdersClient;
