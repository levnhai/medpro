import axios from '../axios';
// const axios = require('axios');

const userServise = {
  handleCheckPhone(phone) {
    return axios.post('/check-phone', { phone });
  },
  handleRandomOtp() {
    return axios.post('/send-otp');
  },
};

export default userServise;
