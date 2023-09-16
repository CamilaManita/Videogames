require("dotenv").config();
const axios = require('axios');
const { Genre } = require ('../db');
const { API_GENRES, API_KEY } = process.env;

const getGenres = async () => {
    const response = await axios.get(`${API_GENRES}?key=${API_KEY}`)

    const genresAPI = response.data.results;

    genresAPI.forEach((genre) => {
        Genre.findOrCreate({
            where: {
                name: genre.name
            }
        })
    })

    return 'genresCreated';
}

module.exports = getGenres;