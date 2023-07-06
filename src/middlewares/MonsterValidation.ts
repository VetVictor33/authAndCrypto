import { NextFunction, Request, Response } from "express";

export default class MonsterValidation {
    update(req: Request, res: Response, next: NextFunction) {
        const { newValue } = req.body;
        const { field } = req.params;

        if (field != 'name' && field != 'skills' && field != 'image' && field != 'nickname') {
            const message = `Invalid params`
            return res.status(400).json({ message })
        }

        if (!newValue) {
            const message = `You need to inform a new ${field} as newValue to be updated`
            return res.status(400).json({ message })
        }

        next();
    }
}