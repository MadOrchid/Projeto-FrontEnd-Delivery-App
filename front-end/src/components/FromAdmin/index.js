import React, { useContext, useState, useEffect } from 'react';
import ContextGlobal from '../../context/ContextGlobal';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';
import { emailRagex, minName, minPassword } from '../../services/utilits';

const clearData = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

function FromAdmin() {
  const { updateUsers } = useContext(ContextGlobal);
  const [data, setData] = useState(clearData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  async function handleRegister() {
    const { token } = getKey('user');
    try {
      await api.post('admin', data, { headers: { Authorization: token } });
      setError(false);
      updateUsers();
      setData(clearData);
    } catch (e) {
      setError(true);
      setErrorMessage(e.message);
    }
  }

  const handleChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value,
  });

  useEffect(() => {
    if (data.name.length >= minName && emailRagex.test(data.email)
    && data.password.length >= minPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [data]);

  return (
    <div>
      <h1>Cadastrar novo usuário</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            placeholder="Nome"
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
            value={ data.name }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
            value={ data.email }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            placeholder="Senha"
            data-testid="admin_manage__input-password"
            value={ data.password }
            onChange={ handleChange }
          />
        </label>
        <select
          name="role"
          data-testid="admin_manage__select-role"
          value={ data.role }
          onChange={ handleChange }
        >
          <option value="administrator">Administrador</option>
          <option value="seller">Vendedor</option>
          <option value="customer">Comprador</option>
        </select>
        <button
          disabled={ isDisabled }
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ handleRegister }
        >
          Cadastrar
        </button>
        <div>
          { error && (
            <span
              data-testid="admin_manage__element-invalid-register"
            >
              { errorMessage }
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default FromAdmin;
