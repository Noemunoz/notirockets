"use client";

import React from 'react';
import Link from 'next/link'; 
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaXTwitter, FaThreads } from 'react-icons/fa6';
import logoNR from '../assets/logo_nr.png'; 

function Footer() {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="bg-[#16161a] border-t border-gray-800 mt-20 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LOGO Y DESCRIPCIÓN (SLOGAN ACTUALIZADO) */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center">
            <img src={logoNR.src || logoNR} alt="Logo Notirockets" className="h-12 md:h-16 w-auto object-contain" />
          </div>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-bold italic">
            &quot;Notirockets, Cultura en Orbita 🚀&quot;
          </p>
        </div>

        {/* SECCIONES (Sincronizadas con la página principal) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-black uppercase text-xs tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="h-3 w-1 bg-lime-500 rounded"></span>
            Secciones
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs uppercase font-bold tracking-wider">
            <Link href="/" className="hover:text-lime-400 transition-colors">Inicio</Link>
            <Link href="/?seccion=Música" className="hover:text-lime-400 transition-colors">Música</Link>
            <Link href="/?seccion=Agenda" className="hover:text-lime-400 transition-colors">Agenda</Link>
            <Link href="/?seccion=Cine" className="hover:text-lime-400 transition-colors">Cine</Link>
            <Link href="/?seccion=Teatro" className="hover:text-lime-400 transition-colors">Teatro</Link>
            <Link href="/?seccion=Danza" className="hover:text-lime-400 transition-colors">Danza</Link>
            <Link href="/?seccion=Arte" className="hover:text-lime-400 transition-colors">Arte</Link>
            <Link href="/?seccion=Cultura" className="hover:text-lime-400 transition-colors">Cultura</Link>
            <Link href="/?seccion=Misceláneo" className="hover:text-lime-400 transition-colors">Misceláneo</Link>
            <Link href="/?seccion=Columnas" className="hover:text-lime-400 transition-colors">Columnas</Link>
            <Link href="/crew" className="text-lime-500 hover:text-white transition-colors">El Crew</Link>
          </div>
        </div>

        {/* COMUNIDAD Y REDES SOCIALES */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-black uppercase text-xs tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="h-3 w-1 bg-lime-500 rounded"></span>
            Comunidad
          </h4>
          <p className="text-xs text-gray-500 mb-2">Síguenos en nuestras plataformas oficiales:</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.facebook.com/share/1GTXV9YAQg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaFacebookF size={14} />
            </a>
            <a href="https://www.instagram.com/notirockets?igsh=cGl2ZzIwNHNlZGpm" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaInstagram size={14} />
            </a>
            <a href="https://x.com/notirockets?s=11" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaXTwitter size={14} />
            </a>
            <a href="https://www.threads.com/@notirockets?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaThreads size={14} />
            </a>
            <a href="https://www.tiktok.com/@notirockets?_t=ZS-90B0qtVY5KL&_r=1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaTiktok size={14} />
            </a>
            <a href="https://www.youtube.com/@notirockets" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-lime-500 hover:text-black hover:bg-lime-500 transition-all">
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

      </div>

      <div className="bg-[#0f0f12] border-t border-gray-800 py-6 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {añoActual} Notirockets. Todos los derechos reservados.</p>
          <p className="text-[10px] text-gray-700 font-bold">Cultura en Orbita 🚀</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;