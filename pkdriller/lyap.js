
const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

const BASE_URL = "https://noobs-api.top";

// === Command: .play (Audio Play) ===
zokou({
  nomCom: "play",
  aliases: ["music", "audio", "mziki"],
  reaction: "🎵",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {

  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ").trim();

  try {

    // =========================
    // NO QUERY
    // =========================
    if (!query) {
      await zk.sendMessage(dest, {
        text:
          "🎵 *NEXUS-AI*\n\n" +
          "🎧 Enter song name\n\n" +
          "📌 *.play nikuone*"
      }, { quoted: ms });

      return;
    }

    // =========================
    // SEARCHING
    // =========================
    await zk.sendMessage(dest, {
      text: `🔍 *${query}*\n⏳ _Processing..._`
    }, { quoted: ms });

    // =========================
    // YOUTUBE SEARCH
    // =========================
    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      return await zk.sendMessage(dest, {
        text: "❌ _No results_\n\n🎵 *NEXUS-AI*"
      }, { quoted: ms });
    }

    // =========================
    // SONG INFO
    // =========================
    await zk.sendMessage(dest, {
      text:
        `🎵 *${video.title}*\n` +
        `⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n` +
        `📺 ${video.author.name}\n` +
        `🔗 ${video.url}\n\n` +
        `⬇️ _Downloading..._`
    }, { quoted: ms });

    // =========================
    // DOWNLOAD API
    // =========================
    try {

      const apiURL =
        `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

      console.log("PLAY API:", apiURL);

      const response = await axios.get(apiURL, {
        timeout: 60000
      });

      console.log("PLAY API RESPONSE:", response.data);

      // Get download URL from API
      const downloadLink =
        response.data?.downloadLink ||
        response.data?.download ||
        response.data?.url ||
        response.data?.data?.downloadLink ||
        response.data?.data?.download ||
        response.data?.data?.url;

      // =========================
      // API DID NOT RETURN LINK
      // =========================
      if (!downloadLink) {
        console.error(
          "PLAY: No download link returned:",
          response.data
        );

        return await repondre(
          "❌ *Download failed*\n\n" +
          "The music server did not return an audio link.\n" +
          "🔄 Please try again."
        );
      }

      console.log("PLAY DOWNLOAD LINK:", downloadLink);

      // =========================
      // SEND AUDIO
      // =========================
      await zk.sendMessage(dest, {
        audio: {
          url: downloadLink
        },
        mimetype: "audio/mpeg",
        fileName:
          `${video.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp3`
      }, { quoted: ms });

      console.log(`PLAY SUCCESS: ${video.title}`);

    } catch (downloadErr) {

      console.error(
        "Download error:",
        downloadErr.response?.data ||
        downloadErr.message ||
        downloadErr
      );

      await repondre(
        "❌ *Music download failed*\n\n" +
        "The download server may be busy or unavailable.\n" +
        "🔄 Please try again."
      );
    }

  } catch (error) {

    console.error("Music error:", error);

    await zk.sendMessage(dest, {
      text:
        "❌ *Music Error*\n\n" +
        "Something went wrong while processing your request.\n\n" +
        "🎵 *NEXUS-AI*"
    }, { quoted: ms });

  }

});
```
