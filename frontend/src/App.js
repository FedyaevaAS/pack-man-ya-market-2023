import { Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Efficiency from './components/Efficiency/Efficiency';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<SearchPage />} />
        <Route path="/main" index element={<MainPage />} />
        <Route path="/success" index element={<SuccessPage />} />
        {/*           <Route path="/success" index element={<Efficiency />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
