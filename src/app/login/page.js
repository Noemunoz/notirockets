"use client";

import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (error) {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans">
      <div className="bg-[#16161a] p-8 md:p-10 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Acceso <span className="text-lime-500">Restringido</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Ingresa tus credenciales de redactor</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm font-semibold tracking-wider p-3 rounded mb-6 text-center uppercase">
            {error}
          </div>
        )}

        {}
        <form onSubmit={manejarLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-[#0a0a0c] border border-gray-700 text-white p-3 rounded focus:border-lime-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-[#0a0a0c] border border-gray-700 text-white p-3 rounded focus:border-lime-500 outline-none transition-colors"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-lime-500 hover:bg-lime-400 text-black font-black uppercase tracking-widest py-4 rounded transition-all mt-4 shadow-lg shadow-lime-500/20 cursor-pointer"
          >
            Entrar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}