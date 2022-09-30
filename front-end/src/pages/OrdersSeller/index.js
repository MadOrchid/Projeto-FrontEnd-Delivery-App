import React, { useEffect } from 'react';
import HearderProducts from '../../components/HeaderProducts';

function OrdersSeller() {
  useEffect(() => {
    const updateOrder = async () => {
      const { token } = getKey('user');
      const { data } = await api
        .get(`sale/${id}`, { headers: { Authorization: token } });
      setOrders(data);
    };
    updateOrder();
  }, []);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section>
        <h3>
          Pedido:
          {' '}
          <span
            data-testid={ `seller_orders__element-order-id-${id}` }
          >
            { order.id }
          </span>
        </h3>

        <h3
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          {new Intl.DateTimeFormat('pt-BR').format(newData)}
        </h3>

        <h3 data-testid={ Status }>
          { order.status }
        </h3>

        <button
          type="button"
          data-testid={ PreparingCheck }
          onClick={ () => {} }
        >
          PREPARANDO PEDIDO
        </button>

        <button
          type="button"
          data-testid={ DispatchCheck }
          onClick={ () => {} }
        >
          SAIU PARA ENTREGA
        </button>
      </section>

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

export default OrdersSeller;
