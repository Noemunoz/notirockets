"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function RutaPrivada({ children }) {
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCargando(false);
      } else {
        router.push('/login');
      }
    });

    return () => cancelarSuscripcion();
  }, [router]);

  if (cargando) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center text-lime-500 font-black uppercase tracking-widest text-sm animate-pulse border border-gray-800 bg-[#16161a] p-8 rounded-xl shadow-2xl">
          Verificando credenciales de seguridad...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}