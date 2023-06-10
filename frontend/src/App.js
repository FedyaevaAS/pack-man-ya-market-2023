import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
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
          <Route index element={<MainPage />} />
        </Routes>
        <Footer openPopup={setIsOpen} isCalculatorOpen={isOpen} />
        {isOpen && <Calculator onClose={handleClose} />}
      </Router>
    </>
  );
};

export default App;
