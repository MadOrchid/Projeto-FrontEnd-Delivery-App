import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { getKey } from '../../services/LocalStorage';
// import RoleRedirect from '../../components/RoleRedirect';

function Login() {
  const history = useHistory();

  useEffect(() => {
    if (getKey('user')) {
      history.push('/customer/products');
    }
  }, []);

  return (
    <div>
      <LoginForm />
      {/* <RoleRedirect /> */}
    </div>
  );
}

export default Login;
