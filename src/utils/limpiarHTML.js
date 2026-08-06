export const limpiarHTML = (html = "") => {
  if (!html) return "";
  
  return html
    // Elimina espacios duros que arruinan la adaptabilidad en móviles
    .replace(/&nbsp;/g, " ")
    
    // Elimina párrafos completamente vacíos que dejan espacios gigantes
    .replace(/<p><\/p>/gi, "");
    
    // NOTA: Ya no eliminamos los estilos (style="") ni las etiquetas <span> 
    // para que el colaborador pueda centrar textos, poner colores y tamaños en el editor.
};