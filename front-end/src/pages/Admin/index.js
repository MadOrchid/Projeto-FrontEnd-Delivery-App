import React from 'react';
import HeaderProducts from '../../components/HeaderProducts';
import FromAdmin from '../../components/FromAdmin';
import TableUser from '../../components/TableUsers';

function Admin() {
  return (
    <>
      <HeaderProducts />
      <FromAdmin />
      <TableUser />
    </>
  );
}

export default Admin;
