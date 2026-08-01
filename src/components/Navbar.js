"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaXTwitter, FaThreads } from 'react-icons/fa6';
import logoNR from "../assets/logo_nr.svg"; 

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQuery = searchParams.get('q') || "";
      if (inputValue !== currentQuery) {
        router.push(inputValue ? `/?q=${encodeURIComponent(inputValue)}` : '/');
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, router, searchParams]);

  return (
    <div className="flex items-center gap-2 bg-[#0a0a0c] border border-gray-700 rounded-full px-4 py-2 w-full lg:w-64 focus-within:border-lime-500 transition-colors">
      <span className="text-gray-400 text-sm">🔍</span>
      <input 
        type="text" 
        placeholder="Buscar..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
      />
    </div>
  );
};

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const categoriaActualURL = searchParams.get('categoria');
  const seccionActualURL = searchParams.get('seccion');

  const menuEstructura = [
    { nombre: "Inicio", ruta: "/" },
    { 
      nombre: "Música", 
      ruta: "/?seccion=Música",
      subcategorias: [
        { nombre: "Noticias", ruta: "/?categoria=Noticias (Música)" },
        { nombre: "Reseñas", ruta: "/?categoria=Reseñas (Música)" },
        { nombre: "Conciertos", ruta: "/?categoria=Conciertos" },
        { nombre: "Artículos", ruta: "/?categoria=Artículos (Música)" },
        { nombre: "Entrevistas", ruta: "/?categoria=Entrevistas (Música)" },
        { nombre: "Coberturas", ruta: "/?categoria=Coberturas especiales" }
      ]
    },
    { 
      nombre: "Cine", 
      ruta: "/?seccion=Cine",
      subcategorias: [
        { nombre: "Noticias", ruta: "/?categoria=Noticias (Cine)" },
        { nombre: "Reseñas", ruta: "/?categoria=Reseñas (Cine)" },
        { nombre: "Entrevistas", ruta: "/?categoria=Entrevistas (Cine)" },
        { nombre: "Artículos", ruta: "/?categoria=Artículos (Cine)" },
        { nombre: "Coberturas", ruta: "/?categoria=Coberturas (Cine)" }
      ]
    },
    { 
      nombre: "Teatro", 
      ruta: "/?seccion=Teatro",
      subcategorias: [
        { nombre: "Noticias", ruta: "/?categoria=Noticias (Teatro)" },
        { nombre: "Reseñas", ruta: "/?categoria=Reseñas (Teatro)" },
        { nombre: "Cartelera", ruta: "/?categoria=Cartelera" },
        { nombre: "Artículos", ruta: "/?categoria=Artículos (Teatro)" },
        { nombre: "Entrevistas", ruta: "/?categoria=Entrevistas (Teatro)" }
      ]
    },
    { nombre: "Arte", ruta: "/?seccion=Arte" },
    { nombre: "Danza", ruta: "/?seccion=Danza" },
    { nombre: "Cultura", ruta: "/?seccion=Cultura" },
    { nombre: "Misceláneo", ruta: "/?seccion=Misceláneo" },
    { nombre: "Agenda", ruta: "/?seccion=Agenda" }
  ];

  const seccionActivaObj = menuEstructura.find(item => 
    (seccionActualURL === item.nombre) || 
    (item.subcategorias?.some(sub => sub.ruta.includes(categoriaActualURL)))
  );

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      
      {/* BARRA NEGRA PRINCIPAL */}
      <div className="bg-[#16161a] shadow-2xl border-b border-gray-800">
        
        {/* TOP BAR: Logo, Redes y Buscador */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-3">
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => router.push('/')}>
            <Image 
              src={logoNR} 
              alt="Notirockets" 
              width={220} 
              height={60}
              className="h-8 sm:h-10 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
              priority 
            />
          </div>

          <div className="flex items-center gap-4 w-full justify-end lg:w-auto">
            {/* REDES SOCIALES (Solo visibles en Desktop para ahorrar espacio) */}
            <div className="hidden lg:flex items-center gap-4 text-gray-400 border-r border-gray-700 pr-6">
              <a href="https://www.facebook.com/share/1GTXV9YAQg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="https://www.instagram.com/notirockets?igsh=cGl2ZzIwNHNlZGpm" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="https://x.com/notirockets?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaXTwitter size={18} />
              </a>
              <a href="https://www.threads.com/@notirockets?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaThreads size={18} />
              </a>
              <a href="https://www.tiktok.com/@notirockets?_t=ZS-90B0qtVY5KL&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaTiktok size={18} />
              </a>
              <a href="https://www.youtube.com/@notirockets" target="_blank" rel="noopener noreferrer" className="hover:text-lime-500 hover:scale-110 transition-all">
                <FaYoutube size={18} />
              </a>
            </div>
            
            {/* Buscador siempre visible, más compacto en celular */}
            <div className="w-36 sm:w-56 lg:w-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Menú Editorial (Scroll Horizontal) */}
        <div className="block border-t border-gray-800 bg-[#0f0f12]">
          <nav className="max-w-7xl mx-auto px-4 flex items-center justify-start lg:justify-center gap-6 lg:gap-7 overflow-x-auto scrollbar-hide">
            {menuEstructura.map((item) => {
              const estaActivo = 
                (seccionActivaObj?.nombre === item.nombre && pathname === "/") || 
                (item.nombre === "Inicio" && pathname === "/" && !seccionActualURL && !categoriaActualURL);

              return (
                <button
                  key={item.nombre}
                  onClick={() => router.push(item.ruta)}
                  className={`py-4 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border-b-2 shrink-0 ${
                    estaActivo ? 'text-lime-500 border-lime-500' : 'text-gray-300 hover:text-lime-500 border-transparent'
                  }`}
                >
                  {item.nombre}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* BARRA BLANCA SECUNDARIA (Scroll Horizontal) */}
      {seccionActivaObj && seccionActivaObj.subcategorias && (
        <div className="block bg-white border-b border-gray-300 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex justify-start lg:justify-center items-center gap-8 py-3 overflow-x-auto scrollbar-hide">
            {seccionActivaObj.subcategorias.map((sub) => {
               const esSubActiva = categoriaActualURL === sub.ruta.split('=')[1];
               return (
                  <button
                    key={sub.nombre}
                    onClick={() => router.push(sub.ruta)}
                    className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer shrink-0 ${
                      esSubActiva ? 'text-lime-500' : 'text-black hover:text-lime-500'
                    }`}
                  >
                    {sub.nombre}
                  </button>
               )
            })}
          </div>
        </div>
      )}

    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<header className="h-32 bg-[#16161a] border-b border-gray-800 sticky top-0 z-50"></header>}>
      <NavbarContent />
    </Suspense>
  );
}