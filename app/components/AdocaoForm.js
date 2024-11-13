"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importação do useRouter
import styles from '../styles/AdocaoForm.module.css';

const AdocaoForm = () => {
  const [nomeAdotante, setNomeAdotante] = useState('');
  const [telefoneAdotante, setTelefoneAdotante] = useState('');
  const [emailAdotante, setEmailAdotante] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const router = useRouter(); // Instância do roteador

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeAdotante || !telefoneAdotante || !emailAdotante) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const adocao = { nomeAdotante, telefoneAdotante, emailAdotante, observacoes };

    try {
      const response = await fetch('http://localhost:8080/adocoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adocao),
      });

      if (response.ok) {
        alert('Adoção cadastrada com sucesso!');
        setNomeAdotante('');
        setTelefoneAdotante('');
        setEmailAdotante('');
        setObservacoes('');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar a adoção: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  const handleBack = () => {
    router.back(); // Navega para a página anterior
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}>Cadastro de Adoção</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome do Adotante:</label>
          <input
            type="text"
            className={styles.input}
            value={nomeAdotante}
            onChange={(e) => setNomeAdotante(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Telefone do Adotante:</label>
          <input
            type="tel"
            className={styles.input}
            value={telefoneAdotante}
            onChange={(e) => setTelefoneAdotante(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email do Adotante:</label>
          <input
            type="email"
            className={styles.input}
            value={emailAdotante}
            onChange={(e) => setEmailAdotante(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Observações:</label>
          <textarea
            className={styles.input}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Escreva observações adicionais aqui..."
          />
        </div>

        <button type="submit" className={styles.submitButton}>Cadastrar Adoção</button>
        <button type="button" onClick={handleBack} className={styles.backButton}>Voltar</button>
      </form>
    </div>
  );
};

export default AdocaoForm;
