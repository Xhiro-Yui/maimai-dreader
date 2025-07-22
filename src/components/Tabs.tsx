import TabSelector from "./TabSelector"
import TabContent from "./TabContent"

interface TabsProps {
    tabs: string[]
    currentTab: string
    setCurrentTab: (tab: string) => void
    views: Record<string, React.ReactNode>
}

const Tabs = ({ tabs, currentTab, setCurrentTab, views }: TabsProps) => {
    return (
        <>
            <TabSelector
                tabs={tabs}
                currentTab={currentTab}
                onTabChange={setCurrentTab}
            />
            <TabContent currentTab={currentTab} views={views} />
        </>
    )
}

export default Tabs
