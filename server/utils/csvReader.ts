import CsvReadableStream from 'csv-reader'
import fs from 'fs'

export async function csvReader (filePath: string) {
  return await new Promise<string[][]>((resolve, reject) => {
    const data: string[][] = []
    const inputStream = fs.createReadStream(filePath, 'utf8')
    inputStream
      .pipe(new CsvReadableStream({ ltrim: true, rtrim: true, parseNumbers: false, parseBooleans: true, trim: true, delimiter: ';' }))
      .on('data', function (row: string[]) {
        data.push(row)
      })
      .on('end', function () {
        resolve(data)
      })
      .on('error', (err) => { reject(err) })
  })
}
