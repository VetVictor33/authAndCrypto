import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const schemaValidation = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  await schema.validateAsync(req.body)
  next()
}

export default schemaValidation