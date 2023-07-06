import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

const schemaValidation = (schema: Schema) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (error: any) {
    const message = error.name == 'ValidationError' ? error.message : "Validation error"
    return res.status(400).json({message: message})
  }
}

export default schemaValidation