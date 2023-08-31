import { DetailedMonster, Monster as TMonster, NewMonster } from "../../@types/monster";
import { AppDataSource } from "../../data-source";
import Monster from "../../entities/Monster";
import User from "../../entities/User";
import NotFoundError from "../../errors/NotFoundError";
import { monsterNotFound } from "../../utils/MessageUtils";
import db from "./connection";

export default abstract class MonsterRepository {
    private static monsterRepository = AppDataSource.getRepository(Monster)
    private static userRepository = AppDataSource.getRepository(User)

    static async get(userId: number, monsterId: number): Promise<Monster[] | Monster | null> {
        if (monsterId) {
            return await this.monsterRepository.findOneBy({ id: monsterId })
        }
        return await this.monsterRepository.find({ where: { user_id: userId } })
    }

    static async insert(userId: number, newMonster: NewMonster) {
        const { name, skills, image_url, nickname } = newMonster;
        const createdMonster = this.monsterRepository.create({ image_url, name, nickname, skills, user_id: userId })
        await this.monsterRepository.save(createdMonster)
        return createdMonster
    }

    static async update(field: string, newValue: string, userId: number, monsterId: number) {
        const { affected, raw } = await this.monsterRepository.createQueryBuilder()
            .update(Monster)
            .set({ [field]: newValue })
            .where({ user_id: userId, id: monsterId }).returning('*').execute()
        if (!affected) throw new NotFoundError(monsterNotFound)
        return raw
    }

    static async delete(userId: number, monsterId: number) {
        const { affected } = await this.monsterRepository.delete({ user_id: userId, id: monsterId })
        if (!affected) throw new NotFoundError(monsterNotFound)
    }
}