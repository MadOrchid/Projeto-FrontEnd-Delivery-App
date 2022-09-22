import axios from 'axios';

const erro = 401;

const api = axios.create({
  baseURL: 'http://localhost:3001',
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === erro) {
      return Promise.reject(error);
    }
  },
);

export const register = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default { api };
