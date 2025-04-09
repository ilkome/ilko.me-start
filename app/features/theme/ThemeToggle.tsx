import type { MouseEvent as ReactMouseEvent } from 'react'

import { useState } from 'react'

import type { ThemeMode } from './useTheme'

import { updateTheme } from './useTheme'

export function ThemeToggle({ initialTheme }: { initialTheme?: ThemeMode }) {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme ?? 'dark')

  const handleToggleMode = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    updateTheme(newTheme)
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
        <pre>
          initialTheme:
          {initialTheme}
        </pre>
      </h1>
    </>
  )
}
