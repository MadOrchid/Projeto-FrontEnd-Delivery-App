import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import '../../styles/pages/register.css';

function Register() {
  return (
    <div id="formRegister">
      <div id="headerRegister">
        <h1>Cadastrar</h1>
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;
