let a = 1
export function parseQrCodeData (_: string) {
  // const value = code
  //   .replaceAll('{', '}')
  //   .replaceAll('^', '"')
  //   .replaceAll('`', '{')
  //   .replaceAll('Ç', ':')
  //   .replaceAll('â', '"a')
  //   .replaceAll('ê', '"e')
  //   .replaceAll('î', '"i')
  //   .replaceAll('ô', '"o')
  //   .replaceAll('û', '"u')
  // console.log(value)
  a++
  return `{"productId":"cli1se1cn0000m5vc5o1jhg1n","tagId":"00000000000000000000000${a}","isFractional":false}`
}
