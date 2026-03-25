'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "connect",
  categorie: "General",
  reaction: "🌐",
  nomFichier: __filename
}, async (jid, sock, ctx) => {

  const text = `
╭──〔 CONNECT WITH PKDRILLER 〕──⬣
│ 🌍 Choose a platform below
│ 🔗 Click any button to open
╰──────────────⬣
`;

  try {

    await sock.sendMessage(jid, {
      text,
      footer: "Powered by Pkdriller 👑",
      templateButtons: [
        {
          index: 1,
          urlButton: {
            displayText: "🐙 GitHub",
            url: "https://github.com/officialPkdriller"
          }
        },
        {
          index: 2,
          urlButton: {
            displayText: "📘 Facebook",
            url: "https://www.facebook.com/profile.php?id=100091580206517"
          }
        },
        {
          index: 3,
          urlButton: {
            displayText: "▶️ YouTube",
            url: "https://www.youtube.com/@Pkdriller"
          }
        },
        {
          index: 4,
          urlButton: {
            displayText: "📸 Instagram",
            url: "https://www.instagram.com/officialpkdriller?igsh=MTM0Y2p3ZHpxMXZraA=="
          }
        },
        {
          index: 5,
          urlButton: {
            displayText: "💬 Telegram",
            url: "https://t.me/dev_pkdrillerbot"
          }
        }
      ]
    });

  } catch (err) {
    console.log("Connect Error:", err.message);

    await sock.sendMessage(jid, {
      text: "❌ Failed to open connect menu"
    });
  }

});
