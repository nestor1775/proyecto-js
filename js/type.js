document.addEventListener("DOMContentLoaded", async function () {
    await cargarLevels();
});

async function cargarLevels() {
    try {
        let allLevels = []; 
        let nextPageUrl = "https://digi-api.com/api/v1/type";
    
        while (nextPageUrl) {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
    

            allLevels = allLevels.concat(data.content.fields);
    
            
            nextPageUrl = null; 

            if (data.pageable.nextPage) {
                nextPageUrl = data.pageable.nextPage; // Asigna el valor de nextPage si existe
}
        }

        const contenedorDescription = document.getElementById("descriptionContainer");
        const levelsContainer = document.getElementById("levelsContainer");

        if (!contenedorDescription || !levelsContainer) {
            throw new Error("problemitas");
        }


        contenedorDescription.innerHTML = "";
        levelsContainer.innerHTML = "";


        contenedorDescription.innerHTML = `
            <p>"A Digimon's Type indicates what sort of category a Digimon's specific species belongs to. Many of these simply indicate what a Digimon is based on and only come into play under certain situations - some Digimon may have a certain advantage or disadvantage to a Digimon of another type. Or an item will work on a Digimon of one type or not the other."</p> <br>
        `;

        allLevels.forEach(level => {
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
                        text: `${infolevel.description || "La api tiene el campo de descripcion, pero todos estan vacios. lo dejo aqui para explicarlo"}`,
                        icon: "info",
                        confirmButtonText: "Cerrar"
                    });
                    
                } catch (error) {
                    console.error("Error");
                }
            });
        
            levelsContainer.appendChild(levelLink);
        });

    } catch (error) {
        console.error(error);
    }
}
