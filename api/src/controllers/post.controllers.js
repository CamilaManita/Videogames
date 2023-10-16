const { Videogame, Genre } = require("../db");

const postVideogame = async (
  name,
  description,
  released,
  rating,
  platforms,
  image,
  created,
  genres
) => {
  if (
    !name ||
    !description ||
    !released ||
    !rating ||
    !platforms ||
    !image ||
    created === undefined ||
    !genres
  )
    throw new Error("There is not all the required information");

  const existVideogame = await Videogame.findOne({
    where: { name: name },
  });

  if (existVideogame)
    throw new Error(
      "The name of this videogame already exists, please try another name"
    );

  const genreIds = genres.map((genre) => genre.id);
  const existingGenres = await Genre.findAll({
    where: { id: genreIds },
  });

  const newVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
    image,
  });

  // Asocia los géneros al videojuego
  await newVideogame.addGenres(existingGenres);

  // Formatea la respuesta JSON
  // const formattedResponse = {
  //   name: newVideogame.name,
  //   description: newVideogame.description,
  //   image: newVideogame.image,
  //   rating: newVideogame.rating,
  //   platforms: newVideogame.platforms,
  //   genres: existingGenres.map((genre) => ({
  //     id: genre.id,
  //     name: genre.name,
  //   })),
  //   released: newVideogame.released,
  // };

  // return formattedResponse;
  return newVideogame;
};

module.exports = postVideogame;
