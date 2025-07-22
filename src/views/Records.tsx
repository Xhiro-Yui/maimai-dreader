import { type FC } from "react";

// Extract the Database constructor type
type SqlJsModule = typeof import("sql.js");
type SqlJsDatabase = InstanceType<SqlJsModule["Database"]>;

const Records: FC<{ db: SqlJsDatabase | null }> = ({ db }) => {
    if (!db) return <p>Please upload a database file.</p>;

    try {
        const result = db.exec(`
      SELECT title, difficulty, achievement, played_at
      FROM playlog
      ORDER BY played_at DESC
    `);

        if (result.length === 0) return <p>No records found.</p>;

        // Narrow types
        const columns = result[0].columns as string[];
        const values = result[0].values as (string | number | null)[][];

        // Each row is an object with column names as keys
        const rows = values.map((row) =>
            Object.fromEntries(columns.map((col, i) => [col, row[i]])) as Record<string, string | number | null>
        );

        return (
            <table className="w-full border-collapse mt-2">
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
                {rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                        {columns.map((col) => (
                            <td key={col} className="border px-2 py-1">
                                {String(row[col])}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    } catch (e) {
        return <p className="text-red-600">Error querying records: {String(e)}</p>;
    }
};

export default Records;
