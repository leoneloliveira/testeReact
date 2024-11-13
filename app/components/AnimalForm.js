"use client";

import { useState } from 'react';
import styles from '../styles/AnimalForm.module.css'; // Importando o CSS

const AnimalForm = () => {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [tamanho, setTamanho] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const animal = { nome, especie, idade, tamanho };

    try {
      const response = await fetch('http://localhost:8080/animais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animal),
      });

      if (response.ok) {
        alert('Animal cadastrado com sucesso!');
        setNome('');
        setEspecie('');
        setIdade('');
        setTamanho('');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar o animal: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  const handleGoBack = () => {
    window.history.back(); // Volta para a página anterior
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Cadastro de Animal</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome:</label>
            <input
              type="text"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Espécie:</label>
            <input
              type="text"
              className={styles.input}
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Idade:</label>
            <input
              type="text"
              className={styles.input}
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tamanho:</label>
            <input
              type="text"
              className={styles.input}
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>Cadastrar Animal</button>
        </form>

        <button onClick={handleGoBack} className={styles.backButton}>Voltar</button>
      </div>
    </div>
  );
};

export default AnimalForm;
