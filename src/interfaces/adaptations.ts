import jwt from "jsonwebtoken"
import { Request } from "express";
import User from "../entities/User";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

declare module "jsonwebtoken" {
    interface ModJwtPayload extends jwt.JwtPayload {
        id: number
    }
}