import mongoose from 'mongoose'
import User from '../models/user.model'
import logger from '../setUp/initLogger'

const username = process.env.ADMIN_USER || 'admin'
const password = process.env.ADMIN_PASSWORD || 'adminadmin'

function initMongodb() {
  const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017'
  mongoose.connect(uri).then(async () => {
    const existingUser = await User.find()
    if (existingUser.length === 0) {
      logger.info('No user exists, generating default user ...')
      const newUser = new User({ username, password })
      await newUser.save().then(() => {
        logger.info(
          `User "${username}" with password "${password}" was generated. Please keep in mind changing creds.`,
        )
      })
    }
  })

  const { connection } = mongoose
  connection.once('open', () => {
    logger.info('MongoDB database connection established successfully')
  })
}

export { initMongodb }
