import { useEffect, useState } from "react"

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        // Get saved theme from localStorage or default to light
        return localStorage.getItem("theme") === "dark" ? "dark" : "light"
    })

    useEffect(() => {
        const html = document.documentElement
        if (theme === "dark") {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    return { theme, setTheme }
}
