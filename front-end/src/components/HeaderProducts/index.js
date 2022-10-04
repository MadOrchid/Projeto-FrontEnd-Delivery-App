import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/components/header.css';

function HearderProducts() {
  const data = JSON.parse(localStorage.getItem('user'));
  const saveNameUser = data.name;
  const history = useHistory();

  const headerUser = () => (
    <>
      <li alt="Produtos">
        <button
          type="button"
          alt="Produtos"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => { history.push('/customer/products'); } }
        >
          PRODUTOS
        </button>
      </li>
      <li alt="Meus Pedidos">
        <button
          type="button"
          alt="MEUS PEDIDOS"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => { history.push('/customer/orders'); } }
        >
          MEUS PEDIDOS
        </button>
      </li>
    </>
  );

  const headerSeller = () => (
    <li alt="Produtos">
      <button
        type="button"
        alt="Produtos"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => { history.push('/seller/orders'); } }
      >
        PEDIDOS
      </button>
    </li>
  );

  return (
    <nav>
      <ul id="headerPedido">
        {
          data.role === 'seller'
            ? headerSeller()
            : headerUser()
        }
      </ul>
      <ul id="headerLogout">
        <li
          data-testid="customer_products__element-navbar-user-full-name"
          alt="Nome do usuario"
        >
          { saveNameUser }
        </li>
        <li alt="Sair customer">
          <button
            type="button"
            alt="Sair customer"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/login');
            } }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default HearderProducts;
