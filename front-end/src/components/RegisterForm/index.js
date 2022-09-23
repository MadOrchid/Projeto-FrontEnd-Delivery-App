import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/fetchtRegister';
import { emailRagex, minName, minPassword } from '../../services/utilits';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  /*
    const register = async () => {
      const data = { name, email, password };
      console.log(data);
      const { status, responseData } = await fetchRegister(data);
      if (status === created) {
        localStorage.setItem('token', responseData.token);
      } else {
        setError(true);
        setErrorMessage(responseData.message);
      }
    };
  */

  async function handleSingIn() {
    const { data } = await api.post('user', {
      name,
      email,
      password,
    })
      .catch(() => {
        setError(true);
        setErrorMessage(true);
      });
    localStorage.setItem('data', JSON.stringify(data));
    history.push('/customer/products');
  }

  useEffect(() => {
    if (name.length >= minName && emailRagex.test(email)
    && password.length >= minPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, password]);

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
        onClick={ handleSingIn }
      >
        Cadastrar
      </button>

      {
        error ? (
          <div>
            <p
              className="invalid-text"
              data-testid="common_register__element-invalid_register"
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
