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
  a++
  const data = {
    productId: 'cli1se9pc0034m5vc8bdu4pyj',
    tagId: `0000000000000000000${a}`,
    isFractional: false
  }

  return JSON.stringify(data)
}
