import axios from '../axios';
// const axios = require('axios');

const userServise = {
  handleCheckPhone(phoneNumber) {
    return axios.post('/check-phone', { phoneNumber });
  },
  handleRandomOtp() {
    return axios.post('/send-otp');
  },
  handleLogin(phoneNumber, password) {
    return axios.post('/login', { phoneNumber, password });
  },
  handleCreateUser(data) {
    return axios.post('/api/create-account', data);
  },
  handleGetTopDocter(limit) {
    return axios.get(`/api/get-top-docter?limit=${limit}`);
  },
};

export default userServise;
