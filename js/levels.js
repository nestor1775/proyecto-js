document.addEventListener("DOMContentLoaded", async function () {
    await cargarLevels();
});

async function cargarLevels() {
    try {
        const response = await fetch("https://digi-api.com/api/v1/level");
        const data = await response.json();
  
        const contenedorDescription = document.getElementById("descriptionContainer");
        const levelsContainer = document.getElementById("levelsContainer");

        if (!contenedorDescription) {
            throw new Error("No se encontró descriptionContainer");
        }

        contenedorDescription.innerHTML = "";
        levelsContainer.innerHTML= "";

        contenedorDescription.innerHTML = `
            <p>${data.content.description}</p>
        `;

        data.content.fields.forEach(level => {
            const levelLink = document.createElement('a');
            levelLink.href = "#"; 
            levelLink.classList.add("level-link");
            levelLink.innerHTML = `<h4>${level.name}</h4>`;
        
            levelLink.addEventListener("click", async (event) => {
                event.preventDefault(); 
                try {
                    const response = await fetch(`${level.href}`);
                    const infolevel = await response.json();
                    
                    Swal.fire({
                        title: level.name,
                        text: `${infolevel.description}`,
                        icon: "info",
                        confirmButtonText: "Cerrar"
                });
                    
                } catch (error) {
                    
                }
                
            });
        
            levelsContainer.appendChild(levelLink);
        });





        contenedor.appendChild(levelCard);
    } catch (error) {
        console.error("Error cargando niveles:", error);
    }
}
