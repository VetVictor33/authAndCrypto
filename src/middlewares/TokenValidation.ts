import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, ModJwtPayload } from 'jsonwebtoken';
import { internalServerError } from "../utils/MessageUtils";
import TokenUtils from "../utils/TokenUtils";
import AccountRepository from "../services/database/AccountRepository";

export default class TokenValidation {
    async validate(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const userToken = TokenUtils.validateToken(token);
            const { id } = userToken as ModJwtPayload;

            const userFromDb = await AccountRepository.getUser(id)
            const { password: _, ...user } = userFromDb;
            req.user = user;
            next()

        } catch (error: JsonWebTokenError | any) {
            let message = authorization ? internalServerError : 'Invalid token';
            if (error instanceof JsonWebTokenError) {
                message = error.message
            }
            return res.status(401).json({ message })
        }
    }
}