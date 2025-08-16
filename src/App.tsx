import { useState } from "react"

import Header from "./components/Header"
import UploadRecords from "./components/UploadRecords"
import ThemePicker from "./components/ThemePicker"
import Tabs from "./components/Tabs"
import Layout from "./components/Layout"

import Home from "./views/Home"
import Records from "./views/Records"
import Other from "./views/Other"
import type {Database} from "sql.js";

type SqlJsDatabase = Database;

function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null)
    const tabs = ["home", "records", "other"]
    const [currentTab, setCurrentTab] = useState("home")

    const views = {
        home: <Home db={db} />,
        records: <Records db={db} />,
        other: <Other />,
    }

    return (
        <Layout>
            <div className="flex justify-end items-center gap-2 px-4 pt-4">
                <UploadRecords onDbLoaded={(db) => setDb(db)}/>
                <ThemePicker/>
            </div>
            <Header/>
            <Tabs
                tabs={tabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                views={views}
            />
        </Layout>
    )
}

export default App
