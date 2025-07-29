import { type FC, useState, useMemo } from "react";

type SqlJsModule = typeof import("sql.js");
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>;

const difficultyColorClass: Record<string, string> = {
    utage: "text-[var(--color-utage-row)]",
    basic: "text-[var(--color-basic-row)]",
    advanced: "text-[var(--color-advanced-row)]",
    expert: "text-[var(--color-expert-row)]",
    master: "text-[var(--color-master-row)]",
    remaster: "text-remaster",
};

const Records: FC<{ db: SqlJsDatabase | null }> = ({ db }) => {
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState("");

    const totalRecords = useMemo(() => {
        if (!db) return 0;
        const result = db.exec(`SELECT COUNT(*) as count FROM playlog`);
        return result[0]?.values?.[0]?.[0] as number;
    }, [db]);

    const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
    const page = Math.max(1, Math.min(currentPage, totalPages));
    const offset = (page - 1) * recordsPerPage;

    const goToPage = (p: number) => {
        const clamped = Math.max(1, Math.min(p, totalPages));
        setCurrentPage(clamped);
        setInputPage("");
    };

    if (!db) return <p>Please upload a database file.</p>;

    try {
        const result = db.exec(`
            SELECT 
                title AS "Song Title", 
                difficulty AS "Difficulty", 
                achievement AS "Achievement", 
                played_at AS "Played At"
            FROM playlog
            ORDER BY played_at DESC
            LIMIT ${recordsPerPage}
            OFFSET ${offset}
        `);

        if (result.length === 0) return <p>No records found.</p>;

        const columns = result[0].columns as string[];
        const values = result[0].values as (string | number | null)[][];
        const rows = values.map((row) =>
            Object.fromEntries(columns.map((col, i) => [col, row[i]]))
        );

        const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
            (p) => p >= page - 5 && p <= page + 5
        );

        return (
            <div className="mt-2">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-blue-100">
                        {columns.map((col) => (
                            <th key={col} className="border px-2 py-1 text-left">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, idx) => {
                        const difficulty = String(row["Difficulty"]).toLowerCase();
                        const colorClass = difficultyColorClass[difficulty] ?? "";

                        return (
                            <tr key={idx} className="hover:bg-blue-50 font-semibold">
                                {columns.map((col) => (
                                    <td key={col} className="border px-2 py-1">
                                            <span className={colorClass}>
                                                {String(row[col])}
                                            </span>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                    {/* Pagination buttons */}
                    <div className="space-x-1">
                        <button
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                        >
                            ← Prev
                        </button>
                        {visiblePages.map((p) => (
                            <button
                                key={p}
                                className={`px-2 py-1 border rounded ${
                                    p === page ? "bg-blue-200 font-bold" : "hover:bg-blue-50"
                                }`}
                                onClick={() => goToPage(p)}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            onClick={() => goToPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next →
                        </button>
                    </div>

                    {/* Go to page input */}
                    <div className="flex items-center space-x-2">
                        <span>Go to page:</span>
                        <input
                            type="number"
                            className="border px-2 py-1 w-20"
                            value={inputPage}
                            onChange={(e) => setInputPage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const parsed = parseInt(inputPage, 10);
                                    if (!isNaN(parsed)) goToPage(parsed);
                                }
                            }}
                            min={1}
                            max={totalPages}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>Rows per page:</span>
                        <input
                            type="number"
                            className="border px-2 py-1 w-20"
                            value={recordsPerPage}
                            min={1}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (!isNaN(value) && value > 0) {
                                    setRecordsPerPage(value);
                                    setCurrentPage(1); // reset to page 1
                                }
                            }}
                        />
                    </div>

                </div>
            </div>
        )
    } catch (e) {
        return <p className="text-red-600">Error querying records: {String(e)}</p>;
    }
}

export default Records;
