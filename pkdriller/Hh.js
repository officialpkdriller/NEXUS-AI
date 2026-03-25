'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363417804135599@newsletter",
      newsletterName: "𝐍𝐄𝐗𝐔𝐒-𝐀𝐈",
      serverMessageId: 1
    }
  }
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

zokou({
  nomCom: "repo",
  categorie: "General",
  reaction: "🚀",
  nomFichier: __filename
}, async (jid, sock, ctx) => {

  const REPO_API = "https://api.github.com/repos/officialPkdriller/NEXUS-AI";
  const REPO_URL = "https://github.com/officialPkdriller/NEXUS-AI";
  const PROFILE = "https://github.com/officialPkdriller";

  const BANNER = "https://files.catbox.moe/bx4dii.jpg";
  const AUDIO = "https://files.catbox.moe/bcmkyc.mp3";

  try {

    // 🔄 FAKE PROGRESS ANIMATION
    await sock.sendMessage(jid, { text: "🔍 Fetching repository data..." });
    await delay(800);
    await sock.sendMessage(jid, { text: "📡 Connecting to GitHub API..." });
    await delay(800);
    await sock.sendMessage(jid, { text: "⚙️ Processing data..." });
    await delay(800);

    const { data } = await axios.get(REPO_API, {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "NEXUS-AI"
      },
      timeout: 10000
    });

    const stars = data.stargazers_count || 0;
    const forks = data.forks_count || 0;
    const issues = data.open_issues_count || 0;
    const watchers = data.watchers_count || 0;
    const size = data.size || 0;
    const language = data.language || "Unknown";
    const license = data.license?.name || "None";

    const created = new Date(data.created_at).toLocaleDateString("en-GB");
    const updated = new Date(data.updated_at).toLocaleString("en-GB");

    const owner = data.owner.login;
    const bio = data.description || "No description";

    const caption = `
╭━━━〔 *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈 ʀᴇᴘᴏ* 〕━━━⬣
┃ 🚀 *ʀᴇᴘᴏ:* 
┃ ${REPO_URL}
┃
┃ 👨‍💻 *ᴅᴇᴠᴇʟᴏᴘᴇʀ:* ${owner}
┃ 🌐 *ᴘʀᴏғɪʟᴇ:* ${PROFILE}
┃ 🧠 *ʙɪᴏ:* ${bio}
┃
┣━━━〔 *sᴛᴀᴛɪsᴛɪᴄs* 〕━━━⬣
┃ 🌟 *sᴛᴀʀs:* ${stars}
┃ 🍴 *ғᴏʀᴋs:* ${forks}
┃ 👁 *ᴡᴀᴛᴄʜᴇʀs:* ${watchers}
┃ 🐞 *ɪssᴜᴇs:* ${issues}
┃
┣━━━〔 *ᴘʀᴏᴊᴇᴄᴛ ɪɴғᴏ* 〕━━━⬣
┃ 💻 *ʟᴀɴɢᴜᴀɢᴇ:* ${language}
┃ 📦 *sɪᴢᴇ:* ${size} KB
┃ 📜 *ʟɪᴄᴇɴsᴇ:* ${license}
┃ 📅 *ᴄʀᴇᴀᴛᴇᴅ:* ${created}
┃ 🔄 *ᴜᴘᴅᴀᴛᴇᴅ:* ${updated}
┃
╰━━━〔 *𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐏𝐊𝐃𝐑𝐈𝐋𝐋𝐄𝐑 👑* 〕━━━⬣
`;

    await sock.sendMessage(jid, {
      image: { url: BANNER },
      caption,
      footer: "NEXUS-AI • GitHub Repository",
      buttons: [
        {
          buttonId: "repo_open",
          buttonText: { displayText: "🌐 OPEN REPO" },
          type: 1
        }
      ],
      headerType: 4,
      contextInfo: {
        ...newsletterContext.contextInfo,
        externalAdReply: {
          title: "NEXUS-AI REPOSITORY",
          body: "Click to view full project on GitHub",
          thumbnailUrl: BANNER,
          sourceUrl: REPO_URL,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

    await sock.sendMessage(jid, {
      audio: { url: AUDIO },
      mimetype: "audio/mp4",
      ptt: false,
      ...newsletterContext
    });

  } catch (err) {

    console.log("Repo Error:", err?.message);

    const fallback = `
╭━━━〔 *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈* 〕━━━⬣
┃ ⚠️ *Live stats unavailable*
┃
┃ 🔗 ${REPO_URL}
┃ 👨‍💻 Developer: officialPkdriller
╰━━━━━━━━━━━━━━━⬣
`;

    await sock.sendMessage(jid, {
      image: { url: BANNER },
      caption: fallback,
      ...newsletterContext
    });

    await sock.sendMessage(jid, {
      audio: { url: AUDIO },
      mimetype: "audio/mp4",
      ptt: false,
      ...newsletterContext
    });
  }
});
