import pino from 'pino'

const pretty_pino = {
  transport: { target: 'pino-pretty', options: { colorize: true } },
}
const dev_option = process.env.ENVIRONMENT_TYPE === 'dev' ? pretty_pino : {}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...dev_option,
})

export default logger
