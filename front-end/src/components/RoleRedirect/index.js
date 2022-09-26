import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../../context/Context';

function RoleRedirect() {
  const [redirect, setRedirect] = useState(false);
  const [route, setRoute] = useState('');
  const { role } = useContext(MyContext);

  useEffect(() => {
    if (role === 'customer') {
      setRoute('/customer/products');
      setRedirect(true);
    }
    if (role === 'seller') {
      setRoute('/seller/orders');
      setRedirect(true);
    }
    if (role === 'admin') {
      setRoute('/admin/manage');
      setRedirect(true);
    }
  }, [role]);

  return (
    <>
      <h1>REDIRECT</h1>

      <div>
        {redirect ? (<Redirect to={ route } />) : null }
      </div>
    </>
  );
}

export default RoleRedirect;
