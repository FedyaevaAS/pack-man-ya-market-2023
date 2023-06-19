export const getLocalStorageOrderId = () => {
  const data = localStorage.getItem('orderKey');
  const orderKey = data ? JSON.parse(data) : '';
  return orderKey;
};
