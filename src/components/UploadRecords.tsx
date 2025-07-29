import { useState, type ChangeEvent } from "react"
import initSqlJs from "sql.js"

type SqlJsModule = typeof import("sql.js")
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>

interface UploadRecordsProps {
    onDbLoaded: (db: SqlJsDatabase) => void
}

const UploadRecords = ({ onDbLoaded }: UploadRecordsProps) => {
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const SQL = await initSqlJs({
            locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        })

        const buffer = await file.arrayBuffer()
        const loadedDb = new SQL.Database(new Uint8Array(buffer))

        setUploadedFileName(file.name)
        onDbLoaded(loadedDb)
        console.log("DB loaded:", file.name)
    }

    return (
        <div>
            <label className="inline-block px-3 py-1 bg-[var(--color-text)] text-[var(--color-bg)] text-sm rounded shadow hover:opacity-90 cursor-pointer relative transition-colors duration-300">
                {uploadedFileName || "Play Log DB"}
                <input
                    type="file"
                    accept=".sqlite,.db"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="absolute top-full mt-1 right-0 group-hover:opacity-100 opacity-0 transition bg-[var(--color-text)] text-[var(--color-bg)] text-xs rounded px-3 py-2 whitespace-nowrap text-left z-50 shadow-lg">
                    Upload a SQLite [.db] or [.sqlite] file
                </div>
            </label>
        </div>
    )
}

export default UploadRecords
