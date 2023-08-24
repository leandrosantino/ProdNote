import fs from 'fs'
import path from 'path'

async function read2 (file: string) {
  return await new Promise<string[]>(resolve => {
    const stream = fs.createReadStream(file, { encoding: 'utf8' })
    stream.on('data', data => {
      resolve(data.toString().split(/\n/))
      stream.destroy()
    })
  })
}

function formatReport (data: string[]) {
  let a = data.map(row => row
    .trim()
    .split(' ')
    .filter(r => r !== '')
    .filter(r => r !== '-')
    .filter(r => r.length > 0)
    .join('-')
  )
    .filter(r => r.length > 0)
    .filter(r => !r.startsWith('-'))
    .filter(r => !r.startsWith('ADLER'))
    .filter(r => !r.startsWith('Estabelecimento'))
    .filter(r => !r.startsWith('Matr�cula'))
    .filter(r => !r.startsWith('Total'))
    .filter(r => !r.startsWith('Geral'))
    .filter(r => !r.startsWith(':'))

  const d = a[0].split('-')[1]
  const date = `${d.split('/')[1]}/${d.split('/')[2]}`

  a = a.filter(r => !r.startsWith('Per�odo'))

  console.log(date)

  const finishData: string[][] = [
    ['Mes', 'Matricula', 'Digito', 'Nome', 'Evento', 'Descricao', 'Porcentagem', 'Horas', 'Horas extras em minutos']
  ]

  let currentList: string[] = []
  a.forEach(r => {
    const row = r.split('-')
    if (row[0] !== 'Total:' && row[1] !== 'Hr') {
      let tempR = row.join(' ').split('Hr Extra Diurna')
      tempR = [...tempR, 'Hr Extra Diurna']
      if (tempR.length < 3) {
        tempR = row.join(' ').split('Hr Extra Noturna')
        tempR = [...tempR, 'Hr Extra Noturna']
        if (tempR.length < 3) {
          const texto = row.join(' ')
          const expression = texto.match(/\b\d{2}:\d{2}\b/g)
          if (expression) {
            tempR = texto.split(expression[0])
            tempR = [tempR[0], expression[0], 'N/A']
          }
        }
      }
      const spliter = tempR[0].split(' ').filter((_, index) => index === 0 || index === 1).join('-')
      let name = tempR[0]
        .replace(' ', '-')
        .split(spliter)[1]
        .trim()

      let event = name.substr(-3)
      event = isNaN(Number(event)) ? 'N/A' : event

      name = name.split('')
        .filter((_, index, { length }) => index !== length - 1 && index !== length - 2 && index !== length - 3)
        .join('')
        .trim()

      let g = tempR[1]
        .trim()
        .split(' ')
      g = g.length < 2 ? ['N/A', g[0]] : g

      currentList = [date, ...spliter.split('-'), name]
      finishData.push([
        ...currentList,
        event,
        tempR[2],
        g[0],
        g[1],
        timeStringToMinutes(g[1]).toString()
      ])
      return
    }

    const tempR2 = r.split('-')
    if (!tempR2[4].endsWith(':')) {
      finishData.push([
        ...currentList,
        tempR2[0],
        [tempR2[1], tempR2[2], tempR2[3]].join(' '),
        tempR2[4],
        tempR2[5],
        timeStringToMinutes(tempR2[5]).toString()
      ])
    }
  })
  return finishData
    .map(entry => entry.join(';'))
    .join('\n')
}

function timeStringToMinutes (time: string) {
  const [hours, minutes] = time.split(':')
  return (Number(hours) * 60) + Number(minutes)
}

const source = path.resolve('Z:/ADR/Absenteismo - v3/')

const textPaths = [
  'HORAS_EXTRAS_01 á 30.06.2023',
  'HORAS_EXTRAS_01_á_31.07.2023',
  'HORAS_EXTRAS_ABRIL_2023',
  'HORAS_EXTRAS_MAIO_2023',
  'HORA_EXTRA_03.2023',
  'HORA_EXTRA_FEVEREIRO_2023'
];

(async () => {
  for await (const textPath of textPaths) {
    console.log(textPath)
    const csv = formatReport(await read2(path.join(source, `${textPath}.txt`)))
    fs.writeFileSync(path.join(source, 'Horas_Extras', `${textPath}.csv`), csv, 'utf-8')
  }
})()
  .catch(console.log)
