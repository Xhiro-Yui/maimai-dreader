import {useState} from "react";
import type {Song} from "../../context/data/SongDataContext";

type CoverImageProps = {
    song: Song;
    defaultSrc?: string;
};

export function CoverImage({song, defaultSrc = "/image/cover-art/default.png"}: CoverImageProps) {
    const [srcIndex, setSrcIndex] = useState(0);

    const sources = [
        `${import.meta.env.BASE_URL}/image/cover-art/${song.image_url}`,
        `https://maimaidx-eng.com/maimai-mobile/img/Music/${song.image_url}`,
        defaultSrc,
    ];

    const handleError = () => {
        setSrcIndex((prev) => (prev + 1 < sources.length ? prev + 1 : prev));
    };


    return <img
        src={sources[srcIndex]}
        alt={song.title}
        onError={handleError}
        className="w-25 h-25 rounded-lg object-cover shadow"
    />;
}
