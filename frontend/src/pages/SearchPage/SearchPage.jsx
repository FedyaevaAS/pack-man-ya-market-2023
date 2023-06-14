import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const SearchPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const routeByTime = setTimeout(() => navigate('/main'), 5000);

    return () => clearTimeout(routeByTime);
  }, []);

  return <LoadingScreen />;
};

export default SearchPage;
