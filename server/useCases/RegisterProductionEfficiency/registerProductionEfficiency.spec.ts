import { registerProductionEfficiency } from '.'

test('should returns correct oee calculate', () => {
  const oee = registerProductionEfficiency.calculateOEE({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373
  })
  expect(oee.toFixed(2)).toBe(0.71.toFixed(2))
})

// test('should create efficiency record', async () => {
//   await expect(registerProductionEfficiency.execute({
//     data: {
//       date: new Date(),
//       piecesQuantity: 373,
//       productionProcessId: 'clluztto10030m5jsr9o3kp6g',
//       productionTimeInMinutes: 528,
//       turn: '1',
//       ute: 'UTE-4'
//     },
//     productionEfficiencyLosses: [
//       {
//         reasonsLossEfficiencyId: 'clluztpm0001am5js2lq4cdxg',
//         lostTimeInMinutes: 20,
//         machineId: 'clluztbms0001m5jsr52anbgj'
//       },
//       {
//         reasonsLossEfficiencyId: 'clluztq3u001im5js06fwg7gb',
//         lostTimeInMinutes: 30,
//         machineId: 'clluztbms0001m5jsr52anbgj'
//       }
//     ]
//   })).resolves.not.toThrowError()
// })

test('should return true if the data of oee is coherent', () => {
  const resp = registerProductionEfficiency.verifyCoerency({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373,
    lostTimeInMinutes: 155
  })
  expect(resp).toBe('ok')
})
test('should return false if the data of oee not is coherent', () => {
  const resp = registerProductionEfficiency.verifyCoerency({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373,
    lostTimeInMinutes: 155 + 30
  })
  expect(resp).toBe('exdent')
})
test('should return false if the data of oee not is coherent', () => {
  const resp = registerProductionEfficiency.verifyCoerency({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373,
    lostTimeInMinutes: 155 - 30
  })
  expect(resp).toBe('missing')
})
