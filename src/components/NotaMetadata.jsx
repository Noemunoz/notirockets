import React from 'react';
import { colaboradores } from '../data/colaboradores';

export default function NotaMetadata({ nota, setNota }) {
  const categoriaActual = nota.categoria || 'Noticias (Música)';
  
  // Procesar autores para que siempre sea un array (incluso si era texto viejo)
  const autoresActuales = Array.isArray(nota.autor) 
    ? nota.autor 
    : (nota.autor ? nota.autor.split(',').map(a => a.trim()) : []);

  const manejarAutor = (nombreAutor) => {
    if (autoresActuales.includes(nombreAutor)) {
      // Si ya estaba seleccionado, lo quitamos
      setNota({ ...nota, autor: autoresActuales.filter(a => a !== nombreAutor) });
    } else {
      // Si no estaba, lo agregamos
      setNota({ ...nota, autor: [...autoresActuales, nombreAutor] });
    }
  };

  // NUEVO: Identificar autores legacy (viejos) que no están en la lista actual ni son Redacción
  const autoresLegacy = autoresActuales.filter(
    (nombre) => nombre !== 'Editorial' && !colaboradores.some((c) => c.nombre === nombre)
  );

  return (
    <div className="space-y-6">
      
      {/* TÍTULO */}
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
          Título del Artículo
        </label>
        <input 
          type="text" 
          placeholder="Escribe el título..." 
          value={nota.titulo || ''} 
          onChange={(e) => setNota({...nota, titulo: e.target.value})} 
          className="w-full bg-[#16161a] p-3 rounded border border-gray-700 text-white outline-none focus:border-lime-500 transition-colors shadow-inner" 
          required 
        />
      </div>
      
      {/* MULTI-SELECTOR DE AUTORES */}
      <div className="bg-[#121216] border border-gray-800 p-4 rounded-xl">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
          Seleccionar Autor(es)
        </label>
        <div className="flex flex-wrap gap-2">
          {colaboradores.map(colab => {
             const estaSeleccionado = autoresActuales.includes(colab.nombre);
             return (
               <button
                 key={colab.id}
                 type="button"
                 onClick={() => manejarAutor(colab.nombre)}
                 className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                   estaSeleccionado 
                     ? 'bg-lime-500/20 text-lime-400 border-lime-500 shadow-md' 
                     : 'bg-[#16161a] text-gray-400 border-gray-700 hover:border-gray-500'
                 }`}
               >
                 {estaSeleccionado && '✓ '} {colab.nombre}
               </button>
             );
          })}
          {/* Opción Redacción General */}
          <button
             type="button"
             onClick={() => manejarAutor('Editorial')}
             className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
               autoresActuales.includes('Editorial') 
                 ? 'bg-gray-700 text-white border-gray-500' 
                 : 'bg-[#16161a] text-gray-400 border-gray-700 hover:border-gray-500'
             }`}
           >
             Editorial
           </button>

           {/* NUEVO: BOTONES ROJOS PARA BORRAR AUTORES VIEJOS (FANTASMAS) */}
           {autoresLegacy.map((nombreViejo, idx) => (
             <button
               key={`legacy-${idx}`}
               type="button"
               onClick={() => manejarAutor(nombreViejo)}
               className="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border bg-red-900/40 text-red-400 border-red-500 shadow-md hover:bg-red-900/60"
               title="Autor antiguo. Haz clic para removerlo."
             >
               ✕ {nombreViejo} (Remover)
             </button>
           ))}
        </div>
        {autoresActuales.length === 0 && (
          <p className="text-red-500 text-xs mt-3 font-bold animate-pulse">Debes seleccionar al menos un autor.</p>
        )}
      </div>
      
      {/* EXTRACTO */}
      <div>
        <div className="flex justify-between items-center mb-1.5 px-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Extracto (Resumen SEO)
          </label>
          <span className={`text-[10px] font-bold tracking-widest transition-colors ${
            (nota.extracto || '').length >= 150 ? 'text-lime-500 animate-pulse' : 'text-gray-500'
          }`}>
            {(nota.extracto || '').length} / 160
          </span>
        </div>
        <textarea 
          placeholder="Un breve resumen de la nota (Atrapa al lector en Google)..." 
          value={nota.extracto || ''} 
          maxLength={160}
          onChange={(e) => setNota({...nota, extracto: e.target.value})} 
          className="w-full h-20 bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-lime-500 transition-colors shadow-inner resize-none" 
        />
      </div>
      
      {/* CATEGORÍA Y FECHA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
              Categoría
            </label>
            <select 
              value={categoriaActual} 
              onChange={(e) => setNota({...nota, categoria: e.target.value})} 
              className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-lime-500 transition-colors shadow-inner"
            >
                <option value="Agenda">Agenda</option>
                <option value="Danza">Danza</option>
                <option value="Arte">Arte</option>
                <option value="Cultura">Cultura</option>
                <option value="Misceláneo">Misceláneo</option>

                <optgroup label="── MÚSICA ──" className="font-bold text-lime-500 bg-black">
                  <option value="Noticias (Música)" className="text-white font-normal bg-[#16161a]">Noticias</option>
                  <option value="Reseñas (Música)" className="text-white font-normal bg-[#16161a]">Reseñas</option>
                  <option value="Conciertos" className="text-white font-normal bg-[#16161a]">Conciertos</option>
                  <option value="Artículos (Música)" className="text-white font-normal bg-[#16161a]">Artículos</option>
                  <option value="Entrevistas (Música)" className="text-white font-normal bg-[#16161a]">Entrevistas</option>
                  <option value="Coberturas especiales" className="text-white font-normal bg-[#16161a]">Coberturas especiales</option>
                </optgroup>

                <optgroup label="── CINE ──" className="font-bold text-lime-500 bg-black">
                  <option value="Noticias (Cine)" className="text-white font-normal bg-[#16161a]">Noticias</option>
                  <option value="Reseñas (Cine)" className="text-white font-normal bg-[#16161a]">Reseñas</option>
                  <option value="Entrevistas (Cine)" className="text-white font-normal bg-[#16161a]">Entrevistas</option>
                  <option value="Artículos (Cine)" className="text-white font-normal bg-[#16161a]">Artículos</option>
                  <option value="Coberturas (Cine)" className="text-white font-normal bg-[#16161a]">Coberturas</option>
                </optgroup>

                <optgroup label="── TEATRO ──" className="font-bold text-lime-500 bg-black">
                  <option value="Noticias (Teatro)" className="text-white font-normal bg-[#16161a]">Noticias</option>
                  <option value="Reseñas (Teatro)" className="text-white font-normal bg-[#16161a]">Reseñas</option>
                  <option value="Cartelera" className="text-white font-normal bg-[#16161a]">Cartelera</option>
                  <option value="Artículos (Teatro)" className="text-white font-normal bg-[#16161a]">Artículos</option>
                  <option value="Entrevistas (Teatro)" className="text-white font-normal bg-[#16161a]">Entrevistas</option>
                </optgroup>
            </select>
          </div>
          
          <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                Publicar en (Fecha/Hora)
              </label>
              <input 
                type="datetime-local" 
                value={nota.fechaPublicacion || ''} 
                onChange={(e) => setNota({...nota, fechaPublicacion: e.target.value})} 
                className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-lime-500 transition-colors scheme-dark shadow-inner" 
                title="Deja vacío para publicar ahora mismo"
              />
          </div>
      </div>
    </div>
  );
}