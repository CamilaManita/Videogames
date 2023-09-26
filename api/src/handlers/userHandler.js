const { User } = require('../db');

const createUser = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({
        where: {
            email: email
        }
    })

    if (findUser) {
        return res.status(400).json({ error: 'The username already exists'});
    }

    const user = await User.create({
        email, password
    })

    if (!user) {
        return res.status(400).json({ error: 'The user could not be created'})
    }
}