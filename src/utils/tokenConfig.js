const jwt = require('jsonwebtoken');

function getToken(payloud) {
    return jwt.sign(payloud, process.env.JWT_SECRET, { expiresIn: '8h' });
}

module.exports = getToken