"use client";

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function ListaNotas() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  useEffect(() => {
    const q = collection(db, "noticias");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      docs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setNoticias(docs);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  const borrarNota = async (id) => {
    if (window.confirm("🚨 ¿Estás completamente seguro de borrar esta nota? Esta acción NO se puede deshacer.")) {
      await deleteDoc(doc(db, "noticias", id));
    }
  };

  if (cargando) return <div className="text-white p-20 text-center font-bold tracking-widest uppercase">Cargando base de datos...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 text-white">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl font-black border-l-4 border-lime-500 pl-4 uppercase tracking-tight">
          Administrar Notas
        </h2>
        
        <div className="flex gap-4">
          <button 
            onClick={cerrarSesion}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded transition-all uppercase tracking-widest text-sm cursor-pointer"
          >
            Salir
          </button>

          <Link 
            href="/admin/nueva" 
            className="bg-lime-500 hover:bg-lime-400 text-black font-bold py-3 px-6 rounded shadow-lg shadow-lime-500/20 transition-all uppercase tracking-widest text-sm flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Nueva Nota
          </Link>
        </div>
      </div>

      {}
      {noticias.length === 0 ? (
        <div className="bg-[#16161a] border border-gray-800 rounded-xl p-16 text-center shadow-lg">
          <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">Aún no hay notas publicadas.</p>
          <p className="text-gray-600 text-sm mt-2">Haz clic en "Nueva Nota" para empezar.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {noticias.map(n => (
            <div key={n.id} className="bg-[#16161a] p-4 md:p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-800 hover:border-lime-500/50 transition-colors gap-6 group shadow-lg">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto flex-grow overflow-hidden">
                
                <div className="w-full md:w-32 h-48 md:h-20 bg-gray-900 rounded-lg overflow-hidden shrink-0 relative border border-gray-800">
                  {n.imagen ? (
                    <img src={n.imagen} alt={n.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs font-bold uppercase">Sin Foto</div>
                  )}
                  <span className="md:hidden absolute top-2 left-2 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-md">
                    {n.categoria || 'Nota'}
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="hidden md:inline-block w-max bg-[#222227] text-gray-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-2 border border-gray-700">
                    {n.categoria || 'Sin categoría'}
                  </span>
                  <h3 className="font-bold text-lg md:text-xl leading-tight line-clamp-2 mb-2 group-hover:text-lime-400 transition-colors">
                    {n.titulo}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    <span>{n.fecha || 'Sin fecha'}</span>
                    <span className="text-gray-700">•</span>
                    <span className="text-gray-400">Por {n.autor || 'Redacción'}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto shrink-0 border-t border-gray-800 md:border-t-0 pt-5 md:pt-0 mt-2 md:mt-0">
                <Link 
                  href={`/admin/editar/${n.id}`} 
                  className="flex-1 md:flex-none text-center bg-transparent border border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-black px-5 py-2.5 rounded text-xs font-black transition-all uppercase tracking-wider cursor-pointer"
                >
                  Editar
                </Link>
                {/* El botón de eliminar lo dejamos rojo por seguridad (Danger Action) */}
                <button 
                  onClick={() => borrarNota(n.id)} 
                  className="flex-1 md:flex-none text-center bg-transparent border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded text-xs font-black transition-all uppercase tracking-wider cursor-pointer"
                >
                  Eliminar
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaNotas;