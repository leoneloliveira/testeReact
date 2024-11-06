"use client"; // Garante que este componente seja renderizado no lado do cliente

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o hook useRouter para navegação
import styles from '../styles/AbrigoForm.module.css'; // Importa o CSS

const AbrigoForm = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // Novo estado para a senha
  const router = useRouter(); // Inicializa o useRouter para navegação

  // Função para formatar o telefone
  const formatTelefone = (value) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são números

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/(\d{0,2})/, '($1');
    }
    return value;
  };

  const handleTelefoneChange = (e) => {
    setTelefone(formatTelefone(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const abrigo = { nome, endereco, telefone, email, senha }; // Inclui a senha no objeto

    try {
      const response = await fetch('http://localhost:8080/abrigos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(abrigo),
      });

      if (response.ok) {
        alert('Abrigo cadastrado com sucesso!');
        // Redireciona para a página de login após o cadastro bem-sucedido
        router.push('/login'); // Redireciona para a rota de login
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar o abrigo: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Cadastro de Abrigo</h1>
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
          <label className={styles.label}>Endereço:</label>
          <input 
            type="text" 
            className={styles.input} 
            value={endereco} 
            onChange={(e) => setEndereco(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Telefone:</label>
          <input 
            type="tel" 
            className={styles.input} 
            value={telefone} 
            onChange={handleTelefoneChange} 
            required 
            placeholder="(XX) XXXXX-XXXX"
            maxLength="15" // Limita a quantidade de caracteres
          />
        </div>
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
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className={styles.submitButton}>Cadastrar Abrigo</button>
      </form>
    </div>
  );
};

export default AbrigoForm;