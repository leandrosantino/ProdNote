import { createTags } from '.'
import fs from 'fs'
import path from 'path'

createTags.execute([
  {
    amount: 10,
    id: 'iahwrguiabwepiuaewfiaue',
    isFractional: false
  },
  {
    amount: 15,
    id: 'igsdivubasodivbasddbr',
    isFractional: false
  }
])
  .then((buffer) => {
    fs.writeFileSync(path.join(__dirname, '../../../public/pdf/teste.pdf'), buffer, 'utf-8')
  })
  .catch(console.log)
