import { NextFunction, Request, Response } from "express";
import { internalServerError } from "../utils/MessageUtils";
import NotFoundError from "../errors/NotFoundError";

export default async function HandleError(err: Error & Partial<NotFoundError>, req: Request, res: Response, next: NextFunction) {
  const status = err.status ?? 500
  const message = err.status ? err.message : internalServerError

  return res.status(status).json({ message })
}