import axios from '../axios';
// const axios = require('axios');

const adminServise = {
  // user docter and admin
  getAllData(Id) {
    return axios.get(`/api/all-data?id=${Id}`);
  },
  editUser(data) {
    console.log('data', data);
    return axios.put('/api/edit-user', data);
  },
  deleteUser(userId) {
    return axios.delete('/api/delete-user', {
      data: {
        id: userId,
      },
    });
  },

  // province
  getAllProvince() {
    return axios.get('/api/get-all-province');
  },

  // create new clinic
  createNewClinic(data) {
    console.log('data', data);
    return axios.post('/api/create-new-hospital', data);
  },
};

export default adminServise;
