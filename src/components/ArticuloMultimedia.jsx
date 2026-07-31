"use client";

import React from 'react';

const ArticuloMultimedia = ({ link }) => {
  if (!link) return null;

  const esSpotify = link.includes('spotify.com');
  const esYouTube = link.includes('youtube.com') || link.includes('youtu.be');

  let embedUrl = link;

  if (esSpotify) {
    embedUrl = link.replace('open.spotify.com', 'open.spotify.com/embed');
  } else if (esYouTube) {
    if (link.includes('watch?v=')) {
      embedUrl = link.replace('watch?v=', 'embed/');
    } else if (link.includes('youtu.be/')) {
      embedUrl = link.replace('youtu.be/', 'www.youtube.com/embed/');
    }
  }

  return (
    <section className="mt-12 border-t border-gray-800 pt-12">
      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
        <span className="h-6 w-1.5 bg-lime-500 rounded"></span>
        Multimedia
      </h3>
      <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0f0f12]">
        <iframe 
          src={embedUrl} 
          width="100%" 
          height={esSpotify ? "352" : "400"} 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    </section>
  );
};

export default ArticuloMultimedia;