const { Router } = require('express');

const gameRouter = Router();

const getAllGames = require('../controllers/getVideogames.controllers');
const getByName = require('../controllers/getByName.controller')

gameRouter.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            const response = await getAllGames();
            return res.status(200).json(response);
        }

        const videogames = await getByName(name);

        if (videogames.length === 0) {
            return res.status(404).json({ message: "No se encontraron videojuegos" });
        }

        return res.status(200).json(videogames);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = gameRouter;