const { Genre, Videogame } = require('../db');

const getAllGames = require("../controllers/getVideogames.controllers");
const getByName = require("../controllers/getByName.controller");
const getById = require("../controllers/getById.controllers");
const postVideogame = require("../controllers/post.controllers")

const getAll = async (req, res) => {
    const { name } = req.query;
  try {
    if (!name) {
      const response = await getAllGames();
      return res.status(200).json(response);
    }

    const videogames = await getByName(name);

    if (videogames.length === 0) {
      return res.status(404).json({ message: "No se encontraron videojuegos" });
    }

    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(500).send(error.message);
  }
} 

const getId = async (req, res) => {
    const { id } = req.params;
    try {
      const game = await getById(id);
      return res.status(200).json(game);
    } catch (error) {
      return res.status(400).send(error.message);
    }
}

const postGame = async (req, res) => {
    const { name, description, released, rating, platforms, image, created, genres } =
    req.body;

  try {
    const newVideogame = await postVideogame(
      name,
      description,
      released,
      rating,
      platforms,
      image,
      created,
      genres
    );

    return res.status(200).json(newVideogame);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

const updateVideogame = async (req, res) => {
  const { name, description, platforms, released, rating, image, created, genres} = req.body
  const { id } = req.params

  try {
    const updatedVideogame = await Videogame.update(
      { name, description, platforms, released, rating, image, created, genres },
      {
        where: {id}
      }
    );

    if (updatedVideogame[0] === 0) {
      return res.status(404).json('videogame not found')
    }

    const genreNames = await Genre.findAll({
      where: {
        name: genres
      }
    })

    const videogame = await Videogame.findByPk(id);
    await videogame.setGenres(genreNames);

    res.status(200).json({
      message: 'Videogame successfully updated'
    })
  } catch (error) {
    res.status(400).send({ error: error.message})
  }
}

const deleteVideogame = async (req, res) => {
  const { id } = req.params;

  try {
    await Videogame.destroy({ where: {id} })

    res.json({
      message: 'Game successfully deleted'
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAll, getId, postGame, updateVideogame, deleteVideogame};
