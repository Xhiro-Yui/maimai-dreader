import React, {useState} from "react"
import initSqlJs from "sql.js"

import Home from "./views/Home.tsx"
import Records from "./views/Records.tsx"
import Other from "./views/Other.tsx"

import {useTheme} from "./hooks/useTheme.ts"

type SqlJsModule = typeof import("sql.js")
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>

function App() {
    const [db, setDb] = useState<SqlJsDatabase | null>(null)
    const [currentTab, setCurrentTab] = useState("home")
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

    const {theme, setTheme} = useTheme()

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
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
            <div className="relative min-h-screen">
                {/* Upload button */}
                <div className="fixed top-4 right-4 z-50 group">
                    <label
                        className="inline-block px-3 py-1 bg-[var(--color-text)] text-[var(--color-bg)] text-sm rounded shadow hover:opacity-90 cursor-pointer relative transition-colors duration-300">
                        {uploadedFileName || "Play Log DB"}
                        <input
                            type="file"
                            accept=".sqlite,.db"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div
                            className="absolute top-full mt-1 right-0 group-hover:opacity-100 opacity-0 transition bg-[var(--color-text)] text-[var(--color-bg)] text-xs rounded px-3 py-2 whitespace-nowrap text-left z-50 shadow-lg">
                            Upload a SQLite [.db] or [.sqlite] file
                        </div>
                    </label>
                </div>

                {/* Theme selector */}
                <div className="fixed bottom-4 right-4 z-50">
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as "theme-light" | "theme-dark")}
                        className="text-sm bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-text)] px-3 py-1 rounded shadow transition-colors duration-300"
                    >
                        <option value="theme-light">Light Theme</option>
                        <option value="theme-dark">Dark Theme</option>
                    </select>
                </div>

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
