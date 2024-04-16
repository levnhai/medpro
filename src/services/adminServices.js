import axios from '../axios';

const adminServise = {
  // user docter and admin
  getAllData(Id) {
    return axios.get(`/api/all-data?id=${Id}`);
  },
  editUser(data) {
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

  // province
  getAllCodeData(typeInput) {
    return axios.get(`api/get-all-code-services?type=${typeInput}`);
  },

  // create new clinic
  createNewClinic(data) {
    return axios.post('/api/create-new-hospital', data);
  },

  // schedule
  saveBulkScheduleDocter(data) {
    return axios.post('/api/bulk-create-schedule', data);
  },

  getAllHospital() {
    return axios.get('/api/get-all-hospital');
  },
};

export default adminServise;
