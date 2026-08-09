```js
const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

const BASE_URL = "https://noobs-api.top";
const BOT_NAME = "NEXUS-AI";
const DEVELOPER = "pkdriller";

// === Command: .play (Audio Play - send as voice) ===
zokou({
  nomCom: "play",
  aliases: ["music", "audio", "mziki"],
  reaction: "🎵",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ");

  try {
    if (!query) {
      await zk.sendMessage(dest, {
        text: "🎵 *NEXUS-AI*\n\n_🎧 Enter song name_\n\n📌 _.play nikuone_"
      }, { quoted: ms });
      return;
    }

    await zk.sendMessage(dest, {
      text: `🔍 *${query}*\n⏳ _Processing..._`
    }, { quoted: ms });

    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      return await zk.sendMessage(dest, {
        text: "❌ _No results_\n\n🎵 *NEXUS-AI*"
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      text: `🎵 *${video.title}*\n⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n📺 ${video.author.name}\n🔗 ${video.url}\n\n⏳ _Downloading..._`
    }, { quoted: ms });

    try {
      const apiURL = `${BASE_URL}/dipto/ytDl3?link=${video.videoId}&format=mp3`;
      const response = await axios.get(apiURL, { timeout: 60000 });

      let downloadLink =
        response.data?.downloadLink ||
        response.data?.download ||
        response.data?.url;

      if (!downloadLink) {
        console.log("Download link not found:", response.data);
        return repondre("❌ _Unable to download this song. Please try again._");
      }

      await zk.sendMessage(dest, {
        audio: { url: downloadLink },
        mimetype: "audio/mp4",
        fileName: `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`
      }, { quoted: ms });

    } catch (downloadErr) {
      console.log("Download error:", downloadErr.message);
      return repondre("❌ _Download failed. Please try again._");
    }

  } catch (error) {
    console.error("Music error:", error);

    await zk.sendMessage(dest, {
      text: `❌ _Error_\n\n🎵 *NEXUS-AI*`
    }, { quoted: ms });
  }
});
```
