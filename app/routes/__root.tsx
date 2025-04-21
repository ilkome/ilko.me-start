import type { ThemeMode } from '@/features/theme/useTheme'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { Button } from '@/components/ui/button'
// import { authQueryOptions } from '@/features/user/queries'
// import { getUser } from '@/features/user/utils'
// import { Toaster } from '@/components/ui/sonner'
import { ThemeToggle } from '@/features/theme/ThemeToggle'
import { getClientTheme, getServerThemeCookie, setServerThemeCookie, updateClientTheme } from '@/features/theme/useTheme'
import { getSupabaseServerClient } from '@/services/supabase/utils'
import styles from '@/styles.css?url'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = await getSupabaseServerClient()
  const { data, error: _error } = await supabase.auth.getUser()

  if (!data.user?.email)
    return null

  return {
    email: data.user.email,
  }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async () => ({ user: await fetchUser() }),

  component: () => {
    return (
      <RootDocument>
        <Outlet />
      </RootDocument>
    )
  },

  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },

  head: () => ({
    links: [{ href: styles, rel: 'stylesheet' }],

    meta: [{
      charSet: 'utf-8',
    }, {
      content: 'width=device-width, initial-scale=1',
      name: 'viewport',
    }, {
      title: 'start.ilko.me',
    }],
  }),

  loader: async ({ context }) => ({
    themeCookie: await getServerThemeCookie() as ThemeMode,
    user: context.user,
  }),
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { user } = Route.useRouteContext()
  const { themeCookie } = Route.useLoaderData()
  const [theme, setThemeState] = useState<ThemeMode>(themeCookie ?? 'dark')

  useEffect(() => {
    if (themeCookie)
      return

    const preferredTheme = getClientTheme()
    if (themeCookie !== preferredTheme) {
      const newTheme = themeCookie || preferredTheme
      setThemeState(newTheme)
      updateClientTheme(newTheme)
      setServerThemeCookie({ data: newTheme })
    }
  }, [])

  return (
    <html className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <HeadContent />
      </head>

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <body className="bg-[var(--ui-primary)]">
        <ThemeToggle theme={theme} setTheme={setThemeState} />
        {children}

        <Button onClick={() => console.log('Button clicked!')}>Test</Button>
        <Link to="/login">Login</Link>

        <div>
          {user
            ? (
                <>
                  <span className="mr-2">
                    {user.email}
                  </span>
                  <Link to="/logout">Logout</Link>
                </>
              )
            : 'Hello'}
        </div>

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
