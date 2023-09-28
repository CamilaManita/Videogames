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
    const { name, description, released, rating, platforms, image, genres } =
    req.body;

  try {
    const newVideogame = await postVideogame(
      name,
      description,
      released,
      rating,
      platforms,
      image,
      genres
    );

    return res.status(200).json(newVideogame);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = { getAll, getId, postGame};