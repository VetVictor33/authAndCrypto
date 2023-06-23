const message = require('../utils/response.messages');
const { registerNewUserOnDb, loginUser } = require("../services/database/users.repository");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerNewUserOnDb({ name, email, password });
        return res.status(201).json({
            message: message.successfullyAddUser
        })
    } catch (error) {
        if (error?.code == 23505) {
            return res.status(400).json({
                message: message.emailNotAccepted
            })
        }
        return res.status(500).json({
            message: message.internalServerError
        })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const login = await loginUser({ email, password });
        if (!login) return res.status(400).json({ message: message.failedToLogIn });

        return res.json(login)
    } catch (error) {
        return res.status(500).json({
            message: message.internalServerError
        })
    }
}

module.exports = {
    signup,
    signin
}