import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const API_URL = "https://api.moonbet.games/wallet-service/api/games/slug/";

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const slugsFilePath = path.join(__dirname, "live-slugs.txt");
const outputFilePath = path.join(__dirname, "live-games.json");

// Fetch and clean live game data
async function fetchGame(slug) {
  try {
    const res = await axios.get(API_URL + encodeURIComponent(slug));

    const g = res.data?.data;

    if (!g) {
      return { slug, success: false, error: "Invalid response" };
    }

    return {
      slug,
      success: true,
      game: {
        uuid: g.uuid || g._id || slug,
        slug: g.slug,
        name: g.name,
        provider: g.provider || g.label || "",
        image: g.image || g.images?.[0]?.url || "",
        is_mobile: g.is_mobile ?? false,
        type: g.type, // should be live
        rtp: g.parameters?.rtp,
        volatility: g.parameters?.volatility,
        reels_count: g.parameters?.reels_count,
      }
    };

  } catch (err) {
    return {
      slug,
      success: false,
      error: err.response?.data || err.message,
    };
  }
}

async function main() {
  console.log("📄 Reading live slugs from:", slugsFilePath);

  const slugs = fs.readFileSync(slugsFilePath, "utf-8")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const results = [];

  console.log("\n⏳ Fetching LIVE CASINO games...\n");

  for (const slug of slugs) {
    console.log("➡️ Fetching:", slug);
    const result = await fetchGame(slug);
    results.push(result);
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));

  console.log("\n✅ LIVE Games Saved:", outputFilePath);
}

main();
