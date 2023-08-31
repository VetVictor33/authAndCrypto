import { Request, Response } from "express";
import { emailNotAccepted, failedToLogIn, internalServerError, successfullyAddUser } from "../utils/MessageUtils";
import AccountRepository from "../services/database/AccountRepository";
import BadRequestError from "../errors/BadRequestError";

export default class AccountController {
    async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            await AccountRepository.signup(name, email, password);
            return res.status(201).json({
                message: successfullyAddUser
            })
        } catch (error: any) {
            console.log(error)
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

    async signin(req: Request, res: Response) {
        const { email, password } = req.body;

        const login = await AccountRepository.signin(email, password);
        if (!login) throw new BadRequestError(failedToLogIn)

        return res.json(login)
    }
}