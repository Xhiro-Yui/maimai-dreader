import { useState } from "react"

import Header from "./components/Header"
import UploadRecords from "./components/UploadRecords"
import ThemePicker from "./components/ThemePicker"
import Tabs from "./components/Tabs"
import Layout from "./components/Layout"

import Home from "./views/Home"
import Records from "./views/Records"
import Other from "./views/Other"

type SqlJsModule = typeof import("sql.js")
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>

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
            <UploadRecords onDbLoaded={(db) => setDb(db)} />
            <ThemePicker />
            <Header />
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
