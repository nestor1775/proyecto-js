document.addEventListener("DOMContentLoaded", function () {
    cargarTarjetas();
});

async function cargarTarjetas() {
    try {
        const response = await fetch('https://digi-api.com/api/v1/digimon?pageSize=15');
        const data = await response.json();
    
        const contenedor = document.getElementById('tarjetasDigi');
    
    if (!contenedor) {
        throw new Error("No se encontró el contenedor");
    }

    contenedor.innerHTML = "";

    data.content.forEach(digimon => {
        const card = document.createElement('div');
        card.classList.add('Tarjeta');
        card.setAttribute('data-tilt', '');
        
        card.innerHTML = `
        <img src="${digimon.image}" alt="${digimon.name}">
        <p>${digimon.name}</p>
        <button class="aboutDigi" data-id="${digimon.id}" >Aprende sobre mí</button>
        
        `;
        
        contenedor.appendChild(card);
        const button = card.querySelector('.aboutDigi');
        button.addEventListener('click', () => {
            window.location.href = `/digimon.html?id=${digimon.id}`;;
        });
    });


      // Necesito agregar esto para que la librerira de las tarjetas funcione
    VanillaTilt.init(document.querySelectorAll(".Tarjeta"));
    } catch (error) {
    console.error("Error cargando tarjetas:", error);
    }
}




