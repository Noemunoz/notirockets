"use client";

import React, { useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function NotaEditor({ nota, setNota }) {
  const quillRef = useRef(null);

  // 🚀 INTERCEPTAMOS EL BOTÓN DE IMAGEN
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // 1. Subimos la imagen a Firebase Storage (carpeta 'editor_images')
      const storageRef = ref(storage, `editor_images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
            // Opcional: El editor se queda esperando mientras sube rápido en segundo plano
        },
        (error) => {
          console.error('Error subiendo la imagen del editor:', error);
          alert("Hubo un error al subir la imagen al texto.");
        },
        async () => {
          // 2. Obtenemos el link público oficial
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // 3. Insertamos la imagen en el texto usando el link (0 bytes de peso en base de datos)
          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', downloadURL);
            quill.setSelection(range.index + 1);
          }
        }
      );
    };
  }, []);

  // MEMORIZAMOS LA BARRA PARA NO PERDER EL FOCO DEL TECLADO
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image', 'video'], 
        ['clean']
      ],
      handlers: {
        image: imageHandler // Le decimos a Quill que use nuestra función
      }
    }
  }), [imageHandler]);

  return (
    <div className="border-t border-gray-800 pt-6 mt-6">
      <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
        <span className="h-4 w-1 bg-lime-500 rounded"></span>
        Cuerpo del Artículo
      </h3>
      <div className="bg-white text-black rounded-lg overflow-hidden border border-gray-700 shadow-xl">
          <ReactQuill 
            ref={quillRef}
            theme="snow" 
            modules={modules} 
            value={nota.contenido} 
            onChange={(val) => setNota({...nota, contenido: val})} 
          />
      </div>
    </div>
  );
}