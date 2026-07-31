export const limpiarHTML = (html = "") => {
  if (!html) return "";
  
  return html
    // Elimina espacios duros que arruinan la adaptabilidad en móviles
    .replace(/&nbsp;/g, " ")
    
    // Elimina cualquier atributo style (ej: style="color: black;")
    .replace(/\sstyle="[^"]*"/gi, "")
    
    // Elimina spans vacíos o que solo traían estilos
    .replace(/<span>/gi, "")
    .replace(/<\/span>/gi, "")
    
    // Elimina párrafos completamente vacíos que dejan espacios gigantes
    .replace(/<p><\/p>/gi, "");
};