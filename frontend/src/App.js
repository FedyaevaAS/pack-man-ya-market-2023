import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import Efficiency from './components/Efficiency/Efficiency';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header onClick={onClick} />
      <Efficiency isOpen={isOpen} onClose={onClick} />
      {!isOpen && <h1 style={{ height: '2000px', display: 'block' }}>Hello world</h1>}
      <Footer />
    </>
  );
};

export default App;
