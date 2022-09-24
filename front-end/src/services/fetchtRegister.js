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

export { api, createSession };
