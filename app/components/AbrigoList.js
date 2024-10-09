// components/AbrigosList.js
"use client";

import { useEffect, useState } from 'react';

const AbrigosList = () => {
  const [abrigos, setAbrigos] = useState([]);

  const fetchAbrigos = async () => {
    try {
      const response = await fetch('http://localhost:8080/abrigos');
      const data = await response.json();
      setAbrigos(data);
    } catch (error) {
      console.error('Erro ao buscar abrigos:', error);
    }
  };

  useEffect(() => {
    fetchAbrigos();
  }, []);

  return (
    <div>
      <h2>Lista de Abrigos</h2>
      <ul>
        {abrigos.map((abrigo) => (
          <li key={abrigo.id}>
            {abrigo.nome} - {abrigo.endereco}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AbrigosList;
