import type { ReactNode } from 'react'

import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import reportWebVitals from '~/reportWebVitals'
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
      title: 'TanStack Start Starter',
    }],
  }),
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>

      <body>
        <h1 className="p-10 bg-red-300">hello ilkome</h1>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
