import { useSongData } from "../context/data/SongDataContext";
import SongDataCard from "../components/display/SongDataCard";

function SongData() {
    const { songs, loading, error } = useSongData();

    if (loading) return <p>Loading songs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-[var(--color-header)]">
                Songs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {songs.map((s) => (
                    <SongDataCard key={s.title_kana} song={s} />
                ))}
            </div>
        </div>
    );
}

export default SongData;
