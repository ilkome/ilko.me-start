import type { MouseEvent as ReactMouseEvent } from 'react'

import type { ThemeMode } from './useTheme'

import { setServerThemeCookie, updateClientTheme } from './useTheme'

export function ThemeToggle({ theme = 'dark', setTheme }: { theme?: ThemeMode, setTheme: (theme: ThemeMode) => void }) {
  const handleToggleMode = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    updateClientTheme(newTheme)
    // serverThemeDebouncer.maybeExecute(newTheme)
    setServerThemeCookie({ data: newTheme })
  }

  return (
    <>
      <h1
        onClick={handleToggleMode}
        className="p-10 bg-pink-400"
      >
        <pre>
          mode:
          {theme}
        </pre>
      </h1>
    </>
  )
}
