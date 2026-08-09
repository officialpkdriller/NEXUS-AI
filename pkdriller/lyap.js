
const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

const BASE_URL = "https://noobs-api.top";

zokou(
  {
    nomCom: "play",
    aliases: ["music", "audio", "mziki"],
    reaction: "🎵",
    categorie: "Download"
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
    const query = arg.join(" ").trim();

    // ==============================
    // HELP / EMPTY QUERY
    // ==============================
    if (!query) {
      return repondre(
        "🎵 *NEXUS-AI MUSIC*\n\n" +
        "Please enter a song name.\n\n" +
        "📌 Example:\n" +
        "`.play nikuone`"
      );
    }

    try {
      // ==============================
      // SEARCH YOUTUBE
      // ==============================
      await zk.sendMessage(
        dest,
        {
          text: `🔎 Searching for *${query}*...\n\n⏳ Please wait...`
        },
        { quoted: ms }
      );

      const search = await yts(query);

      if (!search || !search.videos || !search.videos.length) {
        return repondre(
          `❌ No results found for *${query}*.\n\n🎵 Try another song name.`
        );
      }

      const video = search.videos[0];

      if (!video.videoId) {
        return repondre("❌ Unable to get the YouTube video ID.");
      }

      // ==============================
      // SONG INFORMATION
      // ==============================
      const title = video.title || "Unknown Song";
      const duration = video.timestamp || "Unknown";
      const views = video.views
        ? Number(video.views).toLocaleString()
        : "Unknown";
      const author = video.author?.name || "Unknown Artist";

      await zk.sendMessage(
        dest,
        {
          text:
            `🎵 *${title}*\n\n` +
            `👤 Artist: ${author}\n` +
            `⏱️ Duration: ${duration}\n` +
            `👁️ Views: ${views}\n\n` +
            `⬇️ Downloading audio...`
        },
        { quoted: ms }
      );

      // ==============================
      // DOWNLOAD FROM API
      // ==============================
      const apiURL =
        `${BASE_URL}/dipto/ytDl3` +
        `?link=${encodeURIComponent(video.videoId)}` +
        `&format=mp3`;

      console.log("PLAY API:", apiURL);

      const response = await axios.get(apiURL, {
        timeout: 90000,
        responseType: "arraybuffer",
        validateStatus: () => true
      });

      // ==============================
      // CHECK HTTP STATUS
      // ==============================
      if (response.status < 200 || response.status >= 300) {
        console.error(
          "Play API HTTP error:",
          response.status,
          response.data?.toString?.()
        );

        return repondre(
          `❌ Download server returned HTTP ${response.status}.\n\n` +
          `Please try again later.`
        );
      }

      const contentType =
        response.headers["content-type"] || "";

      let audioBuffer = null;

      // ==============================
      // CASE 1:
      // API RETURNS DIRECT AUDIO
      // ==============================
      if (
        contentType.includes("audio") ||
        contentType.includes("mpeg") ||
        contentType.includes("octet-stream")
      ) {
        audioBuffer = Buffer.from(response.data);
      }

      // ==============================
      // CASE 2:
      // API RETURNS JSON
      // ==============================
      if (!audioBuffer) {
        let data;

        try {
          const rawData = Buffer.from(response.data).toString("utf8");
          data = JSON.parse(rawData);
        } catch (jsonError) {
          console.error(
            "Could not parse API response:",
            jsonError.message
          );

          return repondre(
            "❌ The music server returned an invalid response."
          );
        }

        const downloadLink =
          data?.downloadLink ||
          data?.download ||
          data?.url ||
          data?.data?.downloadLink ||
          data?.data?.download ||
          data?.data?.url;

        if (!downloadLink) {
          console.error(
            "No download URL found in API response:",
            data
          );

          return repondre(
            "❌ Music download link was not returned by the server.\n\n" +
            "🔄 Please try again."
          );
        }

        // ==============================
        // DOWNLOAD ACTUAL AUDIO
        // ==============================
        const audioResponse = await axios.get(downloadLink, {
          timeout: 90000,
          responseType: "arraybuffer",
          validateStatus: () => true
        });

        if (
          audioResponse.status < 200 ||
          audioResponse.status >= 300
        ) {
          return repondre(
            `❌ Failed to fetch the audio file (HTTP ${audioResponse.status}).`
          );
        }

        audioBuffer = Buffer.from(audioResponse.data);
      }

      // ==============================
      // CHECK FILE SIZE
      // ==============================
      if (!audioBuffer || !audioBuffer.length) {
        return repondre(
          "❌ The downloaded audio file is empty."
        );
      }

      console.log(
        `Audio downloaded successfully: ${(
          audioBuffer.length /
          1024 /
          1024
        ).toFixed(2)} MB`
      );

      // ==============================
      // SEND AUDIO
      // ==============================
      const safeTitle = title
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 100);

      await zk.sendMessage(
        dest,
        {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          fileName: `${safeTitle || "NEXUS-AI"}.mp3`,
          ptt: false
        },
        { quoted: ms }
      );

      console.log(`PLAY SUCCESS: ${title}`);

    } catch (error) {
      console.error("PLAY COMMAND ERROR:", error);

      let message = "❌ Failed to download the song.";

      if (error.code === "ECONNABORTED") {
        message =
          "⏱️ The download server took too long to respond.\n\n" +
          "Please try again.";
      } else if (error.response) {
        message =
          `❌ Download server error: HTTP ${error.response.status}`;
      } else if (error.message) {
        console.error("Error message:", error.message);
      }

      return repondre(
        `${message}\n\n🎵 *NEXUS-AI*`
      );
    }
  }
);
```
