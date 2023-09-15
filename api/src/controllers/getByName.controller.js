const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_URL, API_KEY } = process.env;
const { Op } = require("sequelize");

const getByName = async (name) => {
  const foundDbVGames = await Videogame.findAll({
    attributes: ["id", "image", "name"],
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  const axiosResponse = await axios.get(
    `${API_URL}/games?key=${API_KEY}&search=${name}`
  );
  const foundApiVGames = axiosResponse.data.results.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      image: vg.background_image,
      genres: vg.genres.map((g) => {
        return { name: g.name };
      }),
    };
  });

  const foundVGames = [...foundDbVGames, ...foundApiVGames].slice(0, 15);
  return foundVGames;
};

module.exports = getByName;