"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

interface ThemeColorChangerProps {
  lightThemeColor: string
  darkThemeColor: string
}

export function ThemeColorChanger({ lightThemeColor = "#ffffff", darkThemeColor = "#121212" }: ThemeColorChangerProps) {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Get the current theme (fallback to system preference)
    const currentTheme = theme === "system" ? resolvedTheme : theme

    // Select the appropriate color based on the theme
    const themeColor = currentTheme === "dark" ? darkThemeColor : lightThemeColor

    // Find the theme-color meta tag
    let metaThemeColor = document.querySelector("meta[name='theme-color']")

    // If it doesn't exist, create it
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.setAttribute("name", "theme-color")
      document.head.appendChild(metaThemeColor)
    }

    // Update the content attribute
    metaThemeColor.setAttribute("content", themeColor)
  }, [theme, resolvedTheme, lightThemeColor, darkThemeColor])

  // This component doesn't render anything visible
  return null
}
