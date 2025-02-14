

document.addEventListener("DOMContentLoaded", function () {
    cargarTarjeta();
});

async function cargarTarjeta() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id)

    try {
        const response = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
        const digimon = await response.json();
        console.log(digimon)
        const contenedor = document.getElementById('mainBox');
        const contenedorPrE=document.getElementById('PrE')
    
    if (!contenedor) {
        throw new Error("No se encontró el contenedor");
    }


    contenedor.innerHTML = "";
    const card = document.createElement('div');
    card.classList.add('TarjetaProfile');
    card.setAttribute('data-tilt', '');
    card.innerHTML = `
    <img src="${digimon.images[0].href}" alt="${digimon.name}">
    `;

    const text = document.createElement('div');
    text.classList.add('textProfie');
    text.setAttribute('data-tilt', '');

    const type = document.createElement('div'); 
    type.classList.add('digiElements');
    const typeText = digimon.types?.[0]?.type ? `Type: ${digimon.types[0].type}` : "Type: Unknown";
    const attributeText = digimon.attributes?.[0]?.attribute ? `Attribute: ${digimon.attributes[0].attribute}` : "Attribute: Unknown";
    const levelText = digimon.levels?.[0]?.level ? `Level: ${digimon.levels[0].level}` : "Level: Unknown";
    type.innerHTML = `
    <p>${typeText}</p>
    <p>${attributeText}</p>
    <p>${levelText}</p>
    `;

    
    

    if (digimon.descriptions && digimon.descriptions[1] && digimon.descriptions[1].description) {
        
        text.innerHTML = `
            <p>${digimon.descriptions[1].description}</p>

        `;
    } else {
        text.innerHTML = `
            <p>I'm a fan made</p> 
        `;
    }

        // Div para evoluciones anteriores
        const priorEvolutionsDiv = document.createElement('div');
        priorEvolutionsDiv.classList.add('priorEvolutionsDiv');
        priorEvolutionsDiv.classList.add('row', 'd-flex', 'justify-content-center');
        const priorEvolutionsTitle = document.createElement('h4');
        priorEvolutionsTitle.innerText = "Previous Evolutions:";
        priorEvolutionsDiv.appendChild(priorEvolutionsTitle);

        if (digimon.priorEvolutions && digimon.priorEvolutions.length > 0) {
            digimon.priorEvolutions.forEach(evolution => {
                const evolutionCard = document.createElement('div');
                evolutionCard.classList.add('col-md-3');
                evolutionCard.classList.add('TarjetaProfile');
                evolutionCard.setAttribute('data-tilt', '');

                evolutionCard.innerHTML = `
                    <img src="${evolution.image}" alt="${evolution.digimon}">
                    <p>${evolution.digimon}</p>
                    <button class="aboutDigi" data-id="${evolution.id}">Learn More</button>
                `;

                priorEvolutionsDiv.appendChild(evolutionCard);
                const evolutionButton = evolutionCard.querySelector('.aboutDigi');
                evolutionButton.addEventListener('click', () => {
                    window.location.href = `/digimon.html?id=${evolution.id}`;
                });
            });
        } else {
            priorEvolutionsDiv.innerHTML += `<p>Este perro no tiene antecesor</p>`;
        }

    
    
    contenedor.appendChild(card);
    contenedor.appendChild(text);
    contenedor.appendChild(type);
    contenedorPrE.appendChild(priorEvolutionsDiv);
    const button = card.querySelector('.aboutDigi');
    


      // Necesito agregar esto para que la librerira de las tarjetas funcione
    VanillaTilt.init(document.querySelectorAll(".TarjetaProfile"));
    } catch (error) {
    console.error("Error cargando tarjetas:", error);
    }
}





