"use client"; // Para garantir que seja renderizado no lado do cliente

import { useRouter } from 'next/navigation'; 

const Home = () => {
  const router = useRouter();

  const handleGerenciarAdocoes = () => {
    router.push('/cadastro_adocoes'); // Navega para a página de adoções
  };

  const handleGerenciarAnimais = () => {
    router.push('/cadastro_animais'); // Navega para a página de animais
  };

            //listagens

  const handleListagemAdocoes = () => {
    router.push('/listagem_adocoes'); // Navega para a página de adoções
  };


  const handleListagemAnimais = () => {
    router.push('/listagem_animais'); // Navega para a página de animais
  };



  return (
    <div>
      <h1>Painel de Gerenciamento do Abrigo</h1>

      

      <section>
        <h2>Registro Adoções</h2>
        <button onClick={handleGerenciarAdocoes}>Ir para Adoções</button>
      </section>

      <section>
        <h2>Registro Animais</h2>
        <button onClick={handleGerenciarAnimais}>Ir para Animais</button>
      </section>


      
      

      <section>
        <h2>Listagem de Adoções</h2>
        <button onClick={handleListagemAdocoes}>Listagem Adoções</button>
      </section>

      <section>
        <h2>Listagem de Animais</h2>
        <button onClick={handleListagemAnimais}>Listagem Animais</button>
      </section>

      
    </div>
  );
};

export default Home;
