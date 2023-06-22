const { registerNewUserOnDb, loginUser } = require("../services/database/users.repository");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerNewUserOnDb({ name, email, password });
        return res.status(201).json({
            message: 'New user registered'
        })
    } catch (error) {
        if (error?.code == 23505) {
            return res.status(400).json({
                message: 'It is not possible to use this email, please try another one'
            })
        }
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const login = await loginUser({ email, password });
        if (!login) return res.status(400).json({ message: 'Credentials do not match' });

        return res.json(login)
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    signup,
    signin
}