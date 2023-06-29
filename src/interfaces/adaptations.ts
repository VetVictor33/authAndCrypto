import { Request as req } from "express";
import jwt from "jsonwebtoken"

declare module "express" {
    interface ModRequest extends req {
        user: {
            id: number,
            email: string
        };
    }
}

declare module "jsonwebtoken" {
    interface ModJwtPayload extends jwt.JwtPayload {
        id: number
    }
}