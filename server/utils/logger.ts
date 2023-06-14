
class Logger {

  info(msg: string) {
    console.log(msg)
  }

  error(msg: string) {
    console.log(msg)
  }
}


export const logger = new Logger()
