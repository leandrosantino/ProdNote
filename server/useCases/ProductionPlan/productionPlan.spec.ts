import { productionPlan } from '.'

describe('test production plan', () => {
  test('should retrun production list', async () => {
    const productionList = await productionPlan.execute({
      machinesId: ['2', '1'],
      products: [
        { partNumber: '1', stock: 300, demand: 400 },
        { partNumber: '2', stock: 100, demand: 200 },
        { partNumber: '3', stock: 500, demand: 650 },
        // { partNumber: '4', stock: 450, demand: 120 },
        { partNumber: '5', stock: 160, demand: 500 },
        { partNumber: '6', stock: 50, demand: 220 }
      ]
    })

    expect(productionList).toStrictEqual('s')
  })
})

// console.log(productionPlan.orderArrayOfObjects<{ id: string, a: number, c: number }>([
//   { id: '1', a: 10, c: 3 },
//   { id: '2', a: 5, c: 2 },
//   { id: '3', a: 5, c: 1 }
// ], 'a', 'asc'))
