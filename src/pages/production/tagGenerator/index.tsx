import { trpc } from "../../../utils/api"

export function TagGenerator() {

  const { data } = trpc.test.useQuery()

  return (<div>{data}</div>)
}
