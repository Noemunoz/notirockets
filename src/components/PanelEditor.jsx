"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { limpiarHTML } from '../utils/limpiarHTML'; 

import NotaMetadata from './NotaMetadata';
import NotaMedia from './NotaMedia';
import NotaEditor from './NotaEditor';

export default function PanelEditor({ id }) {
  const [nota, setNota] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: 'cargando', texto: 'Cargando información de la nota...' });
  const router = useRouter();

  useEffect(() => {
    const cargarNota = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNota({
            ...data,
            contenido: data.descripcion || '',
            fechaPublicacion: data.fechaPublicacion || ''
          });
          setMensaje({ tipo: '', texto: '' }); 
        } else {
          setMensaje({ tipo: 'error', texto: 'No se encontró la nota en la base de datos.' });
        }
      } catch (error) {
        setMensaje({ tipo: 'error', texto: 'Error al cargar: ' + error.message });
      }
    };

    if (id) cargarNota();
  }, [id]);

  const manejarGaleriaSubida = useCallback((urls) => {
    setNota((notaAnterior) => {
      if (JSON.stringify(notaAnterior.galeria) === JSON.stringify(urls)) return notaAnterior;
      return { ...notaAnterior, galeria: urls };
    });
  }, []);

  const actualizarNota = async (e) => {
    e.preventDefault();
    if (!nota.imagen) { 
      setMensaje({ tipo: 'error', texto: "La portada es obligatoria." }); 
      return; 
    }

    setMensaje({ tipo: 'cargando', texto: "Actualizando tu nota y limpiando formato..." });

    const tiempoReal = nota.fechaPublicacion ? new Date(nota.fechaPublicacion).getTime() : nota.timestamp;
    const fechaFormateada = nota.fechaPublicacion 
        ? new Date(nota.fechaPublicacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
        : nota.fecha;

    const contenidoLimpio = limpiarHTML(nota.contenido);

    try {
      const datosActualizados = {
        ...nota,
        descripcion: contenidoLimpio,
        timestamp: tiempoReal,
        fecha: fechaFormateada 
      };
      delete datosActualizados.contenido;

      await updateDoc(doc(db, "noticias", id), datosActualizados);
      
      setMensaje({ tipo: 'exito', texto: "¡Nota actualizada con éxito! Redirigiendo..." });
      setTimeout(() => router.push('/admin'), 1500);

    } catch (error) { 
      setMensaje({ tipo: 'error', texto: "Hubo un error: " + error.message }); 
    }
  };

  if (!nota && mensaje.tipo === 'cargando') {
    return <div className="p-20 text-center text-white font-black uppercase tracking-widest animate-pulse">{mensaje.texto}</div>;
  }

  if (!nota) {
    return <div className="p-20 text-center text-red-500 font-bold uppercase">{mensaje.texto}</div>;
  }

  return (
    <div className="p-6 text-white max-w-4xl mx-auto font-sans">
      
      <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-6">
        <button 
          type="button"
          onClick={() => router.push('/admin')} 
          className="text-lime-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest bg-[#16161a] px-4 py-2 rounded-full border border-gray-800 hover:border-lime-500 cursor-pointer"
        >
          ← Regresar
        </button>
        <h2 className="text-3xl font-black border-l-4 border-lime-500 pl-4 uppercase tracking-tight m-0 text-white">Editar Nota</h2>
      </div>

      {mensaje.texto && (
        <div className={`p-4 mb-8 rounded-lg font-bold uppercase tracking-widest text-sm text-center border shadow-lg ${
          mensaje.tipo === 'error' ? 'bg-red-900/50 border-red-500 text-red-200' : 
          mensaje.tipo === 'exito' ? 'bg-lime-900/50 border-lime-500 text-lime-200' : 
          'bg-gray-800 border-gray-500 text-white animate-pulse'
        }`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={actualizarNota} className="bg-[#0a0a0c] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-2">
        <NotaMetadata nota={nota} setNota={setNota} />
        <NotaMedia nota={nota} setNota={setNota} manejarGaleriaSubida={manejarGaleriaSubida} />
        <NotaEditor nota={nota} setNota={setNota} />
        
        <div className="pt-8">
          <button 
            type="submit" 
            disabled={mensaje.tipo === 'cargando'}
            className={`p-5 w-full font-black text-lg uppercase tracking-widest rounded-xl shadow-lg transition-all cursor-pointer ${
              mensaje.tipo === 'cargando' ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-lime-500 hover:bg-lime-400 text-black hover:scale-[1.01]'
            }`}
          >
            Guardar Cambios 💾
          </button>
        </div>
      </form>
    </div>
  );
}