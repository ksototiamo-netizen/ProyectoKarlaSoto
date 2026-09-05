//Selectores de elementos del DOM
const btnCargar = document.querySelector('#btn-cargar');
const travelerContainer = document.querySelector('#traveler-container');
const formTraveler = document.querySelector('#form-traveler');
const searchIdInput = document.querySelector('#search-id');
const btnBuscar = document.querySelector('#btn-buscar');

const API_URL = 'http://localhost:3000/api/travelers';

// Función para obtener los viajeros desde la API y mostrarlos en el contenedor
const obtenerTraveler = async () => {
    try {
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
                <p><strong>Visión:</strong> ${user.vision || 'Anemo'}</p>
                <p><strong>Arma:</strong> ${user.weapon || 'Sword'}</p>
                <p><strong>Rango:</strong> Aventurero Registrado</p>
                <button class="btn-delete" data-id="${user.id}">Eliminar</button>
            `;
            travelerContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error al consultar a la API', error);
        travelerContainer.innerHTML = '<p style="color: #ff6b6b;">Error al cargar la lista de aventureros. Inténtalo de nuevo.</p>';
    }
};

btnCargar.addEventListener('click', obtenerTraveler);

// Función para registrar un nuevo viajero mediante el formulario
formTraveler.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('#name').value.trim();
    const emailInput = document.querySelector('#email').value.trim();
    const visionInput = document.querySelector('#vision').value;
    const weaponInput = document.querySelector('#weapon').value;

    if (!nameInput || !emailInput || !visionInput || !weaponInput) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput,
                email: emailInput,
                vision: visionInput,
                weapon: weaponInput
            })
        });

        if (response.ok) {
            const newTraveler = await response.json();

            const newCard = document.createElement('div');
            newCard.classList.add('traveler-card');
            newCard.style.borderLeftColor = '#4ecdc4';
            
            newCard.innerHTML = `
            <h3>✨ ${nameInput} (Nuevo)</h3>
            <p><strong>Contacto:</strong> ${emailInput}</p>
            <p><strong>Visión:</strong> ${visionInput || 'Anemo'}</p>
            <p><strong>Arma:</strong> ${weaponInput || 'Sword'}</p>
            <p><strong>Rango:</strong> Novato del Gremio</p>
            <button class="btn-delete" data-id="${newTraveler.id}">Eliminar</button>
            `;
            
            travelerContainer.prepend(newCard);
            formTraveler.reset();
        }else {
            console.error('Error al registrar al aventurero', response.statusText);
        }

        
    } catch (error) {
        console.error('Error al crear el aventurero', error);
    }
});

// Buscar aventurero por ID
const buscarTravelerPorId = async () => {
    const id = searchIdInput.value.trim();

    if (!id) {
        obtenerTraveler(); 
        return;
    }

    try {
        travelerContainer.innerHTML = `<p style="color: #c8a051;">Buscando expediente #${id}...</p>`;
        const response = await fetch(`${API_URL}/${id}`);

        if (response.ok) {
            const user = await response.json();
            travelerContainer.innerHTML = '';

            const card = document.createElement('div');
            card.classList.add('traveler-card');

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Contacto:</strong> ${user.email}</p>
                <p><strong>Visión:</strong> ${user.vision || 'Anemo'}</p>
                <p><strong>Arma:</strong> ${user.weapon || 'Sword'}</p>
                <p><strong>Rango:</strong> Aventurero Registrado</p>
                <button class="btn-delete" data-id="${user.id}">Eliminar</button>
            `;
            
            travelerContainer.appendChild(card);
        } else if (response.status === 404) {
            travelerContainer.innerHTML = `<p style="color: #ff6b6b;">No se encontró ningún aventurero con el ID #${id}.</p>`;
        } else {
            console.error('Error en la búsqueda:', response.statusText);
        }
    } catch (error) {
        console.error('Error al buscar aventurero:', error);
        travelerContainer.innerHTML = '<p style="color: #ff6b6b;">Error al realizar la búsqueda.</p>';
    }
};
btnBuscar.addEventListener('click', buscarTravelerPorId);

//Funcion para eliminar un aventurero
travelerContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');
        const cardElement = event.target.closest('.traveler-card');

        if (!confirm(`¿Estás seguro de dar de baja al aventurero con ID ${id}?`)) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                cardElement.remove();
            } else {
                console.error('No se pudo eliminar el registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar aventurero:', error);
        }
    }
});
