import { Request, Response } from "express";
import { emailNotAccepted, failedToLogIn, internalServerError, successfullyAddUser } from "../utils/MessageUtils";
import AccountRepository from "../services/database/AccountRepository";

export default class AccountController {
    async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            await AccountRepository.signup(name, email, password);
            return res.status(201).json({
                message: successfullyAddUser
            })
        } catch (error: any) {
            if (error?.code == 23505) {
                return res.status(400).json({
                    message: emailNotAccepted
                })
            }
            return res.status(500).json({
                message: internalServerError
            })
        }
    }

    async sigin(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const login = await AccountRepository.signin(email, password);
            if (!login) return res.status(400).json({ message: failedToLogIn });

            return res.json(login)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: internalServerError
            })
        }
    }
}