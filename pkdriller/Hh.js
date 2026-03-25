'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "repo",
  categorie: "General",
  reaction: "📦",
  nomFichier: __filename
}, async (jid, sock, ctx) => {

  const REPO_API = "https://api.github.com/repos/officialPkdriller/NEXUS-AI";
  const REPO_URL = "https://github.com/officialPkdriller/NEXUS-AI";
  const DEV_WA = "https://wa.me/2547XXXXXXXX"; // Weka number yako hapa

  try {

    const res = await axios.get(REPO_API, {
      headers: { "User-Agent": "NEXUS-AI" },
      timeout: 5000
    });

    const data = res.data;

    const stars = data.stargazers_count || 0;
    const forks = data.forks_count || 0;
    const issues = data.open_issues_count || 0;
    const watchers = data.watchers_count || 0;
    const owner = data.owner.login;
    const repoName = data.name;
    const description = data.description || "No description available";
    const lastUpdate = new Date(data.updated_at).toLocaleDateString();

    const msg = `
╭──〔 NEXUS-AI REPO 〕──⬣
│ 📝 ${description.substring(0, 50)}${description.length > 50 ? '...' : ''}
│ 👨‍💻 Developer: ${owner}
│ 📁 Repo: ${repoName}
│ ⭐ Stars: ${stars}
│ 🍴 Forks: ${forks}
│ 👁 Watchers: ${watchers}
│ 🐛 Issues: ${issues}
│ 🔄 Last Update: ${lastUpdate}
╰──────────────⬣

> 🚀 Click the buttons below!
`;

    await sock.sendMessage(jid, {
      text: msg,
      footer: "Powered by NEXUS-AI | Pkdriller 👑",
      buttons: [
        {
          buttonText: { displayText: "🌐 OPEN REPO" },
          type: 1,
          url: REPO_URL // <-- THIS MAKES IT OPEN CHROME
        },
        {
          buttonText: { displayText: "👤 DEVELOPER" },
          type: 1,
          url: DEV_WA // <-- THIS MAKES IT OPEN WHATSAPP
        }
      ],
      headerType: 1,
      contextInfo: {
        externalAdReply: {
          title: "NEXUS-AI REPOSITORY",
          body: "Tap to open my GitHub repo",
          sourceUrl: REPO_URL,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: "https://files.catbox.moe/8t9n0r.jpg"
        }
      }
    });

  } catch (err) {

    console.log("Repo Error:", err.message);

    await sock.sendMessage(jid, {
      text: `
╭──〔 NEXUS-AI REPO 〕──⬣
│ ⚠️ Unable to fetch live data at the moment
│ 
│ 📦 Repository: NEXUS-AI
│ 👨‍💻 Developer: officialPkdriller
│ 🔗 Direct Link: ${REPO_URL}
│ 
│ ℹ️ Click the buttons below
╰──────────────⬣
`,
      footer: "Powered by NEXUS-AI | Pkdriller 👑",
      buttons: [
        {
          buttonText: { displayText: "🌐 OPEN REPO" },
          type: 1,
          url: REPO_URL
        },
        {
          buttonText: { displayText: "👤 DEVELOPER" },
          type: 1,
          url: DEV_WA
        }
      ],
      headerType: 1,
      contextInfo: {
        externalAdReply: {
          title: "NEXUS-AI REPOSITORY",
          body: "Click to open repo directly",
          sourceUrl: REPO_URL,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: "https://files.catbox.moe/8t9n0r.jpg"
        }
      }
    });

  }
});
