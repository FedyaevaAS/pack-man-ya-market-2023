import Nda from './components/Nda/Nda';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>Ищем новые задания</div>
      <Nda />
    </>
  );
};

export default App;
