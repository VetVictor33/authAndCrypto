const { knex } = require("./conection");
const { encrypPassword, checkPasswordHash } = require('../cryptography/bcrypt');
const getToken = require("../../utils/tokenConfig");

async function registerNewUserOnDb({ name, email, password }) {
    const hashedPassword = await encrypPassword(password);
    await knex("users").insert({ name, email, password: hashedPassword });
    return
}

async function loginUser({ email, password }) {
    const userFromDb = await knex("users").where({ email }).first();
    if (!userFromDb) return false

    const { password: hash, ...user } = userFromDb;
    const isPasswordCorrect = await checkPasswordHash(password, hash);
    if (!isPasswordCorrect) return false

    const token = getToken({ id: user.id })

    return { token, user }
}

module.exports = {
    registerNewUserOnDb,
    loginUser
}