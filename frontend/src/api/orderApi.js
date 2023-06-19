import axios from 'axios';

const baseUrl = 'http://158.160.28.222:80/api/orders';

export const fetchOrderKey = async () => {
  const { data } = await axios.get(`${baseUrl}/generate_order_key`);
  return data;
};

export const fetchOrderByKey = async (orderKey) => {
  const res = await axios.get(`${baseUrl}/${orderKey}/pack`);
  return res;
};

export const setOrderStatus = async (orderKey, status) => {
  const res = await axios.patch(`${baseUrl}/${orderKey}/${status}`);
  return res;
};
