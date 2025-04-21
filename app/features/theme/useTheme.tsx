import { useDebouncer } from '@tanstack/react-pacer'
import { createServerFn } from '@tanstack/react-start'
import process from 'node:process'
import { getCookie, setCookie } from 'vinxi/http'
import { z } from 'zod'

export const themeSchema = z.enum(['light', 'dark'])
export type ThemeMode = z.infer<typeof themeSchema>

export const setServerThemeCookie = createServerFn({ method: 'POST' })
  .validator(themeSchema)
  .handler(({ data }) => {
    setCookie('theme', data, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  })

// export const serverThemeDebouncer = useDebouncer(
//   (theme: ThemeMode) => console.log(11, theme),
//   { wait: 1000 },
// )

export const getServerThemeCookie = createServerFn().handler(
  () => getCookie('theme') as ThemeMode,
)

export function getClientTheme(): ThemeMode {
  const stored = localStorage.getItem('theme')
  if (stored)
    return stored as ThemeMode

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  return media.matches ? 'dark' : 'light'
}

export function updateClientTheme(theme: ThemeMode): void {
  localStorage.setItem('theme', theme)

  const de = document.documentElement
  theme === 'dark' ? de.classList.add(theme) : de.classList.remove('dark')
}
