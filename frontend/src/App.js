import Nda from './components/Nda/Nda';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>Ищем новые задания</div>
      <Footer />
      <Nda />
    </>
  );
};

export default App;
