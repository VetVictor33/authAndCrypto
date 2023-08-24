import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, ModJwtPayload } from 'jsonwebtoken';
import db from "../services/database/connection";
import TokenUtils from "../utils/TokenUtils";
import { internalServerError } from "../utils/MessageUtils";

export default class TokenValidation {
    async validate(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const token = authorization!.split(' ')[1];
            const userToken = TokenUtils.validateToken(token);
            const { id } = userToken as ModJwtPayload;

            const userFromDb = await db("users").where({ id }).first();
            const { password: _, ...user } = userFromDb;
            req.user = user;
            next()

        } catch (error: JsonWebTokenError | any) {
            let message = internalServerError;
            if (error instanceof JsonWebTokenError) {
                message = error.message
            }
            return res.status(401).json({ message })
        }
    }
}