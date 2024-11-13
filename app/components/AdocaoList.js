"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/AdocaoList.module.css'; // Importa o arquivo CSS

const AdocaoList = () => {
  const [adocoes, setAdocoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdocoes = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:8080/adocoes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAdocoes(data);
        } else {
          console.error('Erro ao buscar adoções');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchAdocoes();
  }, []);

  const handleEdit = (id) => {
    router.push(`/editar-adocao/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/adocoes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setAdocoes(adocoes.filter(adocao => adocao.id !== id));
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao excluir adoção:', errorMessage);
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Lista de Adoções</h2>
      <button onClick={() => router.back()} className={styles['back-button']}>
        Voltar
      </button>
      {adocoes.length === 0 ? (
        <p className={styles['no-data-message']}>Nenhuma adoção encontrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome do Adotante</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {adocoes.map((adocao) => (
              <tr key={adocao.id}>
                <td>{adocao.nomeAdotante}</td>
                <td>{adocao.telefoneAdotante}</td>
                <td>{adocao.emailAdotante}</td>
                <td>{adocao.observacoes || 'Nenhuma'}</td>
                <td className={styles.actions}>
                  <button className={styles.button} onClick={() => handleEdit(adocao.id)}>Editar</button>
                  <button className={styles.button} onClick={() => handleDelete(adocao.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdocaoList;
