import { Request, Response, NextFunction } from 'express'

async function forwardError(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

async function throwErrorOnInvalidRoute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
}

export { forwardError, throwErrorOnInvalidRoute, AppError }
