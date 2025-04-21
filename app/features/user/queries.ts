import { queryOptions } from '@tanstack/react-query'

import { getUser } from './utils'

export function authQueryOptions() {
  return queryOptions({
    queryFn: () => getUser(),
    queryKey: ['auth'],
  })
}
