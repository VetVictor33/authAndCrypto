import jwt from "jsonwebtoken"
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number,
                email: string
            };
        }
    }
}

declare module "jsonwebtoken" {
    interface ModJwtPayload extends jwt.JwtPayload {
        id: number
    }
}