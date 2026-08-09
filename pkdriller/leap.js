const axios = require("axios");
const yts = require("yt-search");
const { zokou } = require("../framework/zokou");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 1
    }
  }
};

//================= AUDIO - .play =================

zokou({
  nomCom: "play",
  categorie: "download",
  reaction: "🎵"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    if (!arg || !arg[0]) return repondre("❌ Please give me a title or URL.");
    const q = arg.join(" ");
    const search = await yts(q);
    const data = search.videos[0];

    if (!data) return repondre("❌ No results found.");

    const desc = `
*⫷⦁B.M.B-XMD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSIC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC!*
_By 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷_
`;

    await zk.sendMessage(dest, { image: { url: data.thumbnail }, caption: desc, ...newsletterContext }, { quoted: ms });

    // NEW API — audio
    const apiRes = await axios.get(`https://apiziaul.vercel.app/api/downloader/ytplaymp3`, {
      params: { query: q }
    });
    const json = apiRes.data;

    if (!json.status || !json.result || !json.result.downloadUrl) {
      return repondre("❌ Failed to fetch audio from API.");
    }

    const downloadUrl = json.result.downloadUrl;
    const title = json.result.title || data.title;

    await zk.sendMessage(dest, { audio: { url: downloadUrl }, mimetype: "audio/mpeg", ...newsletterContext }, { quoted: ms });
    await zk.sendMessage(dest, {
      document: { url: downloadUrl },
      mimetype: "audio/mpeg",
      fileName: title + ".mp3",
      caption: "*© B.M.B-XMD*",
      ...newsletterContext
    }, { quoted: ms });

  } catch (e) {
    console.error(e);
    repondre("❌ Error occurred, try again.");
  }
});

//================= VIDEO - .darama =================

zokou({
  nomCom: "darama",
  alias: ["video"],
  categorie: "download",
  reaction: "🎥"
}, async (dest, zk, { arg, ms, repondre }) => {
  try {
    if (!arg || !arg[0]) return repondre("❌ Please give me a title or URL.");
    const q = arg.join(" ");
    const search = await yts(q);
    const data = search.videos[0];

    if (!data) return repondre("❌ No results found.");

    const desc = `
*⫷⦁B.M.B-XMD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VIDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO!*
_By 𝙱.𝙼.𝙱-𝚃𝙴𝙲𝙷_
`;

    await zk.sendMessage(dest, { image: { url: data.thumbnail }, caption: desc, ...newsletterContext }, { quoted: ms });

    // NEW API — video (takes the YouTube URL, not a search query)
    const apiRes = await axios.get(`https://apiziaul.vercel.app/api/downloader/ytmp4`, {
      params: { url: data.url }
    });
    const json = apiRes.data;

    if (!json.status || !json.result || !json.result.downloadUrl) {
      return repondre("❌ Failed to fetch video from API. (API might be down)");
    }

    const downloadUrl = json.result.downloadUrl;
    const title = json.result.title || json.result.filename || data.title;

    await zk.sendMessage(dest, { video: { url: downloadUrl }, mimetype: "video/mp4", ...newsletterContext }, { quoted: ms });
    await zk.sendMessage(dest, {
      document: { url: downloadUrl },
      mimetype: "video/mp4",
      fileName: title + ".mp4",
      caption: "*© B.M.B-XMD*",
      ...newsletterContext
    }, { quoted: ms });

  } catch (e) {
    console.error(e);
    repondre("❌ Error occurred, try again.");
  }
});
