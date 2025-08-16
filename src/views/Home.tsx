import type {Database} from "sql.js";

type SqlJsDatabase = Database;

function Home({db}: { db: SqlJsDatabase | null }) {
    if (!db) return <p>Please upload a database file.</p>

    try {
        const result = db.exec(`SELECT COUNT(*) as count FROM playlog`)
        const total = result[0]?.values?.[0]?.[0] || 0

        const recent = db.exec(`
      SELECT played_at FROM playlog
      ORDER BY played_at DESC
      LIMIT 1
    `)
        const latest = recent[0]?.values?.[0]?.[0] || 'N/A'

        return (
            <div>
                <p className="text-lg mb-2">Total records: <strong>{total}</strong></p>
                <p className="text-lg">Most recent play: <strong>{latest}</strong></p>
            </div>
        )
    } catch (e) {
        return <p className="text-red-600">Error querying database: {String(e)}</p>
    }
}

export default Home
