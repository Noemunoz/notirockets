"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function NotaEditor({ nota, setNota }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'], 
      ['clean']
    ],
  };

  return (
    <div className="border-t border-gray-800 pt-6 mt-6">
      <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
        <span className="h-4 w-1 bg-lime-500 rounded"></span>
        Cuerpo del Artículo
      </h3>
      <div className="bg-white text-black rounded-lg overflow-hidden border border-gray-700 shadow-xl">
          <ReactQuill 
            theme="snow" 
            modules={modules} 
            value={nota.contenido} 
            onChange={(val) => setNota({...nota, contenido: val})} 
          />
      </div>
    </div>
  );
}