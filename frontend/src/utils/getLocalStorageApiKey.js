export const getLocalStorageOrderId = () => {
  const data = localStorage.getItem('orderId');
  const orderId = data ? JSON.parse(data) : null;
  return orderId;
};
