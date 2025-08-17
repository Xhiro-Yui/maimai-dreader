import { useEffect, useState } from "react";
import SidebarLayout from "./components/layout/SidebarLayout";
import UploadRecords from "./components/UploadRecords";
import ThemePicker from "./components/ThemePicker";
import Dashboard from "./views/Dashboard.tsx";
import Records from "./views/Records";
import Other from "./views/Other";
import About from "./views/About.tsx";
import type { Database } from "sql.js";
import { Home, FileText, Settings, Info } from "lucide-react";

type SqlJsDatabase = Database;

export default function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null);

    const views = {
        Dashboard: {
            icon: <Home className="w-5 h-5" />,
            element: <Dashboard db={db} />,
        },
        Records: {
            icon: <FileText className="w-5 h-5" />,
            element: <Records db={db} />,
        },
        Other: {
            icon: <Settings className="w-5 h-5" />,
            element: <Other />,
        },
        About: {
            icon: <Info className="w-5 h-5" />,
            element: <About />,
        },
    } as const;

    type TabName = keyof typeof views;
    const tabs = Object.keys(views) as TabName[];

    const [currentTab, setCurrentTab] = useState<TabName>(() => {
        const saved = localStorage.getItem("currentTab") as TabName | null;
        return saved && tabs.includes(saved) ? saved : tabs[0];
    });

    useEffect(() => {
        localStorage.setItem("currentTab", currentTab);
    }, [currentTab]);

    const tabItems = tabs.map((tab) => ({
        name: tab,
        icon: views[tab].icon,
        active: currentTab === tab,
        onClick: () => setCurrentTab(tab),
    }));

    return (
        <SidebarLayout
            title="MaiMai Data Reader"
            titleImageUrl={`${import.meta.env.BASE_URL}prism_plus.png`}
            controls={
                <>
                    <UploadRecords onDbLoaded={setDb} />
                    <ThemePicker />
                </>
            }
            sidebarTabs={tabItems}
        >
            {views[currentTab].element}
        </SidebarLayout>
    );
}
