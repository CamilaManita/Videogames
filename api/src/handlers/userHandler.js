const { User } = require('../db');
const { validationEmail, validationPassword } = require('../validations/validations');

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

const userRegister = async (req,res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'username and password are required' });
        }

        if (!validationEmail(email) || !validationPassword(password)) {
            return res.status(400).json({ error: 'email or password entered are incorrect' })
        }

        const findUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (findUser) {
            return res.status(400).json({ error: 'the username already exists'})
        }

        const user = await User.create({
            email, password
        });

        if (!user) {
            return res.status(404).json({ error: 'the user could not be created'})
        }

        return res.status(200).json({ user: 'registered user successfully'});
    } catch (error) {
        return res.status(error.errors[0].type).json({ error: error.message });
    }
}