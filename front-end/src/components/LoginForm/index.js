import React, { useEffect, useState } from 'react';

import { fetchLogin } from '../../services/fetchLogin';
import { emailRagex, minPassword, okCode } from '../../services/utilits';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const login = async () => {
    const data = { email, password };
    const { status, response } = await fetchLogin(data);
    if (status === okCode) {
      localStorage.setItem('token', response.token);
    } else {
      setError(true);
      setErrorMessage(response.message);
    }
  };

  useEffect(() => {
    if (emailRagex.test(email) && password.length >= minPassword) {
      setIsLoading(true);
      setIsDisabled(false);
    } else {
      setIsLoading(false);
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <section>
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
      >
        Entrar
      </button>

      <button
        type="button"
        alt="Emtrar"
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>

      <p
        style={ { display: 'none' } }
        data-testid="common_login__element-invalid-email"
      >
        {errorMessage}
      </p>
    </section>
  );
}

export default LoginForm;
