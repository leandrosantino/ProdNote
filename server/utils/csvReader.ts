import CsvReadableStream from 'csv-reader'
import fs from 'fs'
import path from 'path'

export async function csvReader () {
  return await new Promise<string[][]>((resolve, reject) => {
    const data: string[][] = []
    const inputStream = fs.createReadStream(path.join(__dirname, '../../../prisma/ReasonsLoss.csv'), 'utf8')
    inputStream
      .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: ';' }))
      .on('data', function (row: string[]) {
        data.push(row)
      })
      .on('end', function () {
        resolve(data)
      })
      .on('error', (err) => { reject(err) })
  })
}
