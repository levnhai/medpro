import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/user/authSlide';
import { persistStore, persistReducer } from 'redux-persist';
import adminSlice from './admin/adminSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage,
  // blacklist: ['userInfo', 'user', 'topDoctors'],
};

const AdminPersistConfig = {
  key: 'admin',
  storage: storage,
  // blacklist: ['adminInfo'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const adminReducer = persistReducer(AdminPersistConfig, adminSlice);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    admin: adminReducer,
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
