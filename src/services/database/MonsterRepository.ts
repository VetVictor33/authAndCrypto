import { DetailedMonster, Monster, NewMonster } from "../../@types/monster";
import db from "./connection";

export default abstract class MonsterRepository {
    static async get(userId: number, monsterId: number): Promise<DetailedMonster[]> {
        const queryWhere = monsterId ? { user_id: userId, "monsters.id": monsterId } : { user_id: userId };
        const response: DetailedMonster[] = await db<Monster>("monsters").where(queryWhere)
            .join('users', 'users.id', '=', 'monsters.user_id').select('users.name as owner', 'monsters.*');
        return response
    }

    static async insert(userId: number, newMonster: NewMonster): Promise<Monster[]> {
        const { name, skills, image, nickname } = newMonster;
        const response = await db<Monster>("monsters").insert({ user_id: userId, name, skills, image, nickname }).returning("*");
        return response
    }

    static async update(field: string, newValue: string, userId: number, monsterId: number) /*:Promise<Monster>*/ {
        const response = await db<Monster>("monsters").update(field, newValue).where({ user_id: userId, id: monsterId }).returning("*");
        return response
    }

    static async delete(userId: number, monsterId: number) {
        const response = await db<Monster>("monsters").del().where({ user_id: userId, id: monsterId });
        return response
    }
}