const { knex } = require("./conection");

async function getMonsterFromDb(userId, monsterId) {
    const queryWhere = monsterId ? { user_id: userId, "monsters.id": monsterId } : { user_id: userId };
    const response = await knex("monsters").where(queryWhere);
    return response
}

async function insertNewMosterOnDb(userId, newMoster) {
    const { name, skills, image, nickname } = newMoster;
    const response = await knex("monsters").insert({ user_id: userId, name, skills, image, nickname }).returning("*");
    return response
}

async function updateMonsterFromDb(field, newValue, userId, monsterId) {
    const response = await knex("monsters").update(field, newValue).where({ user_id: userId, id: monsterId }).returning("*");
    return response
}

async function deleteMonsterFromDb(userId, monsterId) {
    const response = await knex("monsters").del().where({ user_id: userId, id: monsterId });
    return response
}

module.exports = {
    getMonsterFromDb,
    insertNewMosterOnDb,
    updateMonsterFromDb,
    deleteMonsterFromDb
}