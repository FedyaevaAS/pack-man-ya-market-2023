import './nda.scss';

const Nda = ({ forCalculator }) => {
  return (
    <section className={`nda ${forCalculator ? 'nda_static' : null}`}>
      <div>
        <p>Коммерческая тайна ООО «Яндекс», 119021, Россия, г. Москва, ул. Льва Толстого, д. 16</p>
        <p>2022.11.1 / 2023.1.68</p>
      </div>
      <p>© 2003–2023 ООО «Яндекс»</p>
    </section>
  );
};

export default Nda;
