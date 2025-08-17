import {useSongData} from "../context/data/SongDataContext";

function SongData() {
    const {songs, loading, error} = useSongData();

    if (loading) return <p>Loading songs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Songs</h2>
            <ul>
                {songs.map((s) => (
                    <li key={s.title_kana}>{s.title} — {s.artist}</li>
                ))}
            </ul>
        </div>
    );
}

export default SongData;
