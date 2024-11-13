"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/AnimaisList.module.css'; // Importando o CSS modular

const AnimaisList = () => {
  const [animais, setAnimais] = useState([]);
  const router = useRouter();

  const fetchAnimais = async () => {
    try {
      const response = await fetch('http://localhost:8080/animais');
      const data = await response.json();
      setAnimais(data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/animais/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Atualiza a lista removendo o animal excluído
        setAnimais((prevAnimais) => prevAnimais.filter((animal) => animal.id !== id));
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao excluir animal:', errorMessage);
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
    }
  };

  useEffect(() => {
    fetchAnimais();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>Lista de Animais</h2>
      <button onClick={() => router.back()} className={styles['back-button']}>
        Voltar
      </button>
      {animais.length === 0 ? (
        <p className={styles['no-data-message']}>Nenhum animal encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Idade</th>
              <th>Tamanho</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {animais.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.nome}</td>
                <td>{animal.especie}</td>
                <td>{animal.idade} anos</td>
                <td>{animal.tamanho}</td>
                <td className={styles.actions}>
                  <button className={styles.button} onClick={() => router.push(`/editar-animal/${animal.id}`)}>Editar</button>
                  <button className={styles.button} onClick={() => handleDelete(animal.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnimaisList;
