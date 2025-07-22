interface TabSelectorProps {
    tabs: string[]
    currentTab: string
    onTabChange: (tab: string) => void
}

const TabSelector = ({ tabs, currentTab, onTabChange }: TabSelectorProps) => {
    return (
        <div className="flex space-x-2 border-b border-gray-300 px-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 rounded-t-md border transition-colors duration-200 ${
                        currentTab === tab
                            ? "bg-[var(--color-bg)] border-[var(--color-text)] border-b-0 text-blue-600 font-semibold"
                            : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-50"
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default TabSelector
