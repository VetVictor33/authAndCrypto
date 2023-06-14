const signinVaidation = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const message = `Unable to siging without:${!name ? ' name' : ''}${!email ? ' email' : ''}${!password ? ' password' : ''}`
        return res.status(400).json({ message })
    }

    next()
}

module.exports = signinVaidation 