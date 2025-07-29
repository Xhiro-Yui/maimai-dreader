import React, { useState, useEffect } from "react"
import { ThemeContext, type Theme } from "./ThemeContext"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getInitialTheme = (): Theme => {
        const stored = localStorage.getItem("theme") as Theme | null
        if (stored === "theme-dark" || stored === "theme-light") return stored

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        return prefersDark ? "theme-dark" : "theme-light"
    }

    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        const html = document.documentElement
        html.classList.remove("theme-light", "theme-dark")
        html.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
