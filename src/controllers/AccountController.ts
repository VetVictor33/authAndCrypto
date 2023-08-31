import { Request, Response } from "express";
import { emailNotAccepted, failedToLogIn, internalServerError, successfullyAddUser } from "../utils/MessageUtils";
import AccountRepository from "../services/database/AccountRepository";
import BadRequestError from "../errors/BadRequestError";

export default class AccountController {
    async signup(req: Request, res: Response) {
        await AccountRepository.signup(req.body);
        return res.status(201).json({ message: successfullyAddUser })
    }

    async signIn(req: Request, res: Response) {
        const login = await AccountRepository.signIn(req.body);
        if (!login) throw new BadRequestError(failedToLogIn)
        return res.json(login)
    }
}