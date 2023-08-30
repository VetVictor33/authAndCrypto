import { Request, Response } from "express";
import { NewMonster } from "../@types/monster";
import NotFoundError from "../errors/NotFoundError";
import MonsterRepository from "../services/database/MonsterRepository";
import { noMonsterFound, successfullyRemovedMonster } from '../utils/MessageUtils';

export default class MonsterController {
    async get(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;

        const monstersQuery = await MonsterRepository.get(userId, +monsterId);
        if (monstersQuery.length < 1) throw new NotFoundError(noMonsterFound)

        return res.json(monstersQuery)
    }

    async post(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { name, skills, image, nickname } = req.body as NewMonster;
        const newMonsterData: NewMonster = { name, skills, image, nickname }

        const newMonster = await MonsterRepository.insert(userId, newMonsterData)

        res.status(201).json(newMonster);
    }

    async patch(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;
        const { field } = req.params;
        const { newValue } = req.body;

        const updatedMonster = await MonsterRepository.update(field, newValue, userId, +monsterId);
        if (updatedMonster.length === 0) throw new NotFoundError(noMonsterFound)

        return res.json(updatedMonster)
    }

    async delete(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;

        const deletedMonster = await MonsterRepository.delete(userId, +monsterId);
        if (deletedMonster === 0) throw new NotFoundError(noMonsterFound)

        return res.json({ message: successfullyRemovedMonster })
    }
}