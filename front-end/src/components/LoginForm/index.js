import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { emailRagex, minPassword } from '../../services/utilits';
import api from '../../services/fetchtRegister';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  async function handleLogin() {
    await api.post('login', {
      email,
      password,
    })
      .catch(() => {
        setError(true);
        setErrorMessage(true);
      });
  }

  function handleClickRegister() {
    history.push('/register');
  }

  /*   function handleClickProducts() {
    history.push('/products');
  } */

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
