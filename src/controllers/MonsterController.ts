import { Request, Response } from "express";
import { internalServerError, monsterNotFound, noMosterFound, succesfullyRemovedMoster } from '../utils/MessageUtils'
import MonsterRepository from "../services/database/MonsterRepository";
import { Monster } from "../interfaces/costumInterfaces";

export default class MonsterController {
    async get(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;
        try {
            const monstersQuery = await MonsterRepository.get(userId, +monsterId);

            if (monstersQuery.length < 1) return res.status(404).json({
                message: noMosterFound
            })

            return res.json(monstersQuery)
        } catch (error) {
            return res.status(500).json({ message: internalServerError })
        }
    }

    async post(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { name, skills, image, nickname } = req.body;
        const newMonsterData: Monster = { name, skills, image, nickname }
        try {
            const newMoster = await MonsterRepository.insert(userId, newMonsterData)

            res.status(201).json(newMoster);
        } catch (error) {
            res.status(500).json({ message: internalServerError })
        }
    }

    async patch(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;
        const { field } = req.params;
        const { newValue } = req.body;

        try {
            const updatedMonster = await MonsterRepository.update(field, newValue, userId, +monsterId);

            if (updatedMonster.length === 0) return res.status(404).json({
                message: monsterNotFound
            });

            return res.json(updatedMonster)
        } catch (error) {
            return res.status(500).json({ message: internalServerError });
        }
    }

    async delete(req: Request, res: Response) {
        const { id: userId } = req.user;
        const { monsterId } = req.params;

        try {
            const deletedMonster = await MonsterRepository.delete(userId, +monsterId);
            if (deletedMonster === 0) return res.status(404).json({ message: monsterNotFound });

            return res.json({ message: succesfullyRemovedMoster })
        } catch (error) {
            return res.status(500).json({ message: internalServerError });
        }
    }
}