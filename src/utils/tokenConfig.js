const jwt = require('jsonwebtoken');

function getToken(payloud) {
    return jwt.sign(payloud, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = getToken