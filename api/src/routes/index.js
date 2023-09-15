const { Router } = require("express");
const gameRouter = require('./videogameRouter');
const genreRouter = require('./genreRouter');

const router = Router();

router.use("/game", gameRouter); //Todas las solicitudes que comiencen con lo que está en comillas seran manejadas por pokeRouter, lo mismo aplica a typeRouter
router.use("/genres", genreRouter);

module.exports = router;