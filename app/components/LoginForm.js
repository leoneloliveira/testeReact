"use client"; // Adiciona isso no topo

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios'; 
import styles from '../styles/LoginForm.module.css'; // Importa o CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // Definindo 'senha' corretamente
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/abrigos/login', {
        email,
        senha, // Envia o valor de 'senha' para o backend
      });

      if (response.status === 200) {
        // Armazenando o nome do abrigo no localStorage
        const nomeAbrigo = response.data.nomeAbrigo; // Agora a resposta retorna o nome do abrigo
        localStorage.setItem("nomeAbrigo", nomeAbrigo);

        router.push('/telainicial'); // Redireciona para a página 'home' após o login
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Login do Abrigo</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Senha:</label>
            <input
              type="password"
              className={styles.input}
              value={senha}  // Aqui estamos usando 'senha' como estado
              onChange={(e) => setSenha(e.target.value)} // Atualiza 'senha' ao digitar
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Entrar</button>
        </form>

        <p className={styles.signupText}>
          Ainda não tem um abrigo?{' '}
          <a href="/cadastro_abrigos">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
