import axios from '../axios';

const userServise = {
  // user docter and admin
  getAllData(Id) {
    return axios.get(`/get-all-data?id=${Id}`);
  },
  editUser(data) {
    return axios.put('/edit-user', data);
  },
  deleteUser(userId) {
    return axios.delete('/delete-user', {
      data: {
        id: userId,
      },
    });
  },

  handleCreateUser(data) {
    return axios.post('/create-account', data);
  },

  handleCheckPhone(phoneNumber) {
    return axios.post('/check-phone', { phoneNumber });
  },
  handleRandomOtp() {
    return axios.post('/send-otp');
  },
  handleLogin(phoneNumber, password) {
    return axios.post('/login', { phoneNumber, password });
  },
};

export default userServise;
