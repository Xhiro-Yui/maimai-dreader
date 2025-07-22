// context/ThemeProvider.tsx
import React, { useState, useEffect } from "react"
import { ThemeContext, type Theme } from "./ThemeContext"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("theme-light")

    useEffect(() => {
        const html = document.documentElement
        html.classList.remove("theme-light", "theme-dark")
        html.classList.add(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
