import { Request, Response } from "express";
import { NewMonster } from "../@types/monster";
import NotFoundError from "../errors/NotFoundError";
import MonsterRepository from "../services/database/MonsterRepository";
import { noMonsterFound, successfullyRemovedMonster, successfullyUpdatedMonster } from '../utils/MessageUtils';

export default class MonsterController {
    async get(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;

        const monstersQuery = await MonsterRepository.get(userId, +monsterId);
        if (!monstersQuery) throw new NotFoundError(noMonsterFound)

        return res.json(monstersQuery)
    }

    async post(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { name, skills, image_url, nickname } = req.body as NewMonster;
        const newMonsterData: NewMonster = { name, skills, image_url, nickname }

        const newMonster = await MonsterRepository.insert(userId, newMonsterData)

        res.status(201).json(newMonster);
    }

    async patch(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;
        const { field } = req.params;
        const { newValue } = req.body;

        const newData = await MonsterRepository.update(field, newValue, userId, +monsterId);

        return res.json({ message: successfullyUpdatedMonster, newData })
    }

    async delete(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;

        await MonsterRepository.delete(userId, +monsterId)

        return res.status(204).send()
    }
}