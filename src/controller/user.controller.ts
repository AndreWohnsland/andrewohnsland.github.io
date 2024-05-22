import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import { AppError } from '../middlewares/errorHandler'
import { IUserModel } from '../interfaces/user.interface'
import logger from '../setUp/initLogger'
import cookiePolicy from '../setUp/cookieSetting'

const maxAgeInSeconds = 24 * 60 * 60 * 7

async function addUser(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body

  const newUser = new User({ username, password })
  newUser
    .save()
    .then(() => {
      logger.info(`User ${username} was created`)
      res.json('User added!')
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)))
}

async function changePassword(req: Request, res: Response, next: NextFunction) {
  const { username, password, newPassword, repeatedPassword } = req.body
  if (newPassword.length < 8) {
    return next(new AppError('Password needs to have at least 8 letters', 400))
  }
  if (newPassword !== repeatedPassword) {
    return next(
      new AppError('The new and repeated password are not the same', 400),
    )
  }
  User.login(username, password)
    .then((user: IUserModel) => {
      user.password = newPassword
      user.save().then(() => {
        logger.info(`Password for user ${username} was changed`)
        res.status(200).json('Password changed successfully')
      })
    })
    .catch((err: Error) => {
      logger.warn(`Failure changing password for user ${username}`)
      next(new AppError(`${err}`, 400))
    })
}

const createToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: maxAgeInSeconds,
  })

async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body

  User.login(username, password)
    .then((user: IUserModel) => {
      logger.info(`Login by user ${username}`)
      const token = createToken(user._id)
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + maxAgeInSeconds * 1000),
        ...cookiePolicy,
      })
      res.status(200).json('Login successful!')
    })
    .catch((err: Error) => {
      logger.warn(`Incorrect login for user ${username}`)
      next(new AppError(`${err}`, 400))
    })
}

async function logout(req: Request, res: Response, next: NextFunction) {
  res.clearCookie('jwt', { ...cookiePolicy })
  res.status(200).json('Logout successful!')
}

async function getAuth(req: Request, res: Response) {
  res.status(200).json('Authentication succeeded')
}

export default { addUser, login, logout, getAuth, changePassword }
