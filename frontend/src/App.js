import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Calculator from './components/Calculator/Calculator';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<SearchPage />} />
          <Route path="/main" index element={<MainPage />} />
          <Route path="/success" index element={<SuccessPage />} />
        </Routes>
        <Footer openPopup={setIsOpen} isCalculatorOpen={isOpen} />
        <Calculator isOpen={isOpen} onClose={handleClose} />
      </Router>
    </>
  );
};

export default App;
