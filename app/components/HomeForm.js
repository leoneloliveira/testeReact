"use client"; // Para garantir que seja renderizado no lado do cliente

import { useRouter } from 'next/navigation'; 
import styles from '../styles/Home.module.css'; // Folha de estilo separada

const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); // Navega para a página de login
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <h1>Bem-vindo ao Abrigo de Animais</h1>
        <p>Aqui você pode gerenciar animais, adoções e muito mais!</p>
        <button onClick={handleLogin} className={styles.loginButton}>Login do Abrigo</button>
      </header>

      {/* Seção de cards com informações */}
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
          <p>Saiba mais sobre nossa missão e como você pode ajudar.</p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <h3>Contato</h3>
            <p>Telefone: (11) 1234-5678</p>
            <p>Email: contato@abrigoanimais.com</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>Links Úteis</h3>
            <ul>
              <li><a href="/sobre">Sobre Nós</a></li>
              <li><a href="/adocoes">Adoções</a></li>
              <li><a href="/animais">Animais Disponíveis</a></li>
              <li><a href="/contato">Entre em Contato</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Siga-nos</h3>
            <ul className={styles.socialLinks}>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2024 Abrigo de Animais. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
