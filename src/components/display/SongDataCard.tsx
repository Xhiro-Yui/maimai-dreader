import React from "react";
import type { Song } from "../../context/data/SongDataContext";
import { CoverImage } from "./CoverArt";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

const SongDataCard: React.FC<{ song: Song }> = ({ song }) => {
    return (
        <Card className="mb-4">
            <div className="flex items-center space-x-4">
                <CoverImage song={song} />
                <div>
                    <h2 className="text-lg font-bold text-[var(--color-header)]">{song.title}</h2>
                    <p className="text-sm opacity-80">{song.artist}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                <p><span className="font-semibold">Category Code:</span> {song.catcode}</p>
                <p><span className="font-semibold">Release:</span> {song.release}</p>
                <p><span className="font-semibold">Sort:</span> {song.sort}</p>
                <p><span className="font-semibold">Kana:</span> {song.title_kana}</p>
                <p><span className="font-semibold">Version:</span> {song.version}</p>
            </div>

            <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Levels</h3>
                <div className="flex space-x-2">
                    <Badge level="basic">BAS {song.lev_bas || song.dx_lev_bas}</Badge>
                    <Badge level="advanced">ADV {song.lev_adv || song.dx_lev_adv}</Badge>
                    <Badge level="expert">EXP {song.lev_exp || song.dx_lev_exp}</Badge>
                    <Badge level="master">MAS {song.lev_mas || song.dx_lev_mas}</Badge>
                </div>
            </div>
        </Card>
    );
};

export default SongDataCard;
