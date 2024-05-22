/* eslint-disable func-names */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, IUserModel, IUserDocument } from '../interfaces/user.interface'

const { Schema } = mongoose

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Must be at least 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Must be at least 8 characters'],
    },
  },
  { timestamps: true },
)

// middleware to hash the PW
userSchema.pre<IUserModel>('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (
  username: string,
  password: string,
): Promise<IUserModel> {
  const user = await this.findOne({ username })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
  }
  throw Error('Incorrect login data')
}

const User: IUserDocument = mongoose.model<IUserModel, IUserDocument>(
  'User',
  userSchema,
)

export default User
