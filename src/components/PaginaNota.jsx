"use client";

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { FaFacebook, FaXTwitter, FaWhatsapp, FaLink } from 'react-icons/fa6';

import ArticuloHeader from './ArticuloHeader';
import ArticuloBody from './ArticuloBody';
import ArticuloMultimedia from './ArticuloMultimedia';
import ArticuloGaleria from './ArticuloGaleria';

function PaginaNota({ id }) {
  const [nota, setNota] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [copiado, setCopiado] = useState(false);

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

  const copiarEnlace = () => {
    navigator.clipboard.writeText(urlActual);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000); // El mensaje desaparece a los 2 segundos
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 w-full min-w-0 break-words leading-relaxed overflow-visible">
      <ArticuloHeader nota={nota} />
      <ArticuloBody extracto={nota.extracto} descripcion={nota.descripcion} />
      
      <ArticuloMultimedia nota={nota} />
      <ArticuloGaleria galeria={nota.galeria} />

      {/* BOTONES DE COMPARTIR MOVIDOS HASTA EL FINAL */}
      <div className="flex flex-col items-center justify-center gap-4 mt-16 pt-10 border-t border-gray-800">
        <span className="text-[10px] text-lime-500 uppercase tracking-widest font-black">Comparte esta nota:</span>
        <div className="flex items-center gap-6">
          <a href={linkFacebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-125 transition-transform" title="Compartir en Facebook">
            <FaFacebook size={26} />
          </a>
          <a href={linkX} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-125 transition-transform" title="Compartir en X">
            <FaXTwitter size={26} />
          </a>
          <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-125 transition-transform" title="Compartir en WhatsApp">
            <FaWhatsapp size={26} />
          </a>
          <button onClick={copiarEnlace} className="text-gray-400 hover:text-lime-500 hover:scale-125 transition-all flex flex-col items-center justify-center relative cursor-pointer" title="Copiar enlace">
            <FaLink size={24} />
            {copiado && <span className="absolute -top-8 bg-lime-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg">¡Copiado!</span>}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PaginaNota;