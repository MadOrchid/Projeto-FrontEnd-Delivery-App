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

const saveSale = async (token, obj) => {
  console.log(obj);
  const data = await api.post('sale', obj, { headers: { Authorization: token } })
    .then((response) => {
      console.log('responseeeeee', response);
      return response.data.id;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

async function getSeller() {
  const { data } = await api.get('/user/sellers');
  return data;
}

export { api, createSession, saveSale, getSeller };
