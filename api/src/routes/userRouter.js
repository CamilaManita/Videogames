const { Router } = require('express');
const { userLogin, userRegister } = require('../handlers/userHandler');

const userRouter = Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

module.exports = userRouter;