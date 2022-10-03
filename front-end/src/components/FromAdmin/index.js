import React, { useState } from 'react';
import { api } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function FromAdmin() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  async function handleRegister() {
    const { token } = getKey('user');
    try {
      await api.post('admin', data, { headers: { Authorization: token } });
      setError(false);
    } catch (e) {
      setError(true);
      setErrorMessage(e.message);
    }
  }

  const handleChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value,
  });

  return (
    <div>
      <h1>Cadastrar novo usuário</h1>
      <from>
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
            placeHolder="Email"
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
            placeHolder="Senha"
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
          <option value="seller">Vendendor</option>
          <option value="costumer">Comprador</option>
        </select>
        <button
          type="submit"
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
      </from>
    </div>
  );
}

export default FromAdmin;
