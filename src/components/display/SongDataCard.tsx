import React from "react";
import type { Song } from "../../context/data/SongDataContext";

type SongDataCardProps = {
    song: Song;
};

const SongDataCard: React.FC<SongDataCardProps> = ({ song }) => {
    return (
        <div
            className="rounded-2xl shadow-md p-4 mb-4 border border-gray-300 dark:border-gray-700"
            style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text)",
            }}
        >

            {/* Header with song title + artist */}
            <div className="flex items-center space-x-4">
                <img
                    src={song.image_url}
                    alt={song.title}
                    className="w-20 h-20 rounded-lg object-cover shadow"
                />
                <div>
                    <h2 className="text-lg font-bold" style={{color: "var(--color-header)"}}>
                        {song.title}
                    </h2>
                    <p className="text-sm opacity-80">{song.artist}</p>
                </div>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                <p><span className="font-semibold">Catcode:</span> {song.catcode}</p>
                <p><span className="font-semibold">Release:</span> {song.release}</p>
                <p><span className="font-semibold">Sort:</span> {song.sort}</p>
                <p><span className="font-semibold">Kana:</span> {song.title_kana}</p>
                <p><span className="font-semibold">Version:</span> {song.version}</p>
            </div>

            {/* Levels row */}
            <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Levels</h3>
                <div className="flex space-x-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[var(--color-basic-row)] text-white">BAS {song.lev_bas}</span>
                    <span
                        className="px-2 py-1 rounded bg-[var(--color-advanced-row)] text-white">ADV {song.lev_adv}</span>
                    <span
                        className="px-2 py-1 rounded bg-[var(--color-expert-row)] text-white">EXP {song.lev_exp}</span>
                    <span
                        className="px-2 py-1 rounded bg-[var(--color-master-row)] text-white">MAS {song.lev_mas}</span>
                </div>
            </div>
        </div>
    );
};

export default SongDataCard;
