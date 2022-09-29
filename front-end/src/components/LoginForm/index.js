import React, { useEffect, useState } from 'react';
import { useHistory /* , useNavigate */ } from 'react-router-dom';
import { api } from '../../services/fetchtRegister';
import { setKey } from '../../services/LocalStorage';
import { emailRagex, minPassword } from '../../services/utilits';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  // const [user, setUser] = useState(null);
  const history = useHistory();
  // const navigate = useNavigate();

  const rota = {
    administrator: 'admin/manage',
    customer: 'customer/products',
    seller: 'seller/orders',
  };

  async function handleLogin() {
    const { data } = await api.post('login', {
      email,
      password,
    })
      .catch(() => {
        setError(true);
        setErrorMessage(true);
      });
    const { id, ...Obj } = data;
    console.log('SOCORROOOOOOOOOOOOOOOO', data);
    setKey('user', Obj);
    setKey('keyUser', id);
    history.push(`/${rota[data.role]}`);
  }

  function handleClickRegister() {
    history.push('/register');
  }

  useEffect(() => {
    if (emailRagex.test(email) && password.length >= minPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <section>

      <h1>Login</h1>

      <label htmlFor="email">
        E-mail
        <input
          type="email"
          alt="E-mail"
          id="email"
          value={ email }
          data-testid="common_login__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          alt="Senha"
          id="password"
          value={ password }
          data-testid="common_login__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>

      <button
        type="button"
        alt="Entrar"
        disabled={ isDisabled }
        data-testid="common_login__button-login"
        onClick={ handleLogin }
      >
        Entrar
      </button>

      <button
        type="button"
        alt="Emtrar"
        data-testid="common_login__button-register"
        onClick={ handleClickRegister }
      >
        Ainda não tenho conta
      </button>

      {
        error ? (
          <p
            className="invalid-text"
            data-testid="common_login__element-invalid-email"
          >
            {errorMessage}
          </p>
        ) : null
      }

      <p
        className="invalid-text"
        data-testid="common_login__element-invalid-email"
      >
        {errorMessage}
      </p>
    </section>
  );
}

export default LoginForm;
