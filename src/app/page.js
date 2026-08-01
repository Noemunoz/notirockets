"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Utilidades
const esMusica = (cat) => cat?.includes('(Música)') || cat === 'Conciertos' || cat === 'Coberturas especiales';
const esCine = (cat) => cat?.includes('(Cine)') || cat === 'Coberturas (Cine)';
const esTeatro = (cat) => cat?.includes('(Teatro)') || cat === 'Cartelera';

const limpiarCategoria = (cat) => {
  if (!cat) return 'Nota';
  return cat.replace(/\s*\(.*?\)\s*/g, ''); 
};

/* =====================================================================
   COMPONENTE REUTILIZABLE: CABECERA DE SECCIÓN (Clicable)
   ===================================================================== */
const SectionHeader = ({ titulo, seccion }) => (
  <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
    <Link href={`/?seccion=${seccion}`} className="flex items-center gap-4 group cursor-pointer">
      <span className="h-6 w-2 bg-lime-500 group-hover:scale-y-125 transition-transform duration-300"></span>
      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight group-hover:text-lime-400 transition-colors">
        {titulo}
      </h3>
    </Link>
    <Link href={`/?seccion=${seccion}`} className="text-xs font-bold text-gray-500 hover:text-lime-400 uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer">
      Ver todas <span className="text-lg leading-none">→</span>
    </Link>
  </div>
);

/* =====================================================================
   COMPONENTES DE SECCIONES INDIVIDUALES (Modularizados)
   ===================================================================== */
