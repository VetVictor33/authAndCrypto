import { NewMonster } from "../../@types/monster";
import { AppDataSource } from "../../data-source";
import Monster from "../../entities/Monster";
import NotFoundError from "../../errors/NotFoundError";
import { monsterNotFound } from "../../utils/MessageUtils";

export default abstract class MonsterRepository {
    private static monsterRepository = AppDataSource.getRepository(Monster)

    static async get(userId: number, monsterId: number): Promise<Monster[] | Monster | null> {
        if (monsterId) {
            return await this.monsterRepository.findOneBy({ id: monsterId, user_id: userId })
        }
        return await this.monsterRepository.find({ where: { user_id: userId } })
    }

    static async insert(userId: number, newMonster: NewMonster) {
        newMonster.user_id = userId
        const createdMonster = this.monsterRepository.create(newMonster)
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