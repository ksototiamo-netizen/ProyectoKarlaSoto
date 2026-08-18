const btnCargar = document.querySelector('#btn-cargar');
const travelerContainer = document.querySelector('#traveler-container');
const formTraveler = document.querySelector('#form-traveler');

const obtenerTraveler = async () => {
    try {
        const API_URL = "https://jsonplaceholder.typicode.com/users";
        travelerContainer.innerHTML = '<p style= "color: #c8a051;">Consultando los registros de Katherynr...</p>'; 
        const answer = await fetch (API_URL);
        const users = await answer.json();
        travelerContainer.innerHTML = '';

        for (let user of users){
            const card = document.createElement ('div');
            card.classList.add('traveler-card');

            card.innerHTML = `
                <h3> ${user.name}</h3>
                <p><strong>Contacto:</strong> ${user.email}</p>
                <p><strong>Rango:</strong> Aventurero Registrado</p>
            `;
            travelerContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error al consultar a la API', error);
        travelerContainer.innerHTML = '<p style="color: #ff6b6b;">Error al cargar la lista de aventureros. Inténtalo de nuevo.</p>';
    }
};

btnCargar.addEventListener('click', obtenerTraveler);

formTraveler.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#name').value.trim();
    const emailInput = document.querySelector('#email').value.trim();

    if (!nameInput || !emailInput) return;

    const newCard = document.createElement('div');
    newCard.classList.add('traveler-card');
    newCard.style.borderLeftColor = '#4ecdc4';

    newCard.innerHTML = `
        <h3>✨ ${nameInput} (Nuevo)</h3>
        <p><strong>Contacto:</strong> ${emailInput}</p>
        <p><strong>Rango:</strong> Novato del Gremio</p>
    `;

    travelerContainer.prepend(newCard);

    formTraveler.reset();

});

