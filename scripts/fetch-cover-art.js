// scripts/fetch-cover-art.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Needed because we're in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const jsonPath = path.join(__dirname, "../public/maimai_songs.json");
const imagesDir = path.join(__dirname, "../public/image/cover-art");

// Make sure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, filepath) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filepath, buffer);
        console.log(`✅ Saved: ${filepath}`);
    } catch (err) {
        console.error(`❌ Error fetching ${url}:`, err.message);
    }
}

async function main() {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    for (const song of data) {
        if (!song.image_url) continue;
        const songJacketImageUrl = `https://maimaidx-eng.com/maimai-mobile/img/Music/${song.image_url}`;
        const filename = path.basename(new URL(songJacketImageUrl).pathname);
        const filepath = path.join(imagesDir, filename);

        if (fs.existsSync(filepath)) {
            console.log(`↩️ Skipping (already exists): ${filename}`);
            continue;
        }

        console.log(`⬇️ Downloading: ${filename}`);
        await downloadImage(songJacketImageUrl, filepath);
    }

    console.log("🎉 Done fetching images!");
}

main();
