import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authSlice from '../slices/authentication';
import productsSlice from '../slices/products';
import cartSlice from '../slices/cart';
import ordersSlice from '../slices/order';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'authentication']
};

const reducers = combineReducers({
  authentication: authSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
  order: ordersSlice.reducer
});

const rootReducer = (state, action) => reducers(state, action);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true
});
