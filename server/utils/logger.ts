

function info(msg: string) {
  console.log(msg)
}

function error(msg: string) {
  console.log(msg)
}

export const logger = {
  info,
  error
}
