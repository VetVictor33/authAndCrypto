const signupVaidation = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const message = `Unable to signup without:${!name ? ' name' : ''}${!email ? ' email' : ''}${!password ? ' password' : ''}`
        return res.status(400).json({ message })
    }

    next();
}

const signinValidation = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const message = `Unable to siging without:${!email ? ' email' : ''}${!password ? ' password' : ''}`
        return res.status(400).json({ message })
    }

    next();
}

module.exports = {
    signupVaidation,
    signinValidation
} 