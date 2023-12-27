import axios from '../axios';
// const axios = require('axios');

const userServise = {
  handleCheckPhone(phone) {
    return axios.post('/check-phone', { phone });
  },
  handleRandomOtp() {
    return axios.post('/send-otp');
  },
  handleLogin(phoneNumber, password) {
    return axios.post('/login', { phoneNumber, password });
  },
  handleCreateUser(data) {
    return axios.post('/create-account', data);
  },
};

export default userServise;
