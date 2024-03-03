import axios from '../axios';
// const axios = require('axios');

const userServise = {
  handleCheckPhone(phoneNumber) {
    console.log('phoneNumber', phoneNumber);
    return axios.post('/check-phone', phoneNumber);
  },
  handleRandomOtp() {
    return axios.post('/send-otp');
  },
  handleLogin(phoneNumber, password) {
    return axios.post('/login', { phoneNumber, password });
  },
  handleCreateUser(data) {
    console.log('createUser', data);
    return axios.post('/create-account', data);
  },
};

export default userServise;
