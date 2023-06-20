const jwt = require('jsonwebtoken');
const { knex } = require('../database/conection');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];
        const userToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = userToken;

        // const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const userFromDb = await knex("users").where({ id }).first();
        const { password: _, ...user } = userFromDb;
        req.user = user;
        next()

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = {
    tokenValidation
}