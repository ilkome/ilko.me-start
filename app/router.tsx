import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { getThemeCookie } from './features/theme/useTheme'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    context: {
      themeCookie: getThemeCookie(),
    },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultStructuralSharing: true,
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
