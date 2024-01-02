import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/user/authSlide';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const Store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export default Store;
export const persistor = persistStore(Store);
