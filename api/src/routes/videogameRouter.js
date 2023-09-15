const { Router } = require('express');

const gameRouter = Router();

const getAllVideogames = require('../controllers/getVideogames.controllers');

gameRouter.get('/', async (req, res) => {
    const {name} = req.query;
    try {
        if(!name) {
            const response = await getAllVideogames();
            return res.status(200).json(response)
        }

        const videogame = await getByName(name);
        return res.status(500).json(videogame)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = gameRouter;