const SeccionHero = ({ notaPrincipal }) => {
  if (!notaPrincipal) return null;
  return (
    <section>
      <Link href={`/nota/${notaPrincipal.id}`} className="group block relative overflow-hidden bg-gray-900 border border-gray-800 rounded-xl">
        <div className="aspect-video w-full overflow-hidden">
           <img src={notaPrincipal.imagen} alt={notaPrincipal.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
           <span className="self-start bg-lime-500 text-black text-xs font-black uppercase tracking-widest px-3 py-1 rounded shadow-lg mb-4">
             {limpiarCategoria(notaPrincipal.categoria)}
           </span>
           <h2 className="text-3xl md:text-5xl lg:text-7xl text-white font-black leading-tight max-w-5xl group-hover:text-lime-400 transition-colors drop-shadow-lg tracking-tighter">
             {notaPrincipal.titulo}
           </h2>
           <p className="hidden md:block text-gray-300 text-lg line-clamp-2 max-w-3xl mt-4 font-medium drop-shadow-md">
             {notaPrincipal.extracto || (notaPrincipal.descripcion ? notaPrincipal.descripcion.replace(/<[^>]+>/g, '') : '')}
           </p>
        </div>
      </Link>
    </section>
  );
};

const SeccionMusica = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section>
      <SectionHeader titulo="Música" seccion="Música" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {notas[0] && (
          <div className="lg:col-span-8">
            <Link href={`/nota/${notas[0].id}`} className="group flex flex-col h-full">
              <div className="aspect-video w-full overflow-hidden bg-gray-900 rounded-xl mb-5 border border-gray-800">
                <img src={notas[0].imagen} alt={notas[0].titulo} className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out" />
              </div>
              <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-2">{limpiarCategoria(notas[0].categoria)}</span>
              <h4 className="font-black text-white text-3xl leading-snug group-hover:text-lime-400 transition-colors">
                {notas[0].titulo}
              </h4>
              <p className="text-gray-400 mt-3 line-clamp-2 text-base">
                {notas[0].extracto || (notas[0].descripcion ? notas[0].descripcion.replace(/<[^>]+>/g, '') : '')}
              </p>
            </Link>
          </div>
        )}
        {notas.length > 1 && (
          <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-gray-800 lg:pl-8">
            {/* Ahora mapeamos las 4 notas restantes para llenar el hueco visual */}
            {notas.slice(1, 5).map(nota => (
              <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex gap-4 items-center">
                <div className="aspect-video w-32 shrink-0 overflow-hidden bg-gray-900 rounded-md border border-gray-800">
                  <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lime-500 font-bold uppercase text-[10px] tracking-widest mb-1">{limpiarCategoria(nota.categoria)}</span>
                  <h5 className="font-bold text-white text-sm leading-tight line-clamp-3 group-hover:text-lime-400 transition-colors">
                    {nota.titulo}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SeccionCine = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="bg-[#0f0f12] -mx-4 px-4 py-16 md:-mx-8 md:px-8 border-y border-gray-800">
      <div className="max-w-7xl mx-auto">
        <SectionHeader titulo="Cine" seccion="Cine" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notas.map(nota => (
            <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col">
              <div className="aspect-video w-full overflow-hidden bg-black rounded-xl mb-5 shadow-2xl border border-gray-800">
                <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700" />
              </div>
              <div className="flex flex-col grow text-center px-2">
                <span className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-3">{limpiarCategoria(nota.categoria)}</span>
                <h4 className="font-medium text-gray-200 text-lg uppercase tracking-wide leading-snug line-clamp-3 group-hover:text-lime-400 transition-colors">
                  {nota.titulo}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const SeccionTeatro = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section>
      <SectionHeader titulo="Teatro" seccion="Teatro" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col items-center">
            <div className="aspect-square w-full max-w-64 overflow-hidden bg-gray-900 rounded-full mb-5 border-4 border-[#0a0a0c] group-hover:border-lime-500 transition-colors duration-500 shadow-2xl">
              <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
            </div>
            <div className="text-center">
              <span className="text-lime-500 italic text-xs tracking-widest mb-2 block">{limpiarCategoria(nota.categoria)}</span>
              <h4 className="font-bold text-white text-base leading-snug line-clamp-3 group-hover:text-lime-400 transition-colors">
                {nota.titulo}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionAgenda = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Agenda" seccion="Agenda" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group relative overflow-hidden rounded-xl bg-gray-900 h-80 w-full border border-gray-800 shadow-xl">
            <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover brightness-50 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 bg-linear-to-t from-black via-black/40 to-transparent">
              <span className="self-start bg-lime-500 text-black font-black uppercase text-[10px] tracking-widest px-2 py-1 rounded shadow-lg mb-3">
                {limpiarCategoria(nota.categoria)}
              </span>
              <h4 className="font-black text-white text-lg leading-tight line-clamp-4 group-hover:text-lime-400 transition-colors drop-shadow-md">
                {nota.titulo}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionCultura = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Cultura" seccion="Cultura" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col sm:flex-row gap-6 items-center bg-[#121216] p-4 md:p-6 border border-gray-800 rounded-xl hover:border-lime-500/50 transition-colors shadow-lg">
            <div className="aspect-video sm:aspect-square w-full sm:w-48 shrink-0 overflow-hidden rounded-lg bg-gray-900">
              <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
            </div>
            <div className="flex flex-col grow">
              <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-2">{limpiarCategoria(nota.categoria)}</span>
              <h4 className="font-bold text-white text-xl md:text-2xl leading-snug mb-3 group-hover:text-lime-400 transition-colors">
                {nota.titulo}
              </h4>
              <p className="text-gray-400 text-sm line-clamp-3">
                {nota.extracto || (nota.descripcion ? nota.descripcion.replace(/<[^>]+>/g, '') : '')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionDanza = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Danza" seccion="Danza" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group relative h-96 overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
             <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-100" />
             <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-2 border-l-2 border-lime-500 pl-2 block">{limpiarCategoria(nota.categoria)}</span>
                <h4 className="font-bold text-white text-xl leading-snug group-hover:text-lime-400 transition-colors">{nota.titulo}</h4>
             </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionArte = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Arte" seccion="Arte" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notas.map((nota, idx) => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className={`group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 shadow-xl ${idx === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square md:aspect-video'}`}>
            <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-linear-to-t from-black via-black/40 to-transparent">
              <span className="self-start bg-black/60 backdrop-blur-sm text-lime-500 border border-lime-500 font-bold uppercase text-xs tracking-widest px-3 py-1 rounded-full mb-3 shadow-lg">
                {limpiarCategoria(nota.categoria)}
              </span>
              <h4 className={`font-black text-white leading-tight drop-shadow-md group-hover:text-lime-400 transition-colors ${idx === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                {nota.titulo}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionMiscelaneo = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Misceláneo" seccion="Misceláneo" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col bg-[#121216] rounded-2xl overflow-hidden border border-gray-800 hover:border-lime-500/50 transition-colors shadow-lg">
            <div className="aspect-video w-full overflow-hidden bg-black">
              <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
            </div>
            <div className="p-5 flex flex-col grow">
              <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-3 border-b border-gray-800 pb-2">{limpiarCategoria(nota.categoria)}</span>
              <h4 className="font-bold text-white text-base leading-snug line-clamp-4 group-hover:text-lime-400 transition-colors">
                {nota.titulo}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const SeccionColumnas = ({ notas }) => {
  if (!notas || notas.length === 0) return null;
  return (
    <section className="border-t border-gray-800 pt-16">
      <SectionHeader titulo="Columnas" seccion="Columnas" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notas.map(nota => (
          <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col bg-[#121216] border-t-4 border-lime-500 p-6 rounded-b-xl hover:bg-gray-800 transition-colors shadow-lg h-full">
            <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-4 block">Opinión</span>
            <h4 className="font-bold text-white text-lg leading-snug mb-4 group-hover:text-lime-400 transition-colors">
              &quot;{nota.titulo}&quot;
            </h4>
            <div className="mt-auto flex items-center gap-3 border-t border-gray-800 pt-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden shrink-0 border border-gray-600">
                <img src={nota.imagen} alt={nota.autor} className="w-full h-full object-cover grayscale" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold uppercase tracking-wider">{nota.autor || 'Redacción'}</span>
                <span className="text-gray-500 text-[10px] uppercase">Columnista</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* =====================================================================
   COMPONENTE PRINCIPAL (RUTEO Y FILTRADO)
   ===================================================================== */
function FeedNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadVisible, setCantidadVisible] = useState(12); 
  const searchParams = useSearchParams();

  const categoriaActual = searchParams.get('categoria');
  const seccionActual = searchParams.get('seccion');
  const textoBusqueda = searchParams.get('q') || '';

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

  const ahora = Date.now();
  
  const notasFiltradas = noticias.filter(nota => {
    const cat = nota.categoria;
    const coincideBusqueda = nota.titulo?.toLowerCase().includes(textoBusqueda.toLowerCase());
    const esVisible = !nota.fechaPublicacion || new Date(nota.fechaPublicacion).getTime() <= ahora;

    let coincideArea = false;
    if (seccionActual) {
       if (seccionActual === 'Música') coincideArea = esMusica(cat);
       else if (seccionActual === 'Cine') coincideArea = esCine(cat);
       else if (seccionActual === 'Teatro') coincideArea = esTeatro(cat);
       else coincideArea = cat === seccionActual;
    } else if (categoriaActual) {
       coincideArea = cat === categoriaActual;
    } else {
       coincideArea = true; // Inicio (todas)
    }
    
    return coincideArea && coincideBusqueda && esVisible;
  });

  if (cargando) {
    return <div className="text-lime-500 text-center py-32 font-black tracking-widest uppercase animate-pulse">Armando la Revista...</div>;
  }

  /* =====================================================================
     VISTA 1: CUADRÍCULA ESTÁNDAR (Filtros Específicos o Búsqueda)
     ===================================================================== */
  if (seccionActual || categoriaActual || textoBusqueda) {
    const notasAMostrar = notasFiltradas.slice(0, cantidadVisible);
    const tituloSeccion = textoBusqueda ? `Búsqueda: ${textoBusqueda}` : (seccionActual || categoriaActual);
    
    return (
      <div className="py-12 max-w-7xl mx-auto px-4">
        <div className="mb-10 border-b border-gray-800 pb-4">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            {tituloSeccion}
          </h2>
        </div>
        
        {notasAMostrar.length === 0 ? (
          <div className="text-center text-gray-500 py-20 font-bold uppercase tracking-widest">No se encontraron resultados en esta sección.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notasAMostrar.map(nota => (
               <Link key={nota.id} href={`/nota/${nota.id}`} className="group flex flex-col h-full bg-[#121216] border border-gray-800 rounded-xl overflow-hidden hover:border-lime-500/50 transition-colors">
                   <div className="aspect-video w-full overflow-hidden bg-gray-900 border-b border-gray-800">
                      <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                   </div>
                   <div className="flex flex-col grow p-5">
                       <span className="text-lime-500 font-bold uppercase text-xs tracking-widest mb-2">{limpiarCategoria(nota.categoria)}</span>
                       <h3 className="font-bold text-white text-lg leading-snug line-clamp-3 group-hover:text-lime-400 transition-colors">
                         {nota.titulo}
                       </h3>
                   </div>
               </Link>
            ))}
          </div>
        )}

        {cantidadVisible < notasFiltradas.length && (
          <div className="mt-16 text-center border-t border-gray-800 pt-8">
            <button 
              onClick={() => setCantidadVisible(prev => prev + 12)}
              className="text-white hover:text-lime-400 font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer"
            >
              ↓ Cargar más notas ↓
            </button>
          </div>
        )}
      </div>
    );
  }

  /* =====================================================================
     VISTA 2: PORTADA EDITORIAL (HOME) - ESTILO REVISTA
     ===================================================================== */
  
  const notaPrincipal = notasFiltradas[0];
  const restoParaPortada = notasFiltradas.slice(1);

  // Distribuimos las notas a sus respectivos componentes de sección.
  const notasDeMusica = restoParaPortada.filter(n => esMusica(n.categoria)).slice(0, 5); 
  const notasDeCine = restoParaPortada.filter(n => esCine(n.categoria)).slice(0, 3);
  const notasDeTeatro = restoParaPortada.filter(n => esTeatro(n.categoria)).slice(0, 4);
  const notasDeAgenda = restoParaPortada.filter(n => n.categoria === 'Agenda').slice(0, 4);
  const notasDeDanza = restoParaPortada.filter(n => n.categoria === 'Danza').slice(0, 3);
  const notasDeArte = restoParaPortada.filter(n => n.categoria === 'Arte').slice(0, 3);
  const notasDeCultura = restoParaPortada.filter(n => n.categoria === 'Cultura').slice(0, 4);
  const notasDeMiscelaneo = restoParaPortada.filter(n => n.categoria === 'Misceláneo').slice(0, 4);
  const notasDeColumnas = restoParaPortada.filter(n => n.categoria === 'Columnas').slice(0, 4);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 space-y-24">
      <SeccionHero notaPrincipal={notaPrincipal} />
      <SeccionMusica notas={notasDeMusica} />
      <SeccionAgenda notas={notasDeAgenda} />
      <SeccionCine notas={notasDeCine} />
      <SeccionTeatro notas={notasDeTeatro} />
      <SeccionDanza notas={notasDeDanza} />
      <SeccionArte notas={notasDeArte} />
      <SeccionCultura notas={notasDeCultura} />
      <SeccionMiscelaneo notas={notasDeMiscelaneo} />
      <SeccionColumnas notas={notasDeColumnas} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-lime-500 text-center py-32 font-black uppercase tracking-widest animate-pulse">Cargando la revista...</div>}>
      <FeedNoticias />
    </Suspense>
  );
}