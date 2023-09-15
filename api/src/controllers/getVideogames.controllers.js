const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_URL, API_KEY } = process.env;

const getAllGames = async () => {
  const dbVGames = await Videogame.findAll({
    attributes: ["id", "name", "image", "rating"],
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const urls = [];
  for (let i = 1; i <= 5; i++) {
    urls.push(axios.get(`${API_URL}?${API_KEY}&page=${i}`));
  }
  const axiosAllResponses = await Promise.all(urls);
  const apiVGames = axiosAllResponses
    .map((r) => r.data.results)
    .flat()
    .map((vg) => {
      return {
        id: vg.id,
        name: vg.name,
        image: vg.background_image,
        rating: vg.rating,
        genres: vg.genres.map((g) => {
          return { name: g.name };
        }),
      };
    });
  const allGames = [...dbVGames, ...apiVGames].slice(0, 100);
  console.log(allGames.length);

  return allGames;
};

module.exports = getAllGames;