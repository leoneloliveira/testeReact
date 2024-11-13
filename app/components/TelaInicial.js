"use client"; 

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/TelaInicial.module.css';

const TelaInicial = () => {
  const router = useRouter();
  const [nomeAbrigo, setNomeAbrigo] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('emailAbrigo'); 
    const nome = localStorage.getItem('nomeAbrigo'); 

    if (nome) {
      setNomeAbrigo(nome); // Pega o nome do localStorage se estiver disponível
    } else if (email) {
      const token = localStorage.getItem('token');
      
      axios.post('http://localhost:8080/abrigos/login', { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setNomeAbrigo(response.data.nome);
        localStorage.setItem('nomeAbrigo', response.data.nome); // Armazena o nome no localStorage
      })
      .catch(error => {
        console.error('Erro ao buscar o nome do abrigo:', error);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.userSection}>
            <Image
              src="/user-icon.png"
              alt="Ícone do abrigo"
              width={40}
              height={40}
              className={styles.userIcon}
            />
            <span className={styles.userName}>Olá, {nomeAbrigo ? nomeAbrigo : 'Usuário desconhecido'}!</span>
          </div>
          <nav className={styles.navLinks}>
            <button onClick={() => router.push('/cadastro_animais')}>Cadastrar Animal</button>
            <button onClick={() => router.push('/cadastro_adocoes')}>Cadastrar Adoção</button>
            <button onClick={() => router.push('/listagem_animais')}>Listar Animais</button>
            <button onClick={() => router.push('/listagem_adocoes')}>Listar Adoções</button>
          </nav>
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Bem-vindo ao Sistema de Adoção</h1>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Sistema de Adoção. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default TelaInicial;
