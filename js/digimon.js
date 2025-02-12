

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
        const contenedor = document.getElementById('tarjetasDigi');
    
    if (!contenedor) {
        throw new Error("No se encontró el contenedor");
    }

    

    contenedor.innerHTML = "";
    const card = document.createElement('div');
    card.classList.add('Tarjeta');
    card.setAttribute('data-tilt', '');
    
    card.innerHTML = `
    <img src="${digimon.images[0].href}" alt="${digimon.name}">
    <p>${digimon.name}</p>
    <button class="aboutDigi" data-id="${digimon.id}" >Aprende sobre mí</button>
    
    `;
    
    contenedor.appendChild(card);
    const button = card.querySelector('.aboutDigi');
    button.addEventListener('click', () => {
    window.location.href = `/digimon.html?id=${digimon.id}`;

    });


      // Necesito agregar esto para que la librerira de las tarjetas funcione
    VanillaTilt.init(document.querySelectorAll(".Tarjeta"));
    } catch (error) {
    console.error("Error cargando tarjetas:", error);
    }
}





