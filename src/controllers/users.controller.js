const bcrypt = require('bcrypt')
const { pool } = require("../database/conection")

const saltRounds = 10;

const postUser = async (req, res) => {
    const { name, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    try {
        await pool.query('INSERT INTO users (name, email, password) values ($1, $2, $3) returning *', [name, email, encryptedPassword]);
        return res.status(201).json({ message: 'New user registered' })
    } catch (error) {
        if (error?.code == 23505) {
            return res.status(400).json({ message: 'It is not possible to use this email, please try another one' })
        }
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    postUser
}