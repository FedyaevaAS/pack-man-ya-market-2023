import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrderByKey } from '../../api/orderApi';

export const fetchOrder = createAsyncThunk('order/fetchOrderStatus', async (params) => {
  const orderKey = params;
  const { data } = await fetchOrderByKey(orderKey);
  localStorage.setItem('orderKey', '11212' /* data.order_number */);
  return data;
});

const initialState = {
  order: [],
  orderKey: '',
  status: 'loading',
  errorMessage: ''
};

export const apiSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderKey(state, action) {
      state.orderKey = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.orderKey = action.payload.order_number;
      state.status = 'success';
      state.errorMessage = '';
    });

    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.status = 'error';
      state.order = [];
      state.errorMessage = action.error.message;
    });
  }
});

export const { setOrderKey } = apiSlice.actions;

export default apiSlice.reducer;
