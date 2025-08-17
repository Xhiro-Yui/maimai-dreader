import React, {useEffect, useState} from "react";
import {type Song, SongDataContext} from "./SongDataContext";

const REMOTE_URL =
    "https://raw.githubusercontent.com/temp/blah/main/maimai_songs.json"; // placeholder
const LOCAL_URL = `${import.meta.env.BASE_URL}maimai_songs.json`;

export const SongDataProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(REMOTE_URL)
            .then((resp) => {
                if (!resp.ok) return Promise.reject("Remote unavailable");
                return resp.json();
            })
            .catch(async () => {
                console.log("⚠️ Falling back to local maimai_songs.json");
                const resp = await fetch(LOCAL_URL);
                return await resp.json();
            })
            .then((data: Song[]) => setSongs(data))
            .catch(() => setError("Failed to load song data"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SongDataContext.Provider value={{songs, loading, error}}>
            {children}
        </SongDataContext.Provider>
    );
};
