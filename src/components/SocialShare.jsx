import React from 'react';

import { FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

const SocialShare = ({ titulo, urlActual }) => {
  const tituloCompartir = encodeURIComponent(`¡Checa esta nota en Habitantes del Rock!: ${titulo}`);
  const urlCompartir = encodeURIComponent(urlActual);

  return (
    <div className="flex items-center gap-4 mt-4 sm:mt-0">
      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Compartir:</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlCompartir}`} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-110 transition-transform">
        <FaFacebook size={26} />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${urlCompartir}&text=${tituloCompartir}`} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform">
        <FaXTwitter size={26} />
      </a>
      <a href={`https://api.whatsapp.com/send?text=${tituloCompartir}%20${urlCompartir}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform">
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
};
export default SocialShare;