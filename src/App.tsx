import React, {useState} from "react"
import initSqlJs from "sql.js"

import Home from "./views/Home.tsx"
import Records from "./views/Records.tsx"
import Other from "./views/Other.tsx"

type SqlJsModule = typeof import("sql.js")
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>

function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null)
    const [currentTab, setCurrentTab] = useState("home")
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const SQL = await initSqlJs({
            locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        })

        const buffer = await file.arrayBuffer()
        const loadedDb = new SQL.Database(new Uint8Array(buffer))

        setDb(loadedDb)
        setUploadedFileName(file.name)
        console.log("DB loaded:", file.name)
    }

    return (
        <div className="relative min-h-screen bg-gray-50">

            {/* Upload button */}
            <div className="fixed top-4 right-4 z-50 group">
                <label
                    className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded shadow hover:bg-blue-700 cursor-pointer relative">
                    {uploadedFileName || "Play Log DB"}
                    <input
                        type="file"
                        accept=".sqlite,.db"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div
                        className="absolute top-full mt-1 right-0 group-hover:opacity-100 opacity-0 transition bg-black text-white text-xs rounded px-3 py-2 whitespace-nowrap text-left z-50 shadow-lg">
                        Upload a SQLite [.db] or [.sqlite] file
                    </div>
                </label>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-6">

                {/* Title */}
                <h1 className="text-3xl font-bold text-blue-900 mb-4 px-2">MaiMai D-Reader</h1>

                {/* Tab headers */}
                <div className="flex space-x-2 border-b border-gray-300 px-2">
                    {["home", "records", "other"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setCurrentTab(tab)}
                            className={`px-4 py-2 rounded-t-md border ${
                                currentTab === tab
                                    ? "bg-white border-gray-300 border-b-0 text-blue-600 font-semibold"
                                    : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-50"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Page content area */}
                <div className="border border-gray-300 rounded-b-lg bg-white p-4 shadow min-h-[400px]">
                    {currentTab === "home" && <Home db={db}/>}
                    {currentTab === "records" && <Records db={db}/>}
                    {currentTab === "other" && <Other/>}
                </div>
            </div>
        </div>
    )
}

export default App
