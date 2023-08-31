import { NextFunction, Request, Response } from "express";
import AccountRepository from "../services/database/AccountRepository";
import TokenUtils from "../utils/TokenUtils";

export default class TokenValidation {
    async validate(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        const token = authorization!.split(' ')[1];
        const userToken = TokenUtils.validateToken(token);
        const { id } = userToken

        req.user = await AccountRepository.getUser(id)

        next()
    }
}