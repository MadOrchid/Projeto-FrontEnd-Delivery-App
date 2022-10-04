import React, { useContext, useEffect, useState } from 'react';
import ContextGlobal from '../../context/ContextGlobal';
import { deleteUser } from '../../services/fetchtRegister';
import { getKey } from '../../services/LocalStorage';

function TableUser() {
  const { users, updateUsers } = useContext(ContextGlobal);
  const [usersTable, setUsersTable] = useState([]);
  const { token } = getKey('user');

  useEffect(() => {
    updateUsers().then(() => setUsersTable(users));
  }, [users]);

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
          { usersTable.length > 0 && usersTable.map((user, index) => (
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
              <td>
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => {
                    deleteUser({ token, id: user.id });
                    updateUsers();
                  } }
                >
                  Excluir
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;
