import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './Slices/apiSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    apiSlice,
  },
});

export const useAppDispatch = useDispatch;
