"use client";

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

import ArticuloHeader from './ArticuloHeader';
import ArticuloBody from './ArticuloBody';
import ArticuloMultimedia from './ArticuloMultimedia';
import ArticuloGaleria from './ArticuloGaleria';

function PaginaNota({ id }) {
  const [nota, setNota] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNota = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setNota(docSnap.data());
      } catch (error) {
        console.error("Error al cargar la nota:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerNota();
  }, [id]);

  if (cargando) return <div className="text-lime-500 text-center py-32 font-black uppercase tracking-widest animate-pulse">Cargando nota...</div>;
  if (!nota) return <h2 className="text-center text-white mt-32 text-2xl font-black uppercase">Nota no encontrada</h2>;

  const urlActual = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 w-full min-w-0 wrap-break-word leading-relaxed overflow-visible">
      <ArticuloHeader nota={nota} urlActual={urlActual} />
      <ArticuloBody extracto={nota.extracto} descripcion={nota.descripcion} />
      <ArticuloMultimedia link={nota.spotifyLink} />
      <ArticuloGaleria galeria={nota.galeria} />
    </article>
  );
}

export default PaginaNota;