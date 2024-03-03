import axios from '../axios';
// const axios = require('axios');

const adminServise = {
  // user
  getAllUsers(userId) {
    return axios.get(`/api/all-user?id=${userId}`);
  },
  deleteUser(userId) {
    return axios.delete('/api/delete-user', {
      data: {
        id: userId,
      },
    });
  },
  editUser(data) {
    console.log('data', data);
    return axios.put('/api/edit-user', data);
  },

  // Docter
  createDocter(data) {
    return axios.post('/api/create-docter', data);
  },

  getAllDocters(docterId) {
    return axios.get(`/api/all-docter?id=${docterId}`);
  },

  EditDocter(data) {
    console.log(data);
    return axios.put('/api/edit-docter', data);
  },
  deleteDocter(docterId) {
    return axios.delete('/api/delete-docter', {
      data: {
        id: docterId,
      },
    });
  },
};

export default adminServise;
