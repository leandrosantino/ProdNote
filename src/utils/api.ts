import { createTRPCProxyClient, createTRPCReact, httpBatchLink } from '@trpc/react-query'
import type { AppRouter } from '../../server/routers'

let token: string = ''

const links = [
  httpBatchLink({
    url: 'http://localhost:3336/api',
    async headers () {
      return {
        authorization: token
      }
    }
  })
]

export function setToken (auth_token: string) {
  token = auth_token
}

export const trpc = createTRPCReact<AppRouter>()

export const fetch = createTRPCProxyClient<AppRouter>({ links })

export function createTRPCClient () {
  return trpc.createClient({ links })
}
