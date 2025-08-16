import type { ReactNode } from "react"

interface SidebarLayoutProps<T extends string> {
    controls?: ReactNode
    sidebarTabs?: {
        tabs: readonly T[]
        currentTab: T
        setCurrentTab: (tab: T) => void
    }
    children: ReactNode
}

export default function SidebarLayout<T extends string>({
                                                            controls,
                                                            sidebarTabs,
                                                            children,
                                                        }: SidebarLayoutProps<T>) {
    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            {/* Sidebar */}
            <aside className="w-60 flex-shrink-0 bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)] shadow-md">
                <div className="p-4 space-y-4">
                    {controls}
                    {sidebarTabs && (
                        <div className="space-y-1">
                            {sidebarTabs.tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => sidebarTabs.setCurrentTab(tab)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                        sidebarTabs.currentTab === tab
                                            ? "bg-[var(--color-hover-bg)] font-semibold"
                                            : "hover:bg-[var(--color-hover-bg)]"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    )
}
