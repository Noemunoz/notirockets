import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 
import PaginaNota from '../../../components/PaginaNota';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const siteUrl = 'https://www.notirockets.com';
  
  try {
    const docRef = doc(db, "noticias", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const nota = docSnap.data();
      
      return {
        title: `${nota.titulo} | Notirockets`,
        description: nota.extracto || "Noticias musicales a la velocidad de la luz.",
        alternates: {
          canonical: `${siteUrl}/nota/${id}`,
        },
        openGraph: {
          title: nota.titulo,
          description: nota.extracto || "Noticias musicales a la velocidad de la luz.",
          url: `${siteUrl}/nota/${id}`, 
          images: [{ 
            url: nota.imagen,
            width: 1200,
            height: 630,
            alt: nota.titulo
          }],
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: nota.titulo,
          description: nota.extracto,
          images: [nota.imagen],
        }
      };
    }
  } catch (error) {
    console.error("Error cargando metadatos:", error);
  }

  return {
    title: 'Nota no encontrada | Notirockets'
  };
}

export default async function NotaPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return <PaginaNota id={id} />;
}