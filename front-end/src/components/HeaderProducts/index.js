import React from 'react';
import { useHistory } from 'react-router-dom';

function HearderProducts() {
  const data = JSON.parse(localStorage.getItem('user'));
  const saveNameUser = data.name;
  const history = useHistory();

  const headerUser = () => (
    <>
      <li>
        <button
          type="button"
          alt="Produtos"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => { history.push('/customer/products'); } }
        >
          PRODUTOS
        </button>
      </li>
      <li>
        <button
          type="button"
          alt="Produtos"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => { history.push('/customer/orders'); } }
        >
          MEUS PEDIDOS
        </button>
      </li>
    </>
  );

  const headerSeller = () => (
    <li>
      <button
        type="button"
        alt="Produtos"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => { history.push('/seller/orders'); } }
      >
        PEDIDOS
      </button>
    </li>
  );

  return (
    <nav style={ { display: 'inline-block' } }>
      <ul>
        {
          data.role === 'seller'
            ? headerSeller()
            : headerUser()
        }
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { saveNameUser }
        </li>
        <li>
          <button
            type="button"
            alt="Produtos"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
            } }
          >
            Sair customer
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default HearderProducts;
