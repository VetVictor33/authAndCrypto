import { NextFunction, Request, Response } from "express";

export default class AccountValidation {
    signup(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            const message = `Unable to signup without:${!name ? ' name' : ''}${!email ? ' email' : ''}${!password ? ' password' : ''}`
            return res.status(400).json({ message })
        }
        next();
    }

    signin(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            const message = `Unable to siging without:${!email ? ' email' : ''}${!password ? ' password' : ''}`
            return res.status(400).json({ message })
        }
        next();
    }
}