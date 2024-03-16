import axios from '../axios';
// const axios = require('axios');

const adminServise = {
  // user
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
};

export default adminServise;
