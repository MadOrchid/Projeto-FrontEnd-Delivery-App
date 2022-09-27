import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const createSession = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response;
  } catch (error) {
    return error.response;
  }
};

const saveSale = async (sale, token) => {
  try {
    const { status, data } = await axios
      .post(`${url}/sale`, sale, { headers: { authorization: token } });
    return { status, data };
  } catch ({ response: { status, data } }) {
    return { status, data };
  }
};

export { api, createSession, saveSale };
