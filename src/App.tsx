import {useState} from "react"

import UploadRecords from "./components/UploadRecords"
import ThemePicker from "./components/ThemePicker"

import Home from "./views/Home.tsx"
import Records from "./views/Records.tsx"
import Other from "./views/Other.tsx"

type SqlJsModule = typeof import("sql.js")
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>

function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null)
    const [currentTab, setCurrentTab] = useState("home")
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
            <div className="relative min-h-screen">

                <UploadRecords
                    onDbLoaded={(db) => setDb(db)}
                />
                <ThemePicker/>

                <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-6">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4 px-2">MaiMai D-Reader</h1>

                    <div className="flex space-x-2 border-b border-gray-300 px-2">
                        {["home", "records", "other"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setCurrentTab(tab)}
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

                    <div
                        className="border border-[var(--color-text)] rounded-b-lg bg-[var(--color-bg)] p-4 shadow min-h-[400px] transition-colors duration-300">
                        {currentTab === "home" && <Home db={db}/>}
                        {currentTab === "records" && <Records db={db}/>}
                        {currentTab === "other" && <Other/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
