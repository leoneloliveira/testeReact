"use client"; // Para garantir que seja renderizado no lado do cliente

import { useRouter } from 'next/navigation'; 
import styles from '../styles/Home.module.css'; // Vamos criar uma folha de estilo separada

const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); // Navega para a página de login
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bem-vindo ao Abrigo de Animais</h1>
        <p>Aqui você pode gerenciar animais, adoções e mais!</p>
        <button onClick={handleLogin} className={styles.loginButton}>Login do Abrigo</button>
      </header>

      <section className={styles.cardsContainer}>
        <div className={styles.card}>
          <h2>Adoções</h2>
          <p>Gerencie e veja o status das adoções de seus animais.</p>
        </div>

        <div className={styles.card}>
          <h2>Animais</h2>
          <p>Registre e acompanhe os animais disponíveis no abrigo.</p>
        </div>

        <div className={styles.card}>
          <h2>Nosso Abrigo</h2>
          <p>Saiba mais sobre nossa missão e como ajudar os animais.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
