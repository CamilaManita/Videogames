const { Genre } = require('../db');
const getGenre = require('../controllers/getGenres.controllers');

const genres = async (req, res) => {
    try {
        await getGenre();
        const response = await Genre.findAll();
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send('Error al obtener los generos')
    }
}

module.exports = { genres };