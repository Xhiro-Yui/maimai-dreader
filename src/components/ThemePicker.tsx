import { useTheme } from "../hooks/useTheme"

const ThemePicker = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "theme-light" | "theme-dark")}
                className="text-sm bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-text)] px-3 py-1 rounded shadow transition-colors duration-300"
            >
                <option value="theme-light">Light Theme</option>
                <option value="theme-dark">Dark Theme</option>
            </select>
        </div>
    )
}

export default ThemePicker
