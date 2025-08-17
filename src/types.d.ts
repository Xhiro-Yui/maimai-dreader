/// <reference types="vite/client" />

import type { Song } from "./contexts/SongDataContext";

declare module "*.json" {
    const value: Song[];
    export default value;
}
