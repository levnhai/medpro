import axios from '../axios';

const adminServise = {
  // province
  getAllProvince() {
    return axios.get('/api/get-all-province');
  },

  getAllCodeData(typeInput) {
    return axios.get(`api/get-all-code-services?type=${typeInput}`);
  },

  // create new clinic
  createNewClinic(data) {
    return axios.post('/hospital/create-new-hospital', data);
  },

  // schedule
  saveBulkScheduleDocter(data) {
    return axios.post('/api/bulk-create-schedule', data);
  },
};

export default adminServise;
