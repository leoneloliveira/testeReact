// components/AnimaisList.js
"use client";

import { useEffect, useState } from 'react';

const AnimaisList = () => {
  const [animais, setAnimais] = useState([]);

  const fetchAnimais = async () => {
    try {
      const response = await fetch('http://localhost:8080/animais');
      const data = await response.json();
      setAnimais(data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  useEffect(() => {
    fetchAnimais();
  }, []);

  return (
    <div>
      <h2>Lista de Animais</h2>
      <ul>
        {animais.map((animal) => (
          <li key={animal.id}>
            {animal.nome} - {animal.especie}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimaisList;
