import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { getKey } from '../../services/LocalStorage';
import '../../styles/pages/login.css';
import LogoMini from '../../images/LogoMini.png';
// import RoleRedirect from '../../components/RoleRedirect';

function Login() {
  const history = useHistory();

  useEffect(() => {
    if (getKey('user')) {
      history.push('/customer/products');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="formLogin">
      <div id="headerLogin">
        <h1>Trybirita</h1>
        <img alt="imagem logo" src={ LogoMini } />
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
