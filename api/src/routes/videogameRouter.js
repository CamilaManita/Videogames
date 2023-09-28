const { Router } = require("express");
const { getAll, getId, postGame } = require('../handlers/videogameHandler');

const gameRouter = Router();

gameRouter.get("/", getAll);
gameRouter.get("/:id", getId);
gameRouter.post("/", postGame);

module.exports = gameRouter;