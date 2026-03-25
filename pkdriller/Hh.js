'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "𝐍𝐄𝐗𝐔𝐒-𝐀𝐈",
      serverMessageId: 1
    }
  }
};

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

    // ✅ SINGLE LOADING MESSAGE
    await sock.sendMessage(jid, { text: "⏳ Loading repository info..." });

    // ✅ SAFE AXIOS
    let data;
    try {
      const res = await axios.get(REPO_API, {
        headers: {
          "Accept": "application/vnd.github+json",
          "User-Agent": "NEXUS-AI"
        },
        timeout: 5000 // muhimu sana
      });
      data = res.data;
    } catch (e) {
      data = null;
    }

    // ✅ DEFAULT VALUES (NO CRASH)
    const stars = data?.stargazers_count || 0;
    const forks = data?.forks_count || 0;
    const issues = data?.open_issues_count || 0;
    const watchers = data?.watchers_count || 0;
    const size = data?.size || 0;
    const language = data?.language || "Unknown";
    const license = data?.license?.name || "None";

    const created = data?.created_at
      ? new Date(data.created_at).toLocaleDateString("en-GB")
      : "N/A";

    const updated = data?.updated_at
      ? new Date(data.updated_at).toLocaleString("en-GB")
      : "N/A";

    const owner = data?.owner?.login || "officialPkdriller";
    const bio = data?.description || "NEXUS-AI WhatsApp Bot";

    const caption = `
╭━━━〔 *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈 ʀᴇᴘᴏ* 〕━━━⬣
┃ 🔗 ${REPO_URL}
┃
┃ 👨‍💻 *Developer:* ${owner}
┃ 🌐 *Profile:* ${PROFILE}
┃ 🧠 *Bio:* ${bio}
┃
┣━━━〔 *Stats* 〕━━━⬣
┃ ⭐ Stars: ${stars}
┃ 🍴 Forks: ${forks}
┃ 👁 Watchers: ${watchers}
┃ 🐛 Issues: ${issues}
┃
┣━━━〔 *Info* 〕━━━⬣
┃ 💻 Language: ${language}
┃ 📦 Size: ${size} KB
┃ 📜 License: ${license}
┃ 📅 Created: ${created}
┃ 🔄 Updated: ${updated}
┃
╰━━━〔 *Powered by PKDRILLER 👑* 〕━━━⬣
`;

    await sock.sendMessage(jid, {
      image: { url: BANNER },
      caption,
      contextInfo: {
        ...newsletterContext.contextInfo,
        externalAdReply: {
          title: "NEXUS-AI REPO",
          body: "Tap to open GitHub",
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

    console.log("Repo Fatal Error:", err?.message);

    // ✅ GUARANTEED RESPONSE
    await sock.sendMessage(jid, {
      text: `⚠️ Failed to fetch repo\n🔗 ${REPO_URL}`
    });
  }
});
