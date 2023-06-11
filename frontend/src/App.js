import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
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
        <Route path="/main" index element={<MainPage />} />
        <Route path="/success" index element={<SuccessPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
