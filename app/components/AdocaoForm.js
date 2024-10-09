// app/components/AdocaoForm.js
"use client";

import { useState } from 'react';

const AdocaoForm = () => {

  const [nomeAdotante, setNomeAdotante] = useState('');
  const [telefoneAdotante, setTelefoneAdotante] = useState('');
  const [emailAdotante, setEmailAdotante] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!idAnimal || !nomeAdotante || !telefoneAdotante || !emailAdotante) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    // Dados a serem enviados para a API Spring Boot
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
        // Limpar os campos após o cadastro
        
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

  return (
    <form onSubmit={handleSubmit}>
      
      <div>
        <label>Nome do Adotante:</label>
        <input
          type="text"
          value={nomeAdotante}
          onChange={(e) => setNomeAdotante(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone do Adotante:</label>
        <input
          type="tel"
          value={telefoneAdotante}
          onChange={(e) => setTelefoneAdotante(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email do Adotante:</label>
        <input
          type="email"
          value={emailAdotante}
          onChange={(e) => setEmailAdotante(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Observações:</label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Escreva observações adicionais aqui..."
        />
      </div>
      <button type="submit">Cadastrar Adoção</button>
    </form>
  );
};

export default AdocaoForm;
