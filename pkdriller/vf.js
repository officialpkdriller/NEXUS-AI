const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "play",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {

  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) return repondre("🎵 Please provide a song name!");

  try {

    const query = arg.join(" ");

    // 🔍 Search YouTube
    const search = await axios.get(`https://apis.davidcyriltech.my.id/youtube/search?query=${encodeURIComponent(query)}`);
    const results = search.data.result.slice(0, 5);

    if (!results.length) return repondre("❌ No results found!");

    let text = `🎧 *NEXUS-AI MUSIC SEARCH*\n\n`;
    results.forEach((v, i) => {
      text += `*${i + 1}.* ${v.title}\n⏱ ${v.duration}\n\n`;
    });

    text += `Reply with number (1-5) to download 🎶`;

    // 📩 Send list
    const msg = await zk.sendMessage(dest, {
      text: text
    }, { quoted: ms });

    // 🧠 Wait for reply
    zk.ev.on("messages.upsert", async ({ messages }) => {
      const reply = messages[0];

      if (!reply.message) return;
      if (reply.key.remoteJid !== dest) return;
      if (!reply.message.conversation && !reply.message.extendedTextMessage) return;

      const body = reply.message.conversation || reply.message.extendedTextMessage.text;

      const choice = parseInt(body);

      if (isNaN(choice) || choice < 1 || choice > 5) return;

      const selected = results[choice - 1];

      await zk.sendMessage(dest, {
        text: `⏳ Downloading *${selected.title}*...`
      }, { quoted: reply });

      // 🎵 Download MP3 using Gifted API
      const apiUrl = `https://api.giftedtech.co.ke/api/download/ytmp3?apikey=gifted&url=${selected.url}`;

      const res = await axios.get(apiUrl);
      const audioUrl = res.data.result.download_url;

      // 📤 Send Audio
      await zk.sendMessage(dest, {
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        fileName: `${selected.title}.mp3`
      }, { quoted: reply });

    });

  } catch (e) {
    console.log(e);
    repondre("❌ Error occurred while processing your request.");
  }

});
