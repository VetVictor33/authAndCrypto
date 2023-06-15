const monsterDataValidation = (req, res, next) => {
    const { name, skills } = req.body;

    if (!name || !skills) {
        const message = `Unable to add monster without:${!name ? ' name' : ''}${!skills ? ' skills' : ''}`
        return res.status(400).json({ message })
    }

    next();
}

module.exports = {
    monsterDataValidation
}