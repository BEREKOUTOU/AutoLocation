import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('L\'adresse email est invalide').required('L\'adresse email est requise'),
  password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
});

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Connexion réussie');
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
        navigate('/dashboard');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        console.error('Erreur de connexion:', errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block">Adresse email</label>
          <input type="email" {...register('email')} className="border border-gray-400 p-2 w-full" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">Mot de passe</label>
          <input type="password" {...register('password')} className="border border-gray-400 p-2 w-full" />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Connexion</button>
        <p className="mt-4">
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
