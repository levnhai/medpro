import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/user/authSlide';
import { persistStore, persistReducer } from 'redux-persist';
import adminSlice from './admin/adminSlice';
import docterSlice from './docter/docterSlice';
import provinceSlice from './province/provinceSlice';
import hospitalSlider from './hospital/hospitalSlider';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['phoneNumber', 'loading', 'error'],
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
};

const AdminPersistConfig = {
  key: 'admin',
  storage: storage,
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
  // blacklist: ['adminInfo'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const adminReducer = persistReducer(AdminPersistConfig, adminSlice);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    admin: adminReducer,
    docter: docterSlice,
    province: provinceSlice,
    hospital: hospitalSlider,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default Store;
export const persistor = persistStore(Store);
