import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from '../../Redux/store';
import { fetchOrderKey } from '../../api/orderApi';
import { fetchOrder } from '../../Redux/Slices/apiSlice';
import { getLocalStorageOrderId } from '../../utils/getLocalStorageApiKey';

const SearchPage = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const orderKey = getLocalStorageOrderId();

    if (orderKey) {
      navigate('/main');
      return;
    }

    fetchOrderKey()
      .then((res) => res.order_number)
      .then((orderKey) => dispatch(fetchOrder(orderKey)))
      .then(() => navigate('/main'))
      .catch((e) => console.log(e));
  }, []);

  return <LoadingScreen />;
};

export default SearchPage;
