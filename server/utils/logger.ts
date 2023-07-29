import chalk from 'chalk'

class Logger {
  success (msg: string) {
    console.log(chalk.greenBright(msg))
  }

  info (msg: string) {
    console.log(chalk.blueBright(msg))
  }

  error (msg: string) {
    console.log(chalk.redBright(msg))
  }
}

export const logger = new Logger()
