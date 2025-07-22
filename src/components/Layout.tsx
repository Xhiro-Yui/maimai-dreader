import type {ReactNode} from "react"

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 p-2">
            <div className="relative min-h-screen">
                {children}
            </div>
        </div>
    )
}
