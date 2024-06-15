import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Ring = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover i {
    border: 6px solid var(--clr);
    filter: drop-shadow(0 0 20px var(--clr));
  }

  i {
    position: absolute;
    inset: 0;
    border: 2px solid #fff;
    transition: 0.5s;

    &:nth-child(1) {
      border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
      animation: animate 6s linear infinite;
    }

    &:nth-child(2) {
      border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
      animation: animate 4s linear infinite;
    }

    &:nth-child(3) {
      border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
      animation: animate2 10s linear infinite;
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate2 {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const Register = styled.div`
  position: absolute;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 2em;
    color: #fff;
  }

  .inputBx {
    position: relative;
    width: 100%;
    
    input {
      position: relative;
      width: 100%;
      padding: 12px 20px;
      background: transparent;
      border: 2px solid #fff;
      border-radius: 40px;
      font-size: 1.2em;
      color: #fff;
      box-shadow: none;
      outline: none;

      &[type="submit"] {
        background: #0078ff;
        background: linear-gradient(45deg, #fa65ff, #36effc);
        border: none;
        cursor: pointer;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  .links {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    a {
      color: #fff;
      text-decoration: none;
    }
  }
`;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });

      if (response.data.message === 'Cadastro bem-sucedido!') {
        setSuccess('Usuário registrado com sucesso! Redirecionando para login...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(response.data.message || 'Erro ao registrar usuário');
      }
    } catch (error) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <>
      <Ring>
        <i style={{ '--clr': '#fa65ff' }}></i>
        <i style={{ '--clr': '#8c63ff' }}></i>
        <i style={{ '--clr': '#36effc' }}></i>
        <Register>
          <h2>Cadastro</h2>
          <form onSubmit={handleRegister}>
            <div className="inputBx">
              <input
                type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputBx">
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="inputBx">
                <input type="submit" value="Registrar" />
              </div>
            </form>
            <div className="links">
              <Link to="/">Voltar para Login</Link>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </Register>
        </Ring>
      </>
    );
  };

  export default RegisterPage;