import React, { useEffect, useState } from 'react';
import { fetchRegister } from '../../services/fetchtRegister';
import { emailRagex, minName, minPassword, created } from '../../services/utilits';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const register = async () => {
    const data = { name, email, password };
    const { status, responseData } = await fetchRegister(data);

    if (status === created) {
      localStorage.setItem('token', responseData.token);
    } else {
      setError(true);
      setErrorMessage(responseData.message);
    }
  };

  useEffect(() => {
    if (name.length >= minName && emailRagex.test(email)
    && password.length >= minPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password]);

  /*
    - 6: common_register__input-name
    - 7: common_register__input-email
    - 8: common_register__input-password
    - 9: common_register__button-register
    - 10: common_register__element-invalid_register [Elemento oculto (Mensagens de erro)]
  { isLoading ? <p>Loading...</p> : '' }
    */

  return (
    <section>
      <h1>Cadastro</h1>

      <label htmlFor="name">
        Nome
        <input
          type="name"
          alt="Nome"
          id="name"
          value={ name }
          data-testid="common_register__input-name"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>

      <label htmlFor="email">
        E-mail
        <input
          type="email"
          alt="E-mail"
          id="email"
          value={ email }
          data-testid="common_register__input-email"
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
          data-testid="common_register__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>

      <button
        type="button"
        alt="Cadastrar"
        data-testid="common_register__button-register"
        disabled={ isDisabled }
        onClick={ register }
      >
        Cadastrar
      </button>

      {
        error ? (
          <div>
            <p
              className="invalid-text"
              data-test-id="common_login__element-invalid-email"
            >
              {errorMessage}
            </p>
          </div>
        ) : null
      }
    </section>
  );
}

export default RegisterForm;
