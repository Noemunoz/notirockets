"use client";

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

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

  const tituloCompartir = encodeURIComponent(`¡Checa esta nota en Notirockets!: ${nota.titulo}`);
  const urlCompartir = encodeURIComponent(urlActual);

  const linkFacebook = `https://www.facebook.com/sharer/sharer.php?u=${urlCompartir}`;
  const linkX = `https://twitter.com/intent/tweet?url=${urlCompartir}&text=${tituloCompartir}`;
  const linkWhatsApp = `https://api.whatsapp.com/send?text=${tituloCompartir}%20${urlCompartir}`;

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 w-full min-w-0 break-words leading-relaxed overflow-visible">
      <ArticuloHeader nota={nota} />
      <ArticuloBody extracto={nota.extracto} descripcion={nota.descripcion} />
      
      {/* BOTONES DE COMPARTIR AL FINAL DE LA NOTA */}
      <div className="flex flex-col items-center justify-center gap-5 mt-16 pt-10 border-t border-gray-800">
        <span className="text-xs text-lime-500 uppercase tracking-widest font-black">Comparte esta nota:</span>
        <div className="flex items-center gap-8">
          <a href={linkFacebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-transform" title="Compartir en Facebook">
            <FaFacebook size={36} />
          </a>
          <a href={linkX} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-transform" title="Compartir en X">
            <FaXTwitter size={36} />
          </a>
          <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-transform" title="Compartir en WhatsApp">
            <FaWhatsapp size={36} />
          </a>
        </div>
      </div>

      <ArticuloMultimedia link={nota.spotifyLink} />
      <ArticuloGaleria galeria={nota.galeria} />
    </article>
  );
}

export default PaginaNota;