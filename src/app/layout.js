import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Notirockets | Cultura en Orbita 🚀',
  description: 'Revista digital independiente. Noticias, coberturas, reseñas de música, cine, teatro, arte y cultura a la velocidad de la luz.',
  keywords: ['notirockets', 'música', 'cine', 'teatro', 'cultura', 'conciertos', 'reseñas', 'cdmx', 'arte'],
  openGraph: {
    title: 'Notirockets | Cultura en Orbita 🚀',
    description: 'Revista digital independiente. Noticias, coberturas, reseñas de música, cine, teatro, arte y cultura.',
    url: 'https://notirockets.com',
    siteName: 'Notirockets',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notirockets | Cultura en Orbita 🚀',
    description: 'Cultura en Órbita a la velocidad de la luz.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 
        selection:bg-lime-500 selection:text-black 
        Hace que al sombrear un texto para copiarlo, se vea verde neón en lugar del azul por defecto o el rojo viejo. 
      */}
      <body className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans selection:bg-lime-500 selection:text-black">
        <Navbar />
        <main className="grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}