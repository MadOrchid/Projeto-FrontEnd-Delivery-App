import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function fetchtGetOrderDetails(id, token) {
  const { data } = await api
    .get(`sale/${id}`, { headers: { Authorization: token } });
  return data;
}

export default fetchtGetOrderDetails;
