import React, { useContext } from 'react';
import ContextGlobal from '../../context/ContextGlobal';

function TableOrders() {
  const { order } = useContext(ContextGlobal);
  const { products } = order;

  return (
    <table style={ { width: '750px' } }>
      <tbody style={ { textAlign: 'center' } }>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </tbody>
      <tbody style={ { textAlign: 'center' } }>
        { products.map((ord, index) => (
          <tr key={ index }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-name-${index}`
              }
            >
              {ord.name}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              { ord.SalesProducts.quantity }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${index}`
              }
            >
              { ord.price }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              {
                (ord.SalesProducts.quantity * ord.price)
                  .toFixed(2).toString().replace('.', ',')
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableOrders;
