const tokenMock = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJkYXRhIjp7Im5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJlbWFpb
CI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJ
pYXQiOjE2NjQzOTM0NDV9.iVh2oJkl1g8brAyivrt-MM8MOqICDXYBOVL3llLOste`;

const userWithToken = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  role: 'customer',
  token: tokenMock,
};

const productsMock = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    qtd: 0,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    qtd: 0,
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    qtd: 0,
  }];

const productsWithQtdMock = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    qtd: 0,
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    qtd: 0,
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
    qtd: 0,
  }];

module.exports = {
  userWithToken,
  productsMock,
  productsWithQtdMock,
};
