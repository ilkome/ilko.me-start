import { createServerFn } from '@tanstack/react-start'
import process from 'node:process'
import { getCookie, setCookie } from 'vinxi/http'
import { z } from 'zod'

export const themeSchema = z.enum(['light', 'dark'])
export type ThemeMode = z.infer<typeof themeSchema>

export const setThemeCookie = createServerFn({ method: 'POST' })
  .validator(themeSchema)
  .handler((ctx) => {
    setCookie('theme', ctx.data, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  })

export const getThemeCookie = createServerFn()
  .handler(() => getCookie('theme') as ThemeMode)

export function getPreferredTheme(): ThemeMode {
  const stored = localStorage.getItem('theme')
  if (stored)
    return stored as ThemeMode

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  return media.matches ? 'dark' : 'light'
}

export function updateDocumentTheme(theme: ThemeMode) {
  const de = document.documentElement

  if (theme === 'dark')
    de.classList.add(theme)
  else
    de.classList.remove('dark')
}

export function updateTheme(theme: ThemeMode) {
  setThemeCookie({ data: theme })
  updateDocumentTheme(theme)
  localStorage.setItem('theme', theme)
}
