"use client";

import React from 'react';

const ArticuloMultimedia = ({ nota }) => {
  const { spotifyLink, youtubeLink } = nota;

  if (!spotifyLink && !youtubeLink) return null;

  const renderIframe = (link, tipo) => {
    let embedUrl = link;
    let height = "352";

    if (tipo === 'spotify') {
      embedUrl = link.replace('open.spotify.com', 'open.spotify.com/embed');
    } else if (tipo === 'youtube') {
      height = "400";
      if (link.includes('watch?v=')) {
        embedUrl = link.replace('watch?v=', 'embed/');
      } else if (link.includes('youtu.be/')) {
        embedUrl = link.replace('youtu.be/', 'www.youtube.com/embed/');
      }
    }

    return (
      <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0f0f12]">
        <iframe 
          src={embedUrl} 
          width="100%" 
          height={height} 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    );
  };

  return (
    <section className="mt-8 space-y-8">
      {youtubeLink && renderIframe(youtubeLink, 'youtube')}
      {spotifyLink && renderIframe(spotifyLink, 'spotify')}
    </section>
  );
};

export default ArticuloMultimedia;