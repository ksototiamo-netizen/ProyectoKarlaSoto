// Arreglo de datos iniciales declarado directamente en el controlador
let travelers = [
    { id: 0, name: "Skirk", email: "skirk@teyvat.com", vision: "Cryo", weapon: "Sword" },
    { id: 1, name: "Colombina ", email: "colombina@teyvat.com", vision: "Hydro", weapon: "Catalyst" },
    { id: 2, name: "Sandrone", email: "sandrone@teyvat.com", vision: "Cryo", weapon: "Claymore" },
    { id: 3, name: "Odette", email: "odette@teyvat.com", vision: "Cryo", weapon: "Sword" },
    { id: 4, name: "Zhongli", email: "zhongli@teyvat.com", vision: "Geo", weapon: "Polearm" },
    { id: 5, name: "Alhaitham", email: "alhaitham@teyvat.com", vision: "Dendro", weapon: "Sword" },
    { id: 6, name: "Neuvillette", email: "neuvillette@teyvat.com", vision: "Hydro", weapon: "Catalyst" },
    { id: 7, name: "Flins", email: "flins@teyvat.com", vision: "Electro", weapon: "Polearm" }
];

// A partir de aquí van tus funciones (GET, POST, PUT, DELETE)...
//Get all travelers
export const getTravelers = (req, res) => {
    res.json(travelers);
};

//Get traveler by id
export const getTravelerById = (req, res) => {
    const travelerId = parseInt(req.params.id);
    const traveler = travelers.find(t => t.id === travelerId);

    if (!traveler) {
        return res.status(404).json({ message: "Traveler not found" });
    }
    res.status(200).json(traveler);
};

//Post a new traveler
export const createTraveler = (req, res) => {
    const { name, email, vision, weapon } = req.body;

    if (!name || !email ) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newTraveler = {
        id: travelers.length ? Math.max(...travelers.map(t => t.id)) + 1 : 0,
        name,
        email,
        vision,
        weapon
    };

    travelers.push(newTraveler);
    res.status(201).json(newTraveler);
};

//Put (update) a traveler
export const updateTraveler = (req, res) => {
    const travelerId = parseInt(req.params.id);
    const { name, email, vision, weapon } = req.body;
    const index = travelers.findIndex(t => t.id === travelerId);

    if (index === -1) {
        return res.status(404).json({ message: "Traveler not found" });
    }

    travelers[index] = { ...travelers[index], name, email, vision, weapon };
    res.status(200).json(travelers[index]);
};

//Delete a traveler
export const deleteTraveler = (req, res) => {
    const travelerId = parseInt(req.params.id);
    const index = travelers.findIndex(t => t.id === travelerId);

    if (index === -1) {
        return res.status(404).json({ message: "Traveler not found" });
    }

    travelers.splice(index, 1);
    res.status(200).json({ message: "Traveler deleted successfully" });
};
