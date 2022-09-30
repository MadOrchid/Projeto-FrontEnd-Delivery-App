import React, { useContext } from 'react';
import ContextGlobal from '../../context/ContextGlobal';

function TableOrders() {
  const { order } = useContext(ContextGlobal);
  const { products } = order;

  const ItemNumber = 'customer_order_details__element-order-table-item-number';
  const TableName = 'customer_order_details__element-order-table-name';
  const UnitPrice = 'customer_order_details__element-order-table-unit-price';
  const SubTotal = 'customer_order_details__element-order-table-sub-total';
  const TableQuantity = 'customer_order_details__element-order-table-quantity';

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
                `${ItemNumber}-${index}`
              }
            >
              { index + 1 }
            </td>
            <td
              data-testid={
                `${TableName}-${index}`
              }
            >
              {ord.name}
            </td>
            <td
              data-testid={
                `${TableQuantity}-${index}`
              }
            >
              { ord.SalesProducts.quantity }
            </td>
            <td
              data-testid={
                `${UnitPrice}-${index}`
              }
            >
              { ord.price }
            </td>
            <td
              data-testid={
                `${SubTotal}-${index}`
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
