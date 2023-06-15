import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import CanceledSuccessPage from './pages/CanceledSuccessPage/CanceledSuccessPage';
import ChangeWorkDeskPage from './pages/ChangeWorkDeskPage/ChangeWorkDeskPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Efficiency from './components/Efficiency/Efficiency';

const App = () => {
  const location = useLocation();
  const [efficiencyIsOpen, setEfficiencyIsOpen] = useState(false);

  const openEfficiency = () => {
    if (location.pathname === '/') {
      return;
    }

    setEfficiencyIsOpen(true);
  };

  return (
    <>
      <Header onClick={openEfficiency} />
      <Efficiency isOpen={efficiencyIsOpen} onClose={() => setEfficiencyIsOpen(false)} />

      <Routes>
        <Route path="/" index element={<SearchPage />} />
        <Route path="/main" index element={<MainPage efficiencyIsOpen={efficiencyIsOpen} />} />
        <Route path="/success" index element={<SuccessPage />} />
        <Route path="/canceled-success" index element={<CanceledSuccessPage />} />
        <Route path="/new-work-desk" index element={<ChangeWorkDeskPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;