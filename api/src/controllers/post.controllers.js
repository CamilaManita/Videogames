const { Videogame } = require('../db');

const postVideogame = async ( name, description, platforms, image, releaseDate, rating, genres ) => {
  if ( !name || !description || !platforms || !image || !releaseDate || !rating || !genres )

  throw new Error('There is not all the required information');

  const existVideogame = await Videogame.findOne({
    where: { name: name }
  });

  if (existVideogame) throw new Error("The name of this videogame already exists, please try another name");

  const newVideogame = await Videogame.create({
    name, description, platforms, image, releaseDate, rating
  });

  await newVideogame.addGenres(genres);

  return newVideogame;
}

module.exports = postVideogame;