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

async function updateStatus({ token, status, id }) {
  const { data } = await api
    .put(`sale/${id}`, { status }, { headers: { Authorization: token } });
  return data;
}

async function getSeller() {
  const { data } = await api.get('/user/sellers');
  return data;
}

async function getUsers(token) {
  const { data } = await api.get('/admin', { headers: { Authorization: token } });
  return data;
}

async function deleteUser({ token, id }) {
  const { data } = await api
    .delete(`/admin/${id}`, { headers: { Authorization: token } });
  return data;
}

const saveUser = async (token, obj) => {
  console.log(obj);
  const data = await api.post('admin', obj, { headers: { Authorization: token } })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

export {
  api, createSession, saveSale, getSeller, updateStatus, getUsers, saveUser, deleteUser,
};
