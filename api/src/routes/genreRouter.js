const { Router } = require('express');
const { genres } = require('../handlers/genreHandler'); 

const genreRouter = Router();

genreRouter.get('/', genres )

module.exports = genreRouter;