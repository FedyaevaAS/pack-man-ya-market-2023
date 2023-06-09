import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Nda from './components/Nda/Nda';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Calculator from './components/Calculator/Calculator';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
        </Routes>
        <Footer />
        <Nda />
      </BrowserRouter>
    </>
  );
};

export default App;
