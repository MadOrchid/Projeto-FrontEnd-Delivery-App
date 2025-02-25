import React, { useContext } from 'react';
import ContextGlobal from '../../context/ContextGlobal';

function TableSaller() {
  const ItemNumber = 'seller_order_details__element-order-table-item-number';
  const TableName = 'seller_order_details__element-order-table-name';
  const TableQuantity = 'seller_order_details__element-order-table-quantity';
  const UnitPrice = 'seller_order_details__element-order-table-unit-price';
  const SubTotal = 'seller_order_details__element-order-table-sub-total';
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
        { !!products && products.map((ord, index) => (
          <tr key={ index }>
            <td
              data-testid={ `${ItemNumber}-${index}` }
            >
              { index + 1 }
            </td>
            <td
              data-testid={ `${TableName}-${index}` }
            >
              {ord.name}
            </td>
            <td
              data-testid={ `${TableQuantity}-${index}` }
            >
              { ord.SalesProducts.quantity }
            </td>
            <td
              data-testid={ `${UnitPrice}-${index}` }
            >
              { ord.price.toString().replace('.', ',') }
            </td>
            <td
              data-testid={ `${SubTotal}-${index}` }
            >
              {
                `R$ ${(ord.SalesProducts.quantity * ord.price)
                  .toFixed(2).toString().replace('.', ',')}`
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSaller;
