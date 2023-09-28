const { Router } = require("express");
const gameRouter = require('./videogameRouter');
const genreRouter = require('./genreRouter');
const userRouter = require('./userRouter');

const router = Router();

router.use("/games", gameRouter);
router.use("/genres", genreRouter);
router.use('/user', userRouter);

module.exports = router;