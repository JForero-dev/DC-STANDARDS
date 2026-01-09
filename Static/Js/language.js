const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    // window.location.origin siempre apunta a la base del proyecto (donde está tu index.html original)
    const origin = window.location.origin;
    const currentPath = window.location.pathname;
    
    // Obtener el nombre del archivo (ej: enIndex.html)
    let fileName = currentPath.split("/").pop();
    if (!fileName || fileName === "") fileName = "index.html";

    if (currentPath.includes("Translate/")) {
        // --- ESTÁS EN INGLÉS Y QUIERES IR A LA RAÍZ (ESPAÑOL) ---
        
        // 1. Quitar el "en" inicial: enIndex.html -> Index.html
        let originalName = fileName.replace(/^en/, "");
        
        // 2. Primera letra a minúscula: Index.html -> index.html
        originalName = originalName.charAt(0).toLowerCase() + originalName.slice(1);
        
        // 3. CONSTRUIR RUTA FINAL: Base del sitio + nombre del archivo
        // Esto te saca de /Tempaltes/Translate/ automáticamente
        window.location.href = `${origin}/${originalName}`;
        
    } else {
        // --- ESTÁS EN ESPAÑOL Y QUIERES IR A LA CARPETA TRANSLATE ---
        const capitalized = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const englishFile = "en" + capitalized;
        
        window.location.href = `${origin}/Templates/Translate/${englishFile}`;
    }
});