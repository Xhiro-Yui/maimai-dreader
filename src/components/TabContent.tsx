import type {ReactNode} from "react"

interface TabContentProps {
    currentTab: string
    views: Record<string, ReactNode>
}

const TabContent = ({currentTab, views}: TabContentProps) => {
    return (
        <div
            className="border border-[var(--color-text)] rounded-b-lg bg-[var(--color-bg)] p-4 shadow min-h-[400px] transition-colors duration-300">
            {views[currentTab] || <div className="text-gray-400">No view available.</div>}
        </div>
    )
}

export default TabContent
