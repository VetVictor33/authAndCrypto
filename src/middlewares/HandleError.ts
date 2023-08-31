import { NextFunction, Request, Response } from "express";
import ExpressError from "../errors/ExpressError";
import { emailNotAccepted, internalServerError } from "../utils/MessageUtils";
import { JsonWebTokenError } from "jsonwebtoken";

export default async function HandleError(err: Error & Partial<ExpressError> & Partial<any>, req: Request, res: Response, next: NextFunction) {
  let status = err.status ?? 500
  let message = err.status ? err.message : internalServerError
  if (err?.code == 23505) {
    status = 400
    message = emailNotAccepted
  } else if (err.name === 'ValidationError') {
    status = 400
    message = err.message
  } else if (err instanceof JsonWebTokenError) {
    status = 401
    message = err.message
  }

  console.log(err)
  return res.status(status).json({ message })
}