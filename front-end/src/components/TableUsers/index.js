import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function TableUser() {
  const [users, setUsers] = useState([]);
  const { token } = getKey('user');
  useEffect(() => {
    const updateUsers = async () => {
      const data = await getUsers(token);
      setUsers(data);
    };
    updateUsers();
  }, []);

  return (
    <div>
      <h2>Lista de usuários</h2>
      <table>
        <tbody style={ { textAlign: 'center' } }>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
          </tr>
        </tbody>
        <tbody>
          { users.length > 0 && users.map((user, index) => (
            <>
              <tr key={ index }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  {user.name}
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  {user.email}
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                  {user.role}
                </td>
              </tr>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => deleteUser({ token, id: user.id }) }
              >
                Excluir
              </button>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
