// pages/adocoes.js
import AdocaoForm from '../components/AdocaoForm';
import AdocoesList from '../components/AdocoesList';

const AdocoesPage = () => {
  return (
    <div>
      <h1>Registro de Adoções</h1>
      <AdocaoForm />
      <AdocoesList />
    </div>
  );
};

export default AdocoesPage;
