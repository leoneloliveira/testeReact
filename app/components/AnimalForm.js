// components/AnimalForm.js
"use client"; // Garante que este componente seja renderizado no lado do cliente

import { useState } from 'react';

const AnimalForm = () => {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [idAbrigo, setIdAbrigo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const animal = { nome, especie, idade, tamanho, idAbrigo };

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
        setIdAbrigo('');
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar o animal: ${errorData.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Espécie:</label>
        <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} required />
      </div>
      <div>
        <label>Idade:</label>
        <input type="text" value={idade} onChange={(e) => setIdade(e.target.value)} required />
      </div>
      <div>
        <label>Tamanho:</label>
        <input type="text" value={tamanho} onChange={(e) => setTamanho(e.target.value)} required />
      </div>
      <div>
        <label>ID do Abrigo:</label>
        <input type="text" value={idAbrigo} onChange={(e) => setIdAbrigo(e.target.value)} required />
      </div>
      <button type="submit">Cadastrar Animal</button>
    </form>
  );
};

export default AnimalForm;
