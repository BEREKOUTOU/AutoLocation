import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().email('L\'adresse email est invalide').required('L\'adresse email est requise'),
  phoneNumber: yup.string().required('Le numéro de téléphone est requis'),
  password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('La confirmation du mot de passe est requise'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white rounded shadow m-10">
      <h1 className="text-3xl font-bold mb-4">Créer un compte</h1>
      <h1 className="text-3xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block">Prénom</label>
          <input type="text" {...register('firstName')} className="border border-gray-400 p-2 w-full" />
          {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block">Nom</label>
          <input type="text" {...register('lastName')} className="border border-gray-400 p-2 w-full" />
          {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Adresse email</label>
          <input type="email" {...register('email')} className="border border-gray-400 p-2 w-full" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block">Numéro de téléphone</label>
          <input type="text" {...register('phoneNumber')} className="border border-gray-400 p-2 w-full" />
          {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">Mot de passe</label>
          <input type="password" {...register('password')} className="border border-gray-400 p-2 w-full" />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block">Confirmation du mot de passe</label>
          <input type="password" {...register('confirmPassword')} className="border border-gray-400 p-2 w-full" />
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">S\'inscrire</button>
        {message && <p className="text-red-600">{message}</p>}
      </form>
      <p className="mt-4">Déjà un compte? <Link to="/login" className="text-blue-500 hover:text-blue-700">Se connecter</Link></p>
    </div>
  );
};

export default RegisterPage;
