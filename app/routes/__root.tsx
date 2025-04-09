import type { ReactNode } from 'react'

import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect, useState } from 'react'

import type { ThemeMode } from '~/features/theme/useTheme'

import { ThemeToggle } from '~/features/theme/ThemeToggle'
import { getPreferredTheme, getThemeCookie, updateTheme } from '~/features/theme/useTheme'
import styles from '~/styles.css?url'

export const Route = createRootRoute({
  component: () => (
    <>
      <RootDocument>
        <Outlet />
        <TanStackRouterDevtools />
      </RootDocument>
    </>
  ),

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

  loader: async () => ({
    themeCookie: await getThemeCookie() as ThemeMode,
  }),
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { themeCookie } = Route.useLoaderData()
  const [theme, setTheme] = useState<ThemeMode>(themeCookie)

  useEffect(() => {
    const newTheme = themeCookie || getPreferredTheme()
    setTheme(newTheme)
    updateTheme(newTheme)
  }, [])

  return (
    <html className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <HeadContent />
      </head>

      <body className="bg-[var(--ui-primary)]">
        <h1 className="p-10 bg-red-300">hello ilkome</h1>
        {children}
        <Scripts />

        <ThemeToggle initialTheme={theme} />
      </body>
    </html>
  )
}
