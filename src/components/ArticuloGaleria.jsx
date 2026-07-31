"use client";

import React, { useState } from 'react';

const ArticuloGaleria = ({ galeria }) => {
  const [imagenActiva, setImagenActiva] = useState(null);

  if (!galeria || galeria.length === 0) return null;

  return (
    <>
      <section className="mt-16 pt-12 border-t border-gray-800">
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
          <span className="h-8 w-1.5 bg-lime-500 rounded"></span>
          Cobertura Fotográfica
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galeria.map((foto, index) => (
            <div 
              key={index} 
              onClick={() => setImagenActiva(foto)}
              className="relative overflow-hidden rounded-xl border border-gray-800 group bg-gray-900 aspect-video cursor-pointer"
            >
              <img 
                src={foto} 
                alt={`Fotografía ${index + 1}`} 
                className="w-full h-full object-cover grayscale-20% group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-out" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-lime-500 text-black px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">Ver</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Visor de Imágenes */}
      {imagenActiva && (
        <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10" onClick={() => setImagenActiva(null)}>
          <button className="absolute top-6 right-6 text-black bg-lime-500 hover:bg-lime-400 w-12 h-12 rounded-full text-2xl font-black transition-transform hover:scale-110 flex items-center justify-center cursor-pointer shadow-2xl z-50">✕</button>
          <img 
            src={imagenActiva} 
            alt="Visor ampliado" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default ArticuloGaleria;