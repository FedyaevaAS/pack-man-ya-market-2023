import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import CanceledPage from './pages/CanceledPage/CanceledPage';
import ChangeWorkDeskPage from './pages/ChangeWorkDeskPage/ChangeWorkDeskPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Efficiency from './components/Efficiency/Efficiency';

import { useAppDispatch } from './Redux/store';
import { fetchOrder } from './Redux/Slices/apiSlice';
import { getLocalStorageOrderId } from './utils/getLocalStorageApiKey';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  const [efficiencyIsOpen, setEfficiencyIsOpen] = useState(false);

  const openEfficiency = () => {
    if (location.pathname === '/') {
      return;
    }

    setEfficiencyIsOpen(true);
  };

  useEffect(() => {
    const orderKey = getLocalStorageOrderId();

    if (orderKey) {
      dispatch(fetchOrder(orderKey)).catch((e) => console.log(e));
    } else {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Header onClick={openEfficiency} />
      <Efficiency isOpen={efficiencyIsOpen} onClose={() => setEfficiencyIsOpen(false)} />

      <Routes>
        <Route path="/" index element={<SearchPage />} />
        <Route path="/main" index element={<MainPage efficiencyIsOpen={efficiencyIsOpen} />} />
        <Route path="/success" index element={<SuccessPage />} />
        <Route path="/canceled-success" index element={<CanceledPage />} />
        <Route path="/new-work-desk" index element={<ChangeWorkDeskPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
