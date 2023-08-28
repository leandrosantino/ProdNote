import { registerProductionEfficiency } from '.'

test('should returns correct oee calculate', () => {
  const oee = registerProductionEfficiency.calculateOEE({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373
  })
  expect(oee.toFixed(2)).toBe(0.71.toFixed(2))
})

test('should create efficiency record', async () => {
  await expect(registerProductionEfficiency.execute({
    data: {
      date: new Date(),
      piecesQuantity: 373,
      productionProcessId: 'clluv7m0y0030m5hs6d8wk5ag',
      productionTimeInMinutes: 528,
      turn: '1',
      ute: 'UTE-4'
    },
    productionEfficiencyLosses: [
      {
        reasonsLossEfficiencyId: 'clluv7i69001om5hs4elskemk',
        lostTimeInMinutes: 20,
        machineId: ''
      },
      {
        reasonsLossEfficiencyId: 'clluv7ij7001tm5hsen8pf6bd',
        lostTimeInMinutes: 30,
        machineId: ''
      }
    ]
  })).resolves.not.toThrowError()
})
