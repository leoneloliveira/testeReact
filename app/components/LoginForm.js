"use client"; // Adiciona isso no topo

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log("Componente LoginForm montado");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/abrigos', {
        email,
        password,
      });

      if (response.status === 200) {
        router.push('/home'); // Redireciona para a página 'home' após o login
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      
      {/* Link para a página de cadastro de abrigos */} 
      <p>
        Ainda não tem um abrigo? 
        <a href="/cadastro_abrigos">
          <button>Cadastre-se aqui</button>
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
