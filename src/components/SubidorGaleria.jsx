"use client";

import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const SubidorGaleria = ({ onGaleriaSubida, imagenesActuales = [] }) => {
  const [archivosSubiendo, setArchivosSubiendo] = useState([]);
  const [urlsSubidas, setUrlsSubidas] = useState(imagenesActuales);
  const [error, setError] = useState(null);

  useEffect(() => {
    onGaleriaSubida(urlsSubidas);
  }, [urlsSubidas, onGaleriaSubida]);

  const manejarSubidaMultiple = async (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0) return;

    if (archivos.length > 20) {
      setError("Por favor, sube un máximo de 20 imágenes a la vez.");
      return;
    }

    const nuevosSubiendo = archivos.map(archivo => ({
      nombre: archivo.name,
      progreso: 0,
      archivo: archivo
    }));
    
    setArchivosSubiendo(prev => [...prev, ...nuevosSubiendo]);

    // CÓDIGO REAL PARA FIREBASE
    archivos.forEach(archivo => {
      const nombreUnico = `galerias/${Date.now()}_${archivo.name}`;
      const storageRef = ref(storage, nombreUnico);
      const uploadTask = uploadBytesResumable(storageRef, archivo);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progresoActual = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setArchivosSubiendo(estadoActual => 
            estadoActual.map(item => item.nombre === archivo.name ? { ...item, progreso: progresoActual } : item)
          );
        },
        (err) => {
          console.error("Error al subir:", err);
          setError("🚨 " + err.message);
          setArchivosSubiendo(estadoActual => estadoActual.filter(item => item.nombre !== archivo.name));
        },
        async () => {
          const urlDescarga = await getDownloadURL(uploadTask.snapshot.ref);
          setUrlsSubidas(prev => [...prev, urlDescarga]);
          setArchivosSubiendo(estadoActual => estadoActual.filter(item => item.nombre !== archivo.name));
        }
      );
    });
  };

  const quitarImagen = (indexAEliminar) => {
    setUrlsSubidas(prev => prev.filter((_, index) => index !== indexAEliminar));
  };

  return (
    <div className="w-full bg-[#16161a] border border-gray-700 rounded p-4">
      <label className="block text-gray-400 font-bold mb-3 uppercase text-sm tracking-wider">Galería de Fotos (Opcional)</label>
      
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors relative mb-4">
        <label className="cursor-pointer flex flex-col items-center justify-center h-full">
          <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span className="text-gray-400 font-medium">Agregar fotos a la galería</span>
          <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" multiple onChange={manejarSubidaMultiple} />
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {archivosSubiendo.length > 0 && (
        <div className="mb-6 space-y-2">
          {archivosSubiendo.map((archivo, index) => (
            <div key={index} className="flex items-center gap-3 text-xs text-gray-400">
              <span className="truncate w-32">{archivo.nombre}</span>
              <div className="grow bg-gray-800 rounded-full h-1.5">
                <div className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${archivo.progreso}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {urlsSubidas.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {urlsSubidas.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img src={url} alt={`Foto galería ${index}`} className="w-full h-full object-cover rounded-md border border-gray-700" />
              <button 
                type="button" 
                onClick={() => quitarImagen(index)} 
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubidorGaleria;