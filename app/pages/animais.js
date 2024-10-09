// pages/animais.js
import AnimalForm from '../components/AnimalForm';
import AnimaisList from '../components/AnimaisList';

const AnimaisPage = () => {
  return (
    <div>
      <h1>Cadastro de Animais</h1>
      <AnimalForm />
      <AnimaisList />
    </div>
  );
};

export default AnimaisPage;
