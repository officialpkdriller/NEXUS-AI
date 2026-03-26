const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
  nomCom: "menu",
  categorie: "Menu"
}, async (jid, sock, ctx) => {
  let { repondre } = ctx;
  let { cm } = require(__dirname + "/../framework/zokou");

  // Group commands by category
  let grouped = {};
  cm.map(cmd => {
    if (!grouped[cmd.categorie]) grouped[cmd.categorie] = [];
    grouped[cmd.categorie].push(cmd.nomCom);
  });

  // Mode check
  let mode = (s.MODE.toLowerCase() === "yes") ? "🌍 PUBLIC" : "🔒 PRIVATE";

  // Date with modern format
  moment.tz.setDefault("Etc/GMT");
  const date = moment().format("DD MMM YYYY");
  const time = moment().format("HH:mm:ss");

  // Real RAM calculation
  const totalRam = Math.round(os.totalmem() / (1024 ** 3));
  const freeRam = Math.round(os.freemem() / (1024 ** 3));
  const usedRam = totalRam - freeRam;
  
  // Modern Header with gradient-like design
  let header = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃    ✦  𝐍𝐄𝐗𝐔𝐒-𝐀𝐈  𝐏𝐑𝐄𝐌𝐈𝐔𝐌  ✦    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ▸ OWNER    : ${s.OWNER_NAME.padEnd(20)} ┃
┃ ▸ PREFIX   : ${"None".padEnd(20)} ┃
┃ ▸ MODE     : ${mode.padEnd(20)} ┃
┃ ▸ RAM      : ${usedRam}/${totalRam} GB ┃
┃ ▸ DATE     : ${date.padEnd(20)} ┃
┃ ▸ TIME     : ${time.padEnd(20)} ┃
┃ ▸ PLATFORM : ${os.platform().padEnd(20)} ┃
┃ ▸ CREATOR  : ${"PK Driller".padEnd(20)} ┃
┃ ▸ COMMANDS : ${cm.length.toString().padEnd(20)} ┃
┃ ▸ THEME    : ${"NEXUS-AI".padEnd(20)} ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`;

  // Modern Body with better organization
  let body = `\n\n📋  𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐂𝐀𝐓𝐀𝐋𝐎𝐆  📋\n`;
  body += `╔══════════════════════════════════════╗\n`;
  
  for (const cat in grouped) {
    // Add category header with emoji mapping
    const categoryEmoji = {
      'Menu': '📌',
      'Admin': '👑',
      'Group': '👥',
      'Fun': '🎮',
      'Game': '🎲',
      'Download': '📥',
      'Search': '🔍',
      'Tools': '🛠️',
      'Convert': '🔄',
      'AI': '🤖',
      'Media': '🎬',
      'Owner': '⚙️'
    };
    const emoji = categoryEmoji[cat] || '📁';
    
    body += `║ ${emoji}  ${cat.toUpperCase()}  ${emoji}\n`;
    body += `╠══════════════════════════════════════╣\n`;
    
    // Display commands in columns (3 per row for cleaner look)
    const commands = grouped[cat];
    for (let i = 0; i < commands.length; i += 3) {
      let row = commands.slice(i, i + 3);
      let line = row.map(cmd => `▸ ${cmd.padEnd(12)}`).join(" ");
      body += `║ ${line.padEnd(36)} ║\n`;
    }
    body += `╠══════════════════════════════════════╣\n`;
  }
  body += `╚══════════════════════════════════════╝`;

  // Modern Footer with animated elements
  let footer = `\n\n💎  𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒  💎\n`;
  footer += `┌──────────────────────────────────────┐\n`;
  footer += `│ 🚀 POWERED BY : PK DRILLER           │\n`;
  footer += `│ ✨ VERSION     : 2.0.0              │\n`;
  footer += `│ 💡 TIP        : .help <command>     │\n`;
  footer += `│ 🎯 STATUS     : ONLINE ✅            │\n`;
  footer += `│ 📅 YEAR       : 2026 💎             │\n`;
  footer += `└──────────────────────────────────────┘\n`;
  footer += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  footer += `      𝐓𝐇𝐀𝐍𝐊 𝐘𝐎𝐔 𝐅𝐎𝐑 𝐂𝐇𝐎𝐎𝐒𝐈𝐍𝐆 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈      \n`;
  footer += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  try {
    // Send modern menu with enhanced context info
    await sock.sendMessage(jid, {
      image: { url: "https://files.catbox.moe/e2rhpu.jpg" },
      caption: header + body + footer,
      contextInfo: {
        mentionedJid: [sock.user.id],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "✨ NEXUS-AI BOT ✨",
          body: "Next Generation WhatsApp Assistant",
          thumbnailUrl: "https://files.catbox.moe/e2rhpu.jpg",
          sourceUrl: "https://github.com",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363417804135599@newsletter",
          newsletterName: "NEXUS-AI",
          serverMessageId: -1
        }
      }
    });
  } catch (err) {
    console.error("Menu error: ", err);
    repondre("❌ Menu error: " + err);
  }
});
