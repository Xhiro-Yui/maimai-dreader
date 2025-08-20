import {createContext, useContext} from "react";

export type Song = {
    artist: string;
    catcode: string;
    image_url: string;
    release: string;
    lev_bas: string;
    lev_adv: string;
    lev_exp: string;
    lev_mas: string;
    dx_lev_bas: string;
    dx_lev_adv: string;
    dx_lev_exp: string;
    dx_lev_mas: string;
    sort: string;
    title: string;
    title_kana: string;
    version: string;
};

export type SongDataContextType = {
    songs: Song[];
    loading: boolean;
    error: string | null;
};

export const SongDataContext = createContext<SongDataContextType | undefined>(
    undefined
);

export const useSongData = () => {
    const ctx = useContext(SongDataContext);
    if (!ctx) throw new Error("useSongData must be used within SongDataProvider");
    return ctx;
};
