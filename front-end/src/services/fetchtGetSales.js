import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function fetchtGetSales() {
  const { data } = await api.get('/user/sellers');
  return data;
}

export default fetchtGetSales;
