const { knex } = require("../database/conection");

const getMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    try {
        let monstersQuery;
        if (monsterId) {
            monstersQuery = await knex("monsters").where({ user_id: userId, "monsters.id": monsterId })
                .join('users', 'users.id', '=', 'monsters.user_id').select('monsters.*', 'users.name as user_name').debug();

        } else {
            monstersQuery = await knex('monsters').where({ user_id: userId }).
                join('users', 'users.id', '=', 'monsters.user_id').select('monsters.*', 'users.name as user_name');
        }

        if (monstersQuery.length < 1) return res.status(404).json({ message: `Looks like there is no monster${monsterId ? ` with id ${monsterId}` : ''}` })

        return res.json(monstersQuery)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const postMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { name, skills, image, nickname } = req.body;
    try {
        const newMoster = await knex("monsters").insert({ user_id: userId, name, skills, image, nickname }).returning("*");

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
        const updatedMonster = await knex("monsters").update(field, newValue).where({ user_id: userId, id: monsterId }).returning("*");

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
        const deletedMonster = await knex("monsters").del().where({ user_id: userId, id: monsterId });
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