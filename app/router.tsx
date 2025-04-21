import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()

  return routerWithQueryClient(
    createTanStackRouter({
      context: { queryClient },
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
      defaultStructuralSharing: true,
      routeTree,
      scrollRestoration: true,
    }),
    queryClient,
  )
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
