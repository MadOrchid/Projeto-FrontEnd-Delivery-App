import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersClient() {
  const { orders, setOrders, setOrder } = useContext(ContextGlobal);
  // const [saleData, setSalesData] = useState([]);
  const history = useHistory();

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

  function dateConvert(date) {
    const TEN = 10;
    const dateUSA = new Date(date.substring(0, TEN));
    return new Intl.DateTimeFormat('pt-BR')
      .format(dateUSA);
  }

  return (
    <>
      <HearderProducts />
      <div>
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
              Pedido
              <span data-testid={ `customer_orderselement-order-id-${sale.id}` }>
                { sale.id }
              </span>
            </p>
            <h2
              data-testid={ `customer_orderselement-delivery-status-${sale.id}` }
            >
              {sale.status}
            </h2>
            <p
              data-testid={ `customer_orderselement-order-date-${sale.id}` }
            >
              { dateConvert(sale.saleDate) }
            </p>
            <p>
              Total:
              {' '}
              R$
              <span data-testid={ `customer_orderselement-card-price-${sale.id}` }>
                { sale.totalPrice }
              </span>
            </p>
          </button>
        ))}
      </div>
    </>
  );
}

export default OrdersClient;
