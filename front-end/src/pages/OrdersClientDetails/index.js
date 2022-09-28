import React from 'react';
import HearderProducts from '../../components/HeaderProducts';
import TableOrders from '../../components/TableOrders';

function OrdersClientDetails() {
  return (
    <>
      <HearderProducts />
      <h1>Detalhes do Pedido</h1>
      <section>
        <h1>Pedido</h1>
      </section>

      <TableOrders />
    </>
  );
}

export default OrdersClientDetails;
