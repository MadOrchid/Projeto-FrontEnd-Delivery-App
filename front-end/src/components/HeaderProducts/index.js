import React from 'react';

function HearderProducts() {
  // const history = useHistory();

  return (
    <nav>
      <ul>
        <li
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </li>
        <li
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Nome do usuario!!!
        </li>
        <li
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </li>
      </ul>
    </nav>
  );
}

export default HearderProducts;
