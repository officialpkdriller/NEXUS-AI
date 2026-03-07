const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "play",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) return repondre("❌ Please provide a song name or Spotify link!");

  try {
    let query = arg.join(" ");

    // Check if the input is a Spotify URL
    const isSpotifyLink = (url) => url.includes("spotify.com") || url.includes("spotify.link") || url.includes("spoti.fi");

    let spotifyUrl = "";
    let searchQuery = "";

    if (isSpotifyLink(query)) {
      spotifyUrl = query;
      searchQuery = query;
    } else {
      searchQuery = query;
    }

    // Fetch song data from API
    const response = await axios.get(`https://api.ootaizumi.web.id/downloader/spotifyplay?query=${encodeURIComponent(searchQuery)}`);
    const data = response.data.result;

    if (!data || !data.download) return repondre(`❌ No song found for "${query}"`);

    const songTitle = data.title || "Unknown Song";
    const songArtist = data.artists || "Unknown Artist";
    const duration = data.duration || "00:00";
    const thumbnail = data.image || "";
    const downloadUrl = data.download;
    const externalUrl = data.external_url || spotifyUrl || "";

    // Send fake verified contact as quoted message
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:NEXUS-AI Bot
TEL;type=CELL;waid=1234567890:+1234567890
END:VCARD`;

    // Send audio with context
    await zk.sendMessage(dest, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg",
      ptt: false
    }, {
      quoted: {
        key: { fromMe: false, participant: "0@s.whatsapp.net", id: "fakeid" },
        message: { contactMessage: { displayName: "✅ Verified", vcard } }
      }
    });

    // Send info message with buttons (optional)
    await zk.sendMessage(dest, {
      text: `🎵 *${songTitle}*\n👤 *Artist:* ${songArtist}\n⏱️ *Duration:* ${duration}\n🔗 *Source:* Spotify\n\nSelect download type:`,
      footer: "Powered by NEXUS-AI",
      buttons: [
        { buttonId: `audio_mp3 ${externalUrl || searchQuery}`, buttonText: { displayText: "🎵 MP3 Audio" }, type: 1 },
        { buttonId: `audio_doc ${externalUrl || searchQuery}`, buttonText: { displayText: "📄 Audio Document" }, type: 1 }
      ],
      headerType: 1,
      image: { url: thumbnail }
    }, { quoted: ms });

  } catch (error) {
    console.error("Play command error:", error);
    repondre(`❌ Failed to download song. Error: ${error.message}`);
  }
});
