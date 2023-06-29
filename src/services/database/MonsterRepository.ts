import { Monster } from "../../interfaces/costumInterfaces";
import db from "./conection";

export default abstract class MonsterRepository {
    static async get(userId: number, monsterId: number)/*: Promise<Monster>*/ {
        const queryWhere = monsterId ? { user_id: userId, "monsters.id": monsterId } : { user_id: userId };
        const response = await db("monsters").where(queryWhere)
            .join('users', 'users.id', '=', 'monsters.user_id').select('users.name as owner', 'monsters.*');
        return response
    }

    static async insert(userId: number, newMoster: Monster) /*:Promise<Monster>*/ {
        const { name, skills, image, nickname } = newMoster;
        const response = await db("monsters").insert({ user_id: userId, name, skills, image, nickname }).returning("*");
        return response
    }

    static async update(field: string, newValue: string, userId: number, monsterId: number) /*:Promise<Monster>*/ {
        const response = await db("monsters").update(field, newValue).where({ user_id: userId, id: monsterId }).returning("*");
        return response
    }

    static async delete(userId: number, monsterId: number) {
        const response = await db("monsters").del().where({ user_id: userId, id: monsterId });
        return response
    }
}