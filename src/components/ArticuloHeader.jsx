"use client";

import React, { useState } from 'react';
import Link from 'next/link'; 
import { colaboradores } from '../data/colaboradores'; // Importamos la DB del Crew

const ArticuloHeader = ({ nota }) => {
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  // Adaptar si es una nota vieja (string) o nota nueva (array)
  const listaAutores = Array.isArray(nota.autor) 
    ? nota.autor 
    : (nota.autor ? nota.autor.split(',').map(a => a.trim()) : ['Redacción']);

  return (
    <>
      <header className="mb-8">
        <Link href="/" className="inline-flex text-lime-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest items-center gap-2 mb-8 bg-[#16161a] px-4 py-2 rounded-full border border-gray-800 hover:border-lime-500">
          ← Volver al inicio
        </Link>
        
        <div>
          <span className="bg-lime-500 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg shadow-lime-500/20">
            {nota.categoria}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-6 uppercase leading-tight tracking-tighter">
          {nota.titulo}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6 border-b border-gray-800 pb-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-500 text-sm font-semibold uppercase tracking-wider">
            <span>{nota.fecha}</span>
            <span className="text-lime-500 hidden sm:inline">•</span>
            
            {/* RENDERIZADO DINÁMICO DE AUTORES CON FOTO */}
            <div className="flex flex-wrap items-center gap-4">
               {listaAutores.map((nombreAutor, index) => {
                  const infoColab = colaboradores.find(c => c.nombre === nombreAutor);
                  return (
                    <Link key={index} href={`/crew#${infoColab ? infoColab.id : 'staff'}`} className="flex items-center gap-2 group cursor-pointer">
                       {infoColab ? (
                         <img src={infoColab.foto} alt={infoColab.nombre} className="w-8 h-8 rounded-full object-cover border border-gray-700 group-hover:border-lime-500 transition-colors" />
                       ) : (
                         <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] text-white">NR</div>
                       )}
                       <span className="text-gray-300 group-hover:text-lime-500 transition-colors">
                          Por {nombreAutor}
                       </span>
                    </Link>
                  )
               })}
            </div>
          </div>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-8 border border-gray-800 bg-[#0f0f12] cursor-pointer group flex justify-center" onClick={() => setPantallaCompleta(true)}>
          <img src={nota.imagen} alt={nota.titulo} className="w-full h-auto max-h-[85vh] object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
             <span className="bg-lime-500 text-black px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg shadow-lime-500/30">Ampliar Portada</span>
          </div>
        </div>
      </header>

      {/* Modal de Pantalla Completa */}
      {pantallaCompleta && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10" onClick={() => setPantallaCompleta(false)}>
          <button className="absolute top-6 right-6 text-black bg-lime-500 hover:bg-lime-400 w-12 h-12 rounded-full text-2xl font-black transition-transform hover:scale-110 flex items-center justify-center cursor-pointer shadow-2xl z-50">✕</button>
          <img src={nota.imagen} alt={nota.titulo} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default ArticuloHeader;