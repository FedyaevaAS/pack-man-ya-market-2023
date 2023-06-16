import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk('order/fetchOrderStatus');

const initialState = {
  order: [
    {
      image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
      text: 'Умная колонка Яндекс Станция Лайт, ультрафиолет',
      tag: ['Упаковать отдельно в NONPACK'],
      counter: 3,
      number: '1234 5678 234 32'
    },
    {
      image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
      text: 'Тарелка. Императорский фарфоровый завод. Форма "Стандартная - 2", рисунок "Скарлетт 2". Костяной фарфор . 270 мм.',
      tag: ['Сканировать IMEI', 'Сканировать QR Честный знак'],
      counter: 2,
      number: '1234 5678 234 33'
    },
    {
      image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
      text: 'Набор для рисования, детский художественный набор в чемоданчике, набор юного художника, 48 предметов и раскраска',
      tag: ['Хрупкое'],
      counter: 1,
      number: '1234 5678 234 34'
    }
  ],
  status: 'loading'
};

export const apiSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    }
  },
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.status = 'success';
    },
    [fetchOrder.rejected]: (state) => {
      state.status = 'error';
      state.order = [];
    }
  }
});

export const { setOrder } = apiSlice.actions;

export default apiSlice.reducer;
