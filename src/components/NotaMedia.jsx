"use client";

import React from 'react';
import SubidorImagen from './SubidorImagen'; 
import SubidorGaleria from './SubidorGaleria';

export default function NotaMedia({ nota, setNota, manejarGaleriaSubida }) {
  
  return (
    <div className="space-y-6 border-t border-gray-800 pt-6 mt-6">
      
      <div className="mb-2">
        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
          <span className="h-4 w-1 bg-lime-500 rounded"></span>
          Archivos Multimedia
        </h3>
      </div>

      <SubidorImagen 
          carpeta="portadas" 
          titulo="Subir Foto de Portada" 
          imagenActual={nota.imagen}
          onImagenSubida={(url) => setNota({...nota, imagen: url})}
          onImagenEliminada={() => setNota({...nota, imagen: ''})}
      />

      <SubidorGaleria 
          imagenesActuales={nota.galeria} 
          onGaleriaSubida={manejarGaleriaSubida} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text"
          value={nota.spotifyLink || ''} 
          onChange={(e) => setNota({...nota, spotifyLink: e.target.value})} 
          placeholder="Link de Spotify (Álbum/Playlist)" 
          className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-lime-500 transition-colors shadow-inner" 
        />
        <input 
          type="text"
          value={nota.youtubeLink || ''} 
          onChange={(e) => setNota({...nota, youtubeLink: e.target.value})} 
          placeholder="Link de YouTube (Video)" 
          className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-lime-500 transition-colors shadow-inner" 
        />
      </div>
    </div>
  );
}