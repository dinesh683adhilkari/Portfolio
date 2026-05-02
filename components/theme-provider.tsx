'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: 'class' | `data-${string}`
  defaultTheme?: Theme
  enableSystem?: boolean
  enableColorScheme?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

const DEFAULT_ATTRIBUTE = 'class'
const DEFAULT_THEME: Theme = 'system'
const DEFAULT_STORAGE_KEY = 'theme'

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const disableTransitions = () => {
  const style = document.createElement('style')
  style.textContent = `*,*::before,*::after{transition:none!important;animation:none!important}`
  document.head.appendChild(style)
  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => style.remove())
  }
}

const applyTheme = (
  theme: Theme,
  attribute: string,
  enableColorScheme: boolean,
  disableTransitionOnChange: boolean,
) => {
  const root = document.documentElement
  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  if (disableTransitionOnChange) {
    const cleanup = disableTransitions()
    cleanup()
  }

  if (attribute === 'class') {
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  } else {
    root.setAttribute(attribute, resolvedTheme)
  }

  if (enableColorScheme) {
    root.style.colorScheme = resolvedTheme
  }

  return resolvedTheme
}

export function ThemeProvider({
  children,
  attribute = DEFAULT_ATTRIBUTE,
  defaultTheme = DEFAULT_THEME,
  enableSystem = true,
  enableColorScheme = true,
  disableTransitionOnChange = false,
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const themeRef = React.useRef<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(
    defaultTheme === 'dark' ? 'dark' : 'light',
  )

  React.useEffect(() => {
    themeRef.current = theme
  }, [theme])

  const syncTheme = React.useCallback(
    (nextTheme: Theme) => {
      const resolved = applyTheme(
        nextTheme,
        attribute,
        enableColorScheme,
        disableTransitionOnChange,
      )
      setThemeState(nextTheme)
      setResolvedTheme(resolved)
    },
    [attribute, enableColorScheme, disableTransitionOnChange],
  )

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    const initialTheme = (storedTheme || defaultTheme) as Theme
    syncTheme(initialTheme)

    if (!enableSystem) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (themeRef.current === 'system') {
        syncTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [defaultTheme, enableSystem, storageKey, syncTheme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      const themeToStore = nextTheme || defaultTheme
      localStorage.setItem(storageKey, themeToStore)
      syncTheme(themeToStore)
    },
    [defaultTheme, storageKey, syncTheme],
  )

  const contextValue = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
