const { getMonsterFromDb, insertNewMosterOnDb, updateMonsterFromDb, deleteMonsterFromDb } = require("../services/database/monster.repository");

const getMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    try {
        const monstersQuery = await getMonsterFromDb(userId, monsterId);

        if (monstersQuery.length < 1) return res.status(404).json({
            message: `Looks like there is no monster${monsterId ? ` with id ${monsterId}` : ''}`
        })

        return res.json(monstersQuery)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const postMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { name, skills, image, nickname } = req.body;
    try {
        const newMoster = await insertNewMosterOnDb(userId, { name, skills, image, nickname })

        res.status(201).json(newMoster);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const patchMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    const { field } = req.params;
    const { newValue } = req.body;

    try {
        const updatedMonster = await updateMonsterFromDb(field, newValue, userId, monsterId);

        if (updatedMonster.length === 0) return res.status(404).json({ message: "Monster not found" });

        return res.json(updatedMonster)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;

    try {
        const deletedMonster = await deleteMonsterFromDb(userId, monsterId);
        if (deletedMonster === 0) return res.status(404).json({ message: `There are no monster with id ${monsterId}` });

        return res.json({ message: "Monster succesfully removed" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getMonster,
    postMonster,
    patchMonster,
    deleteMonster
}