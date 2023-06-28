import { type User } from '../../../entities/User'
import { type IUsersRepository } from '../../IUsersRepository'

const users: User[] = [
  {
    id: 'leandrosanoihr',
    name: 'PROD@adler',
    password: '7c60aad5a35c5c40b52223ecc4fe7db6d8506a526515378fcbd27fa0ff6253b9f32fb7b3f6cf41c1e2de6d78a9ffdc09648906ece4b97798522b8bebf4eec826',
    email: 'leandrosantino2013@gmail.com',
    permissions: [
      { description: 'GENERATE_TAGS', id: 1 },
      { description: 'READ_TAGS', id: 3 }
    ]
  },
  {
    id: 'sdfoihsdofie',
    name: 'ADMIN@adler',
    password: 'b924c72bf6bb0ed7e467e2a176e9ea921edda520f70966bfb0b8eae3788dd9ccc4a50184997ff4744257ddc9c36a35a7f9061347926cef095a4faffd6bd4f108',
    email: 'leandroalpha45c@gmail.com',
    permissions: [
      { description: 'PLANNING', id: 2 }
    ]
  }
]

export class UsersRepository implements IUsersRepository {
  async create (data: User) {
    console.log(data)
    return {} as User
  }

  async findByName (userName: string) {
    let user: User | null = null

    users.forEach(entry => {
      if (entry.name === userName) {
        user = entry
      }
    })

    return user
  }

  async findById (userId: string) {
    let user: User | null = null

    users.forEach(entry => {
      if (entry.id === userId) {
        user = entry
      }
    })

    return user as User | null
  }
}
