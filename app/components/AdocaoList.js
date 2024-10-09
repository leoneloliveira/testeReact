// components/AdocoesList.js
"use client";

import { useEffect, useState } from 'react';

const AdocoesList = () => {
  const [adocoes, setAdocoes] = useState([]);

  const fetchAdocoes = async () => {
    try {
      const response = await fetch('http://localhost:8080/adocoes');
      const data = await response.json();
      setAdocoes(data);
    } catch (error) {
      console.error('Erro ao buscar adoções:', error);
    }
  };

  useEffect(() => {
    fetchAdocoes();
  }, []);

  return (
    <div>
      <h2>Lista de Adoções</h2>
      <ul>
        {adocoes.map((adocao) => (
          <li key={adocao.id}>
            ID do Animal: {adocao.idAnimal} - ID do Adotante: {adocao.idAdotante}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdocoesList;
