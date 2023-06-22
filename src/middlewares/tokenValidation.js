const jwt = require('jsonwebtoken');
const { knex } = require('../database/conection');

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.split(' ')[1];
        const userToken = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = userToken;

        const userFromDb = await knex("users").where({ id }).first();
        const { password: _, ...user } = userFromDb;
        req.user = user;
        next()

    } catch (error) {
        const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
        return res.status(401).json({ message })
    }
}

module.exports = {
    tokenValidation
}