import {useEffect, useState} from "react"
import SidebarLayout from "./components/layout/SidebarLayout"
import UploadRecords from "./components/UploadRecords"
import ThemePicker from "./components/ThemePicker"
import Home from "./views/Home"
import Records from "./views/Records"
import Other from "./views/Other"
import type {Database} from "sql.js"

type SqlJsDatabase = Database

export default function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null);

    const views = {
        Dashboard: <Home db={db}/>,
        Records: <Records db={db}/>,
        Other: <Other/>,
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

    return (
        <SidebarLayout<TabName>
            controls={
                <>
                    <UploadRecords onDbLoaded={setDb}/>
                    <ThemePicker/>
                </>
            }
            sidebarTabs={{tabs, currentTab, setCurrentTab}}
        >
            {views[currentTab]}
        </SidebarLayout>
    )
}
