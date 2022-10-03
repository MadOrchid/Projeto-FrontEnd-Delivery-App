import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HearderProducts from '../../components/HeaderProducts';
import TableSaller from '../../components/TableSaller';
import ContextGlobal from '../../context/ContextGlobal';
import { api, updateStatus } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function OrdersSellerDetails() {
  const OrderId = 'seller_order_details__element-order-details-label-order-id';
  const Status = 'seller_order_details__element-order-details-label-delivery-status';
  const OrderDate = 'seller_order_details__element-order-details-label-order-date';
  const PreparingCheck = 'seller_order_details__button-preparing-check';
  const DispatchCheck = 'seller_order_details__button-dispatch-check';
  const TotalPrice = 'seller_order_details__element-order-total-price';

  const { order, setOrder } = useContext(ContextGlobal);
  const [status, setStatus] = useState('Pendente');
  const [disabled, setDisabled] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const { token } = getKey('user');

  const disabledButtonStatus = () => {
    if (status === 'Preparando' || order.status === 'Preparando') {
      return setDisabled(false);
    }
    if (status === 'Pendente' || order.status === 'Pendente') {
      return setIsDisabled(false);
    }
    setDisabled(true);
    setIsDisabled(true);
  };

  useEffect(() => {
    const updateOrder = async () => {
      const { pathname } = history.location;
      const [getId] = pathname.match(/(\d+)/);
      const { data } = await api
        .get(`sale/${getId}`, { headers: { Authorization: token } });
      setOrder(data);
      setStatus(data.status);
    };
    updateOrder();
  }, []);

  useEffect(() => disabledButtonStatus(), [status, order]);

  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section>
        <h3>
          Pedido:
          {' '}
          <span data-testid={ OrderId }>{ !!order.id && order.id }</span>
        </h3>

        <h3 data-testid={ OrderDate }>
          {}
        </h3>

        <h3 data-testid={ Status }>{ status }</h3>

        <button
          type="button"
          disabled={ isDisabled }
          data-testid={ PreparingCheck }
          onClick={ () => {
            updateStatus({ id: order.id, status: 'Preparando', token });
            setStatus('Preparando');
            setIsDisabled(true);
          } }
        >
          PREPARANDO PEDIDO
        </button>

        <button
          type="button"
          data-testid={ DispatchCheck }
          disabled={ disabled }
          onClick={ () => {
            updateStatus({
              id: order.id, status: 'Em Trânsito', token,
            });
            setStatus('Em Trânsito');
            setIsDisabled(true);
          } }
        >
          SAIU PARA ENTREGA
        </button>
      </section>
      <TableSaller />

      <h2>
        Total:
        {' '}
        <span data-testid={ TotalPrice }>
          { !!order.totalPrice && order.totalPrice.toString().replace('.', ',') }
        </span>
      </h2>
    </>
  );
}

export default OrdersSellerDetails;
