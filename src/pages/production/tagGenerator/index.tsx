import { trpc } from '../../../utils/api'

export function TagGenerator () {
  const { data } = trpc.user.authTeste.useQuery()

  return (<div>{data}</div>)
}
