import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/user/authSlide';

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default Store;
