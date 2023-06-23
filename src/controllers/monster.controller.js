const message = require('../utils/response.messages');
const { getMonsterFromDb, insertNewMosterOnDb, updateMonsterFromDb, deleteMonsterFromDb } = require("../services/database/monster.repository");

const getMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    try {
        const monstersQuery = await getMonsterFromDb(userId, monsterId);

        if (monstersQuery.length < 1) return res.status(404).json({
            message: message.noMosterFound
        })

        return res.json(monstersQuery)
    } catch (error) {
        return res.status(500).json({ message: message.internalServerError })
    }
}

const postMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { name, skills, image, nickname } = req.body;
    try {
        const newMoster = await insertNewMosterOnDb(userId, { name, skills, image, nickname })

        res.status(201).json(newMoster);
    } catch (error) {
        res.status(500).json({ message: message.internalServerError })
    }
}

const patchMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    const { field } = req.params;
    const { newValue } = req.body;

    try {
        const updatedMonster = await updateMonsterFromDb(field, newValue, userId, monsterId);

        if (updatedMonster.length === 0) return res.status(404).json({
            message: message.monsterNotFound
        });

        return res.json(updatedMonster)
    } catch (error) {
        return res.status(500).json({ message: message.internalServerError });
    }
}

const deleteMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;

    try {
        const deletedMonster = await deleteMonsterFromDb(userId, monsterId);
        if (deletedMonster === 0) return res.status(404).json({ message: message.monsterNotFound });

        return res.json({ message: message.succesfullyRemovedMoster })
    } catch (error) {
        return res.status(500).json({ message: message.internalServerError });
    }
}

module.exports = {
    getMonster,
    postMonster,
    patchMonster,
    deleteMonster
}