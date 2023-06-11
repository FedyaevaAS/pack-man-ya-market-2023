import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<SearchPage />} />
          <Route path="/main" index element={<MainPage />} />
          <Route path="/success" index element={<SuccessPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
