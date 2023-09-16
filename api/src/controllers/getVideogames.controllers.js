require("dotenv").config();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_URL, API_KEY } = process.env;

const getAPIGames =  async () => {
  const urls = [];
  
  for(let i = 1; i <= 5; i++){
    urls.push(axios.get(`${API_URL}?key=${API_KEY}&page=${i}`))
  }
  
  const gamesDetail = await Promise.all(urls);
  
  const gamesAPI = gamesDetail
    .map((r) => r.data.results)
    .flat()
    .map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((genre) => {
          return { name: genre.name }
        })
      }
    });

  return gamesAPI;

}

const getDBGames = async () => {
  const gamesDB = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })

  const gamesDBMap = gamesDB.map((game) => ({
    ...game.toJSON(),
    genres: game.genres.map((genre) => genre.name)
  }))

  return gamesDBMap;
}

const getAllGames = async () => {
  const gamesAPI = await getAPIGames();
  const gamesDB = await getDBGames();

  const allGames = [...gamesDB, ...gamesAPI];

  return allGames;
};

module.exports = getAllGames;