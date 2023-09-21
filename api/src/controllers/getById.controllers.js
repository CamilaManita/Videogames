require('dotenv').config();
const axios = require('axios');
const { API_URL, API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

const getById = async (id) => {
    if(!isNaN(id)){
        const result = (await axios.get(`${API_URL}/${id}?key=${API_KEY}`)).data;

        return {
            id: result.id,
            name: result.name,
            description: result.description,
            image: result.background_image,
            rating: result.rating,
            platforms: result.platforms.map((p) => {
                return { name: p.platform.name }
            }),
            genres: result.genres.map((g) => {
                return { name: g.name }
            }),
            released: result.released,
        }
    } else {
        const responseDB = await Videogame.findByPk(id, {
            include: [
                {
                  model: Genre,
                  attributes: ['name'],
                },
              ],
        })

        if (responseDB) {
            return {...responseDB.toJSON(),
            genres: responseDB.genres.map((genre) => ({ name: genre.name }))}
        }

        return 'No se encontro el videojuego';
    }
}

module.exports = getById;