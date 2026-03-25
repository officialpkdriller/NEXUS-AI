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

    const msg = `
╭──〔 NEXUS-AI REPO 〕──⬣
│ 👨‍💻 Developer: ${owner}
│ ⭐ Stars: ${stars}
│ 🍴 Forks: ${forks}
│ 👁 Watchers: ${watchers}
│ 🐛 Issues: ${issues}
╰──────────────⬣
`;

    await sock.sendMessage(jid, {
      text: msg,
      footer: "Powered by Pkdriller 👑",
      buttons: [
        {
          buttonId: "open_repo",
          buttonText: { displayText: "🌐 OPEN REPO" },
          type: 1
        }
      ],
      headerType: 1
    });

  } catch (err) {

    console.log("Repo Error:", err.message);

    // fallback (ALWAYS WORKS)
    await sock.sendMessage(jid, {
      text: `
╭──〔 NEXUS-AI REPO 〕──⬣
│ ⚠️ Unable to fetch live data
│ 🔗 ${REPO_URL}
╰──────────────⬣
`
    });
  }
});
