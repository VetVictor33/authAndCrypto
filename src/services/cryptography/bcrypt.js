const bcrypt = require('bcrypt')
const saltRounds = 10;

async function encrypPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword
}

async function checkPasswordHash(password, hash) {
    const response = await bcrypt.compare(password, hash);
    return response
}

module.exports = {
    encrypPassword,
    checkPasswordHash
}