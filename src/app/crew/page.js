"use client";

import React from 'react';
import { colaboradores } from '../../data/colaboradores';
import { FaInstagram } from 'react-icons/fa6';

export default function CrewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      
      {}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          La Tripulación de <span className="text-lime-500">Notirockets</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl mx-auto italic">
          &quot;Documentando la belleza del caos y llevando la cultura en órbita.&quot;
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {colaboradores.map((colab) => (
          <div 
            key={colab.id} 
            id={colab.id}
            className="bg-[#121216] border border-gray-800 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-colors shadow-2xl flex flex-col group scroll-mt-32"
          >
            {/* Foto Cuadrada Superior */}
            <div className="aspect-square w-full overflow-hidden bg-black relative">
              <img 
                src={colab.foto} 
                alt={colab.nombre} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400/16161a/84cc16?text=NR' }} 
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#121216] to-transparent opacity-80"></div>
            </div>

            {/* Contenido (Info) */}
            <div className="p-6 flex flex-col grow relative -mt-16 z-10">
              <span className="bg-lime-500 text-black text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg w-max mb-3">
                {colab.rol}
              </span>
              
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-lime-400 transition-colors">
                {colab.nombre}
              </h2>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 grow border-l-2 border-gray-700 pl-4 group-hover:border-lime-500 transition-colors">
                &quot;{colab.bio}&quot;
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-800">
                <a 
                  href={colab.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E1306C] transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <FaInstagram size={18} />
                  Síguelo en Instagram
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}