import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/fetchtRegister';
import { emailRagex, minName, minPassword } from '../../services/utilits';
import '../../styles/components/register-form.css';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  async function handleRegister() {
    const { data } = await api.post('user', {
      name,
      email,
      password,
    })
      .catch((e) => {
        setError(true);
        setErrorMessage(e.message);
      });
    localStorage.setItem('user', JSON.stringify(data));
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

  /*
    { isLoading ? <p>Loading...</p> : '' }
  */

  return (
    <section id="containerRegister">
      <label htmlFor="name">
        Nome
        <input
          type="name"
          alt="Nome"
          id="name"
          value={ name }
          data-testid="common_register__input-name"
          onChange={ (e) => setName(e.target.value) }
          placeholder="Seu Nome"
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
          placeholder="email@trybirita.com.br"
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
          placeholder="***********"
        />
      </label>

      <button
        type="button"
        alt="Cadastrar"
        data-testid="common_register__button-register"
        disabled={ isDisabled }
        onClick={ handleRegister }
      >
        Cadastrar
      </button>

      {
        error ? (
          <p
            className="invalid-text"
            data-testid="common_register__element-invalid_register"
          >
            {errorMessage}
          </p>
        ) : null
      }
    </section>
  );
}

export default RegisterForm;
