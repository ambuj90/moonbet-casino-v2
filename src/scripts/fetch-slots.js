import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const API_URL = "https://api.moonbet.games/wallet-service/api/games/slug/";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const slugsFilePath = path.join(__dirname, "slots-slug.txt");
const outputFilePath = path.join(__dirname, "slot-games.json");

// Fetch & clean game data
async function fetchGame(slug) {
  try {
    const res = await axios.get(API_URL + encodeURIComponent(slug));

    // Your API returns: { success, data: {...actual game data...} }
    const g = res.data?.data;

    if (!g) {
      return { slug, success: false, error: "Invalid API response" };
    }

    // return CLEAN STRUCTURE
    return {
      slug,
      success: true,
      game: {
        uuid: g.uuid || g._id || slug,
        slug: g.slug,
        name: g.name || "",
        provider: g.provider || g.label || "",
        image: g.image || g.images?.[0]?.url || "",
        is_mobile: g.is_mobile ?? false,
        type: g.type || "",
        rtp: g.parameters?.rtp || null,
        volatility: g.parameters?.volatility || "",
        reels_count: g.parameters?.reels_count || "",
      },
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
  console.log("📄 Reading slugs from:", slugsFilePath);

  const slugs = fs.readFileSync(slugsFilePath, "utf-8")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const results = [];

  console.log("\n⏳ Fetching slot game data...\n");

  for (const slug of slugs) {
    console.log("➡️ Fetching:", slug);
    const result = await fetchGame(slug);
    results.push(result);
  }

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));

  console.log("\n✅ Done! File created:", outputFilePath);
}

main();
