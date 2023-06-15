const { pool } = require("../database/conection");

const getMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    try {
        let query;
        if (monsterId) {
            query = await pool.query('SELECT * FROM monsters WHERE user_id = $1 AND id = $2', [userId, monsterId]);
        } else {
            query = await pool.query('SELECT * FROM monsters WHERE user_id = $1', [userId]);
        }
        const monsters = query.rows;

        if (query.rowCount < 1) return res.status(404).json({ message: `Looks like there is no monster${monsterId ? ` with id ${monsterId}` : ''}` })

        return res.json({ monsters })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const postMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { name, skills, image, nickname } = req.body;
    try {
        const query = await pool.query(
            "INSERT INTO monsters (user_id, name, skills, image, nickname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, name, skills, image || null, nickname || null]);

        const monster = query.rows[0];

        res.status(201).json({ monster });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const patchMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;
    const { field } = req.params;
    const { newValue } = req.body

    try {
        const query = await pool.query(`UPDATE monsters SET ${field}=$1 WHERE user_id=$2 AND id = $3 RETURNING *`, [newValue, userId, monsterId]);

        if (query.rowCount < 1) return res.status(404).json({ message: "Monster not found" })

        const monster = query.rows[0];
        return res.json({ monster })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteMonster = async (req, res) => {
    const { id: userId } = req.user;
    const { monsterId } = req.params;

    try {
        const { rowCount } = await pool.query('DELETE FROM monsters WHERE user_id=$1 AND id = $2', [userId, monsterId]);

        if (rowCount < 1) return res.status(404).json({ message: `There are no monster with id ${monsterId}` });

        return res.json({ message: "Monster succesfully removed" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getMonster,
    postMonster,
    patchMonster,
    deleteMonster
}