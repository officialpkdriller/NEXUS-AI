const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

// === CONFIG ===
const BASE_URL = "https://noobs-api.top";
const NEWS = {
  jid: "120363417804135599@newsletter",
  name: "NEXUS-AI CHANNEL",
  id: 143
};
const BOT = "NEXUS-AI";
const THUMB = "https://files.catbox.moe/f86jfh.jpg";

// === HELPER: Context Builder ===
const ctx = (title, body, thumb = THUMB, source = null) => ({
  isForwarded: true,
  forwardingScore: 999,
  forwardedNewsletterMessageInfo: {
    newsletterJid: NEWS.jid,
    newsletterName: NEWS.name,
    serverMessageId: NEWS.id
  },
  externalAdReply: {
    title,
    body,
    thumbnailUrl: thumb,
    mediaType: 1,
    renderSmallThumbnail: true,
    ...(source && { sourceUrl: source })
  }
});

// === UI DESIGN (UNIQUE LOOK) ===
const musicCard = (v, type) => `
╭━━〔 🎧 ${BOT} ENGINE 〕━━⬣
┃
┃ ⬡ Title     : ${v.title}
┃ ⬡ Duration  : ${v.timestamp}
┃ ⬡ Views     : ${v.views.toLocaleString()}
┃ ⬡ Channel   : ${v.author.name}
┃ ⬡ Uploaded  : ${v.ago}
┃
┃ 🔗 Link : ${v.url}
┃
┃ ⏳ Status : Processing ${type}...
┃
╰━━⬣ Powered By Pkdriller ⬣

⚡ ${BOT}
`;

// ================== PLAY ==================
zokou({
  nomCom: "play",
  aliases: ["music", "audio", "mziki"],
  reaction: "🎵",
  categorie: "Download"
}, async (dest, zk, { arg, ms }) => {

  const query = arg.join(" ");
  if (!query) {
    return zk.sendMessage(dest, {
      text: `🎵 ${BOT}\n\nGive me a song name\nExample: .play Shape of you`,
      contextInfo: ctx(BOT, "Enter song name")
    }, { quoted: ms });
  }

  await zk.sendMessage(dest, {
    text: `🔍 Searching: ${query}...`,
    contextInfo: ctx(BOT, query.slice(0, 20))
  }, { quoted: ms });

  try {
    const res = await yts(query);
    const v = res.videos[0];

    if (!v) {
      return zk.sendMessage(dest, {
        text: "❌ No results found",
        contextInfo: ctx(BOT, "No Results")
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      image: { url: v.thumbnail },
      caption: musicCard(v, "audio"),
      contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail)
    }, { quoted: ms });

    try {
      const { data } = await axios.get(`${BASE_URL}/dipto/ytDl3?link=${v.videoId}&format=mp3`, { timeout: 60000 });

      const dl = data?.downloadLink || data?.download || data?.url;
      if (!dl) return;

      await zk.sendMessage(dest, {
        audio: { url: dl },
        mimetype: "audio/mp4",
        fileName: `${v.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp3`,
        contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail, dl)
      }, { quoted: ms });

    } catch (e) {
      console.log("Audio DL Error:", e.message);
    }

  } catch (e) {
    console.log(e);
  }
});

// ================== SONG ==================
zokou({
  nomCom: "song",
  aliases: ["mp3", "audiofile"],
  reaction: "🎶",
  categorie: "Download"
}, async (dest, zk, { arg, ms }) => {

  const query = arg.join(" ");
  if (!query) {
    return zk.sendMessage(dest, {
      text: `🎶 ${BOT}\n\nProvide song name`,
      contextInfo: ctx(BOT, "Song request")
    }, { quoted: ms });
  }

  await zk.sendMessage(dest, {
    text: `🔍 Searching: ${query}...`,
    contextInfo: ctx(BOT, query.slice(0, 20))
  }, { quoted: ms });

  try {
    const res = await yts(query);
    const v = res.videos[0];

    if (!v) {
      return zk.sendMessage(dest, {
        text: "❌ No results",
        contextInfo: ctx(BOT, "No Results")
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      image: { url: v.thumbnail },
      caption: musicCard(v, "mp3"),
      contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail)
    }, { quoted: ms });

    try {
      const { data } = await axios.get(`${BASE_URL}/dipto/ytDl3?link=${v.videoId}&format=mp3`, { timeout: 60000 });

      const dl = data?.downloadLink || data?.download || data?.url;
      if (!dl) return;

      await zk.sendMessage(dest, {
        document: { url: dl },
        mimetype: "audio/mpeg",
        fileName: `${v.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp3`,
        contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail, dl)
      }, { quoted: ms });

    } catch (e) {
      console.log("MP3 DL Error:", e.message);
    }

  } catch (e) {
    console.log(e);
  }
});

// ================== VIDEO ==================
zokou({
  nomCom: "video",
  aliases: ["vid", "mp4"],
  reaction: "🎥",
  categorie: "Download"
}, async (dest, zk, { arg, ms }) => {

  const query = arg.join(" ");
  if (!query) {
    return zk.sendMessage(dest, {
      text: `🎥 ${BOT}\n\nProvide video name`,
      contextInfo: ctx(BOT, "Video request")
    }, { quoted: ms });
  }

  await zk.sendMessage(dest, {
    text: `🔍 Searching: ${query}...`,
    contextInfo: ctx(BOT, query.slice(0, 20))
  }, { quoted: ms });

  try {
    const res = await yts(query);
    const v = res.videos[0];

    if (!v) {
      return zk.sendMessage(dest, {
        text: "❌ No results",
        contextInfo: ctx(BOT, "No Results")
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      image: { url: v.thumbnail },
      caption: musicCard(v, "video"),
      contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail)
    }, { quoted: ms });

    try {
      const { data } = await axios.get(`${BASE_URL}/dipto/ytDl3?link=${v.videoId}&format=mp4`, { timeout: 60000 });

      const dl = data?.downloadLink || data?.download || data?.url;
      if (!dl) return;

      await zk.sendMessage(dest, {
        video: { url: dl },
        mimetype: "video/mp4",
        fileName: `${v.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`,
        caption: `⚡ ${BOT}`,
        contextInfo: ctx(BOT, v.title.slice(0, 25), v.thumbnail, dl)
      }, { quoted: ms });

    } catch (e) {
      console.log("Video DL Error:", e.message);
    }

  } catch (e) {
    console.log(e);
  }
});
