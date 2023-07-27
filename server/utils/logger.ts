import chalk from 'chalk'

class Logger {
  info (msg: string) {
    console.log(chalk.greenBright(msg))
  }

  error (msg: string) {
    console.log(chalk.redBright(msg))
  }
}

export const logger = new Logger()
