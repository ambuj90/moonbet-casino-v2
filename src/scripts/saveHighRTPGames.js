// scripts/saveHighRTPGames.js
import axios from "axios";
import fs from "fs";

async function saveGames() {
  try {
    console.log("🔍 Fetching high RTP games...");

    const { data } = await axios.get(
      "https://api.moonbet.games/wallet-service/api/games/list/high-rtp"
    );

    if (!data || !Array.isArray(data.data)) {
      console.error("❌ API format invalid");
      return;
    }

    // Format games cleanly
    const formatted = data.data.map((g) => ({
      uuid: g.uuid,
      slug: g.slug,
      name: g.name,
      provider: g.provider,
      image: g.image,
      is_mobile: g.is_mobile,
      rtp: g.rtp,
      volatility: g.volatility,
      reels_count: g.reels_count,
    }));

    // Save to JSON file
    fs.writeFileSync(
      "./src/data/high-rtp-games.json",
      JSON.stringify(formatted, null, 2)
    );

    console.log("✅ Saved high RTP games → src/data/high-rtp-games.json");
  } catch (err) {
    console.error("🔥 Error:", err.message);
  }
}

saveGames();
