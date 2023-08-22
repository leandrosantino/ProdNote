
export function parseQrCodeData (code: string) {
  const value = code
    .replaceAll('{', '}')
    .replaceAll('^', '"')
    .replaceAll('`', '{')
    .replaceAll('Ç', ':')
    .replaceAll('â', '"a')
    .replaceAll('ê', '"e')
    .replaceAll('î', '"i')
    .replaceAll('ô', '"o')
    .replaceAll('û', '"u')
  return value
}
