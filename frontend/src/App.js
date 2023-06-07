import Nda from './components/Nda/Nda';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

const App = () => {
  return (
    <>
      <Header />
      <h1 style={{ height: '2000px' }}>Hello world</h1>
      <Footer />
      <Nda />
    </>
  );
};

export default App;
