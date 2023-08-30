import ExpressError from "./ExpressError";

export default class BadRequestError extends ExpressError {
  constructor(message: string) {
    super(message, 400)
  }
}