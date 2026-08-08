import React from 'react';

const ArticuloBody = ({ extracto, descripcion }) => {
  const limpiarHTML = (html = "") => {
    return html
      .replace(/&nbsp;/g, " ")
      .replace(/<span>/gi, "")
      .replace(/<\/span>/gi, "")
      .replace(/<p><\/p>/gi, "");
  };

  const descripcionLimpia = limpiarHTML(descripcion);

  return (
    <>
      {extracto && (
        <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-white bg-[#000000] border-l-4 border-lime-500 rounded-r-xl px-8 py-8 mb-12 shadow-xl shadow-lime-500/5">
          {extracto}
        </p>
      )}
      
      <div 
        className="text-[18px] md:text-[19px] text-gray-300 leading-relaxed font-normal mb-20 [&_p]:mb-4 [&_strong]:text-white [&_strong]:font-semibold [&_em]:italic [&_em]:text-gray-200 [&_h1]:text-white [&_h1]:text-4xl [&_h1]:font-black [&_h1]:mt-10 [&_h1]:mb-6 [&_h2]:text-white [&_h2]:text-3xl [&_h2]:font-black [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-white [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_a]:text-lime-500 [&_a]:underline [&_a:hover]:text-lime-400 [&_a]:transition-colors [&_img]:rounded-xl [&_img]:mx-auto [&_img]:my-8 [&_img]:max-w-full [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-4 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-lime-500 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-6 [&_iframe]:rounded-xl [&_iframe]:my-8"
        dangerouslySetInnerHTML={{ __html: descripcionLimpia }}
      />
    </>
  );
};

export default ArticuloBody;