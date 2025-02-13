document.addEventListener("DOMContentLoaded", async function () {
    await cargarFields();
});

async function cargarFields() {
    try {
        let allFields = [];  
        let nextPageUrl = "https://digi-api.com/api/v1/field";
    
        while (nextPageUrl) {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
    
            allFields = allFields.concat(data.content.fields);  
    
 
            if (data.pageable.nextPage) {
                nextPageUrl = data.pageable.nextPage; 
            } else {
                nextPageUrl = null;  
            }
        }


        const contenedorDescription = document.getElementById("descriptionContainer");
        const levelsContainer = document.getElementById("levelsContainer");

        if (!contenedorDescription || !levelsContainer) {
            throw new Error("No se encontraron los contenedores");
        }


        contenedorDescription.innerHTML = "";
        levelsContainer.innerHTML = "";

        contenedorDescription.innerHTML = `
            <p>An Evolution Stage, also referred to as Level and Generation, is the level of development a Digimon is at</p>
        `;


        allFields.forEach(field => {
            const fieldLink = document.createElement('a');
            fieldLink.href = "#"; 
            fieldLink.classList.add("level-link");
            fieldLink.innerHTML = `<h4>${field.name}</h4>`;
        
            fieldLink.addEventListener("click", async (event) => {
                event.preventDefault();  // Evita que se siga el enlace
                try {
                    const response = await fetch(`${field.href}`);
                    const infofield = await response.json();
                    


                    Swal.fire({
                        title: field.name,
                        imageUrl: infofield.href, 
                        text: `${infofield.description || "No hay información disponible."}`,
                        icon: "info",
                        confirmButtonText: "Cerrar"
                    });
                    
                } catch (error) {
                    console.error("Error al cargar la información del campo", error);
                }
            });
        
            levelsContainer.appendChild(fieldLink); 
        });

    } catch (error) {
        console.error("Error cargando los fields:", error);
    }
}
