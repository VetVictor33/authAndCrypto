const bcrypt = require('bcrypt')
const { pool } = require("../database/conection");
const getToken = require('../utils/tokenConfig');

const saltRounds = 10;

const postUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3)', [name, email, encryptedPassword]);
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

const postSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (response.rowCount < 1) return res.status(400).json({ message: 'Credentials do not match the database' });

        const { password: hashedPassword, ...user } = response.rows[0];

        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Credentials do not match the database' });

        const token = getToken({ id: user.id })

        return res.json({ token, user })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    postUser,
    postSignin
}