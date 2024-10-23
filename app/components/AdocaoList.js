// app/components/AdocaoList.js
"use client"; // Certifique-se de que este arquivo é um componente cliente

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter do App Router

const AdocaoList = () => {
  const [adocoes, setAdocoes] = useState([]);
  const router = useRouter(); // Correto para o App Router

  useEffect(() => {
    const fetchAdocoes = async () => {
      try {
        // Obtenha o token de autenticação armazenado (exemplo localStorage)
        const token = localStorage.getItem('authToken'); // Supondo que o token esteja armazenado aqui

        const response = await fetch('http://localhost:8080/adocoes', {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAdocoes(data); // Recebe as adoções do abrigo logado
        } else {
          console.error('Erro ao buscar adoções');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchAdocoes();
  }, []);

  // Função para editar
  const handleEdit = (id) => {
    router.push(`/editar-adocao/${id}`); // Faz o redirecionamento para a página de edição
  };

  // Função para excluir (exemplo)
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Pega o token de novo
      const response = await fetch(`http://localhost:8080/adocoes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token na exclusão também
        },
      });
      if (response.ok) {
        // Atualiza a lista de adoções após excluir
        setAdocoes(adocoes.filter(adocao => adocao.id !== id));
      } else {
        console.error('Erro ao excluir adoção');
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Adoções</h2>
      {adocoes.length === 0 ? (
        <p>Nenhuma adoção encontrada.</p>
      ) : (
        <ul>
          {adocoes.map((adocao) => (
            <li key={adocao.id}>
              <strong>Adotante:</strong> {adocao.nomeAdotante}<br />
              <strong>Telefone:</strong> {adocao.telefoneAdotante}<br />
              <button onClick={() => handleEdit(adocao.id)}>Editar</button>
              <button onClick={() => handleDelete(adocao.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdocaoList;
