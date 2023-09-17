const { Videogame } = require('../db');

const postVideogame = async (
  name,
  description,
  platforms,
  image,
  releaseDate,
  rating,
  genres
) => {
  return await Videogame.create({
    name,
    description,
    platforms,
    image,
    releaseDate,
    rating,
    genres,
  });
}

module.exports = postVideogame;