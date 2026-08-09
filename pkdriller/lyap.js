const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "play",
  description: "Download and send audio from YouTube",
  execute: async (client, message, args) => {
    if (!args[0]) {
      return message.reply("❌ Please provide a valid YouTube link!");
    }

    const url = args[0];

    // Check if the URL is valid
    if (!ytdl.validateURL(url)) {
      return message.reply("⚠️ Invalid YouTube link. Please check and try again.");
    }

    try {
      // Notify the user that download is starting
      const replyMessage = await message.reply("⏳ Downloading audio, please wait...");

      // Set file path
      const outputPath = path.resolve(__dirname, `../temp/audio-${Date.now()}.mp4`);

      // Start downloading audio
      const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
      const writeStream = fs.createWriteStream(outputPath);

      stream.pipe(writeStream);

      // Track download progress
      stream.on("progress", (chunkLength, downloaded, total) => {
        const percent = ((downloaded / total) * 100).toFixed(2);
        console.log(`Downloading... ${percent}%`);
      });

      // When download completes
      writeStream.on("finish", async () => {
        console.log("Download finished.");

        // Send the audio file
        await client.sendMessage(message.chat, { audio: fs.readFileSync(outputPath), mimetype: "audio/mp4" });

        // Clean up temporary file
        fs.unlinkSync(outputPath);

        // Edit the original reply to indicate completion
        await client.sendMessage(message.chat, "✅ Download complete! Here's your audio... *powered by KYPHER*");
      });

      // Handle errors during download
      stream.on("error", (error) => {
        console.error("Error during download:", error);
        message.reply("❌ Failed to download audio. Please try again.");
      });

    } catch (error) {
      console.error("Error executing play command:", error);
      message.reply("❌ An error occurred while processing your request.");
    }
  }
};
