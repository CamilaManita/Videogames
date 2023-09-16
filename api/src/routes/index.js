const { Router } = require("express");
const gameRouter = require('./videogameRouter');
const genreRouter = require('./genreRouter');

const router = Router();

router.use("/games", gameRouter);
router.use("/genres", genreRouter);

module.exports = router;