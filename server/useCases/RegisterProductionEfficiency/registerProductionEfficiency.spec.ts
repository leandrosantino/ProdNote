import { registerProductionEfficiency } from '.'

test('should returns correct oee calculate', () => {
  const oee = registerProductionEfficiency.calculateOEE({
    cycleTimeInSeconds: 60,
    productionTimeInMinutes: 528,
    piecesQuantity: 373
  })
  expect(oee.toFixed(2)).toBe(0.71.toFixed(2))
})
