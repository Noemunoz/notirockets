"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaXTwitter, FaThreads } from 'react-icons/fa6';
import logoNR from "../assets/logo_nr.jpg"; 

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
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [subMenuMovil, setSubMenuMovil] = useState(null); 
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
    { nombre: "Agenda", ruta: "/?seccion=Agenda" },
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
    { nombre: "Danza", ruta: "/?seccion=Danza" },
    { nombre: "Arte", ruta: "/?seccion=Arte" },
    { nombre: "Cultura", ruta: "/?seccion=Cultura" },
    { nombre: "Misceláneo", ruta: "/?seccion=Misceláneo" },
    { nombre: "Columnas", ruta: "/?seccion=Columnas" },
    { nombre: "El Crew", ruta: "/crew" }
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => router.push('/')}>
            <Image 
              src={logoNR} 
              alt="Notirockets" 
              width={220} 
              height={60}
              className="h-10 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform"
              priority 
            />
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {/* REDES SOCIALES */}
            <div className="flex items-center gap-4 text-gray-400 border-r border-gray-700 pr-6">
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
            
            <SearchBar />
          </div>

          <button 
            className="lg:hidden text-white hover:text-lime-500 transition-colors p-2 text-2xl cursor-pointer"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* BOTTOM BAR: Menú Editorial */}
        <div className="hidden lg:block border-t border-gray-800 bg-[#0f0f12]">
          <nav className="max-w-7xl mx-auto px-2 flex items-center justify-center gap-4 xl:gap-7">
            {menuEstructura.map((item) => {
              const estaActivo = 
                (seccionActivaObj?.nombre === item.nombre && pathname === "/") || 
                (item.nombre === "Inicio" && pathname === "/" && !seccionActualURL && !categoriaActualURL) ||
                (item.nombre === "El Crew" && pathname === "/crew");

              return (
                <button
                  key={item.nombre}
                  onClick={() => router.push(item.ruta)}
                  className={`py-4 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border-b-2 ${
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

      {/* BARRA BLANCA SECUNDARIA (Estilo Indie Rocks) */}
      {seccionActivaObj && seccionActivaObj.subcategorias && (
        <div className="hidden lg:block bg-white border-b border-gray-300 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-8 py-3">
            {seccionActivaObj.subcategorias.map((sub) => {
               const esSubActiva = categoriaActualURL === sub.ruta.split('=')[1];
               return (
                  <button
                    key={sub.nombre}
                    onClick={() => router.push(sub.ruta)}
                    className={`text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${
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

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuAbierto && (
        <div className="lg:hidden bg-[#0f0f12] border-t border-gray-800 shadow-inner max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <SearchBar />
          </div>
          <nav className="flex flex-col py-2">
            {menuEstructura.map((item) => {
              const tieneSubmenu = item.subcategorias && item.subcategorias.length > 0;
              const subMenuAbierto = subMenuMovil === item.nombre;

              return (
                <div key={item.nombre} className="border-b border-gray-800/50 last:border-0">
                  <div className="flex w-full">
                    {/* Botón principal lleva a la sección */}
                    <button
                      onClick={() => { router.push(item.ruta); setMenuAbierto(false); }}
                      className="grow text-left px-6 py-4 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-lime-500 transition-colors"
                    >
                      {item.nombre}
                    </button>
                    {/* Botón secundario despliega acordeón */}
                    {tieneSubmenu && (
                      <button 
                        onClick={() => setSubMenuMovil(subMenuAbierto ? null : item.nombre)}
                        className="px-6 py-4 text-gray-400 hover:text-lime-500"
                      >
                        <span className={`inline-block transition-transform duration-300 ${subMenuAbierto ? 'rotate-180 text-lime-500' : ''}`}>▼</span>
                      </button>
                    )}
                  </div>

                  {tieneSubmenu && subMenuAbierto && (
                    <div className="bg-[#16161a] py-2 px-6 flex flex-col gap-1 border-l-2 border-lime-500 ml-6 mb-4">
                      {item.subcategorias.map((sub) => (
                        <button
                          key={sub.nombre}
                          onClick={() => { router.push(sub.ruta); setMenuAbierto(false); }}
                          className="text-left py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-lime-500 transition-colors"
                        >
                          {sub.nombre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
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