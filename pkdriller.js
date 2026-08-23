'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x50c0f, _0x2c795a, _0x3e0982, _0x468796) {
  if (_0x468796 === undefined) {
    _0x468796 = _0x3e0982;
  }
  var _0x9ab34c = Object.getOwnPropertyDescriptor(_0x2c795a, _0x3e0982);
  if (!_0x9ab34c || ("get" in _0x9ab34c ? !_0x2c795a.__esModule : _0x9ab34c.writable || _0x9ab34c.configurable)) {
    _0x9ab34c = {
      'enumerable': true,
      'get': function () {
        return _0x2c795a[_0x3e0982];
      }
    };
  }
  Object.defineProperty(_0x50c0f, _0x468796, _0x9ab34c);
} : function (_0x5677b0, _0x1fc39c, _0x366b8b, _0x3839f7) {
  if (_0x3839f7 === undefined) {
    _0x3839f7 = _0x366b8b;
  }
  _0x5677b0[_0x3839f7] = _0x1fc39c[_0x366b8b];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x4e536a, _0xa5b63b) {
  Object.defineProperty(_0x4e536a, 'default', {
    'enumerable': true,
    'value': _0xa5b63b
  });
} : function (_0x52bdd7, _0x36e46c) {
  _0x52bdd7["default"] = _0x36e46c;
});
var __importStar = this && this.__importStar || function (_0x23eb7d) {
  if (_0x23eb7d && _0x23eb7d.__esModule) {
    return _0x23eb7d;
  }
  var _0x2fad32 = {};
  if (_0x23eb7d != null) {
    for (var _0x1e483a in _0x23eb7d) if (_0x1e483a !== 'default' && Object.prototype.hasOwnProperty.call(_0x23eb7d, _0x1e483a)) {
      __createBinding(_0x2fad32, _0x23eb7d, _0x1e483a);
    }
  }
  __setModuleDefault(_0x2fad32, _0x23eb7d);
  return _0x2fad32;
};
var __importDefault = this && this.__importDefault || function (_0x1cc369) {
  return _0x1cc369 && _0x1cc369.__esModule ? _0x1cc369 : {
    'default': _0x1cc369
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require('@hapi/boom');
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require('./bdd/antilien');
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 0xbb8;
app.use(express['static'](path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log("🚀 NEXUS-AI Server is running at http://localhost:" + PORT);
});
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("🔐 Connecting...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    }
  } catch (_0xa2a8b) {
    console.log("❌ Session Invalid: " + _0xa2a8b);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});

// ============= AUTO ABOUT WITH LIFE QUOTES, DATE & TIME =============
const lifeQuotes = [
  "🌟 Believe you can and you're halfway there. - Theodore Roosevelt",
  "💪 The only way to do great work is to love what you do. - Steve Jobs",
  "✨ Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "🌱 The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "🚀 Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "🌈 Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
  "💫 The best way to predict the future is to create it. - Peter Drucker",
  "🌻 It does not matter how slowly you go as long as you do not stop. - Confucius",
  "🔥 Everything you've ever wanted is on the other side of fear. - George Addair",
  "💖 Be the change that you wish to see in the world. - Mahatma Gandhi",
  "⭐ Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "🌸 Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
  "🎯 The secret of getting ahead is getting started. - Mark Twain",
  "💎 What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  "🌙 Dream big and dare to fail. - Norman Vaughan",
  "🌟 The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "💪 It always seems impossible until it's done. - Nelson Mandela",
  "✨ Keep your face always toward the sunshine, and shadows will fall behind you. - Walt Whitman",
  "🌈 You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "🚀 The harder you work for something, the greater you'll feel when you achieve it.",
  "💖 Be yourself; everyone else is already taken. - Oscar Wilde",
  "⭐ The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "🔥 Don't wait. The time will never be just right. - Napoleon Hill",
  "🌻 What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  "💫 Act as if what you do makes a difference. It does. - William James"
];

function getFormattedDateTime() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${dayName}, ${month} ${date}, ${year} | ${hours}:${minutes} ${ampm}`;
}

async function updateAutoAbout(client) {
  try {
    const randomIndex = Math.floor(Math.random() * lifeQuotes.length);
    const quote = lifeQuotes[randomIndex];
    const dateTime = getFormattedDateTime();
    const newAbout = `${quote}\n\n📅 ${dateTime}\n🤖 NEXUS-AI • Online`;
    
    await client.updateProfileStatus(newAbout);
    console.log(`✅ Auto-about updated: ${quote.substring(0, 50)}... | ${dateTime}`);
  } catch (error) {
    console.log("❌ Failed to update about:", error.message);
  }
}

let aboutInterval = null;
function startAutoAbout(client) {
  if (aboutInterval) clearInterval(aboutInterval);
  aboutInterval = setInterval(() => {
    if (client && client.user) {
      updateAutoAbout(client);
    }
  }, 30000);
  setTimeout(() => {
    if (client && client.user) {
      updateAutoAbout(client);
    }
  }, 5000);
}
// ============= END AUTO ABOUT =============

// ============= FIX: Proper error handlers =============
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error.message);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});
// ============= END ERROR HANDLERS =============

// ============= FIX: Store cleanup to prevent memory leak =============
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  for (const chatId in store.chats) {
    if (store.chats[chatId] && Array.isArray(store.chats[chatId])) {
      store.chats[chatId] = store.chats[chatId].filter(msg => {
        const msgTime = msg.messageTimestamp || 0;
        return msgTime * 1000 > oneHourAgo;
      });
      if (store.chats[chatId].length > 100) {
        store.chats[chatId] = store.chats[chatId].slice(-100);
      }
    }
  }
}, 3600000);
// ============= END STORE CLEANUP =============

// ============= FIXED DECODE JID FUNCTION =============
function decodeJid(jid) {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
    let decoded = baileys_1.jidDecode(jid) || {};
    return decoded.user && decoded.server && decoded.user + '@' + decoded.server || jid;
  } else {
    return jid;
  }
}

// ============= NEW: GROUP WELCOME STYLED MESSAGE =============
async function sendStyledWelcome(sock, groupId, participants, groupMetadata) {
  try {
    let welcomeMsg = `╔══════════════════════╗\n`;
    welcomeMsg += `  🎉 *WELCOME TO NEXUS FAMILY* 🎉\n`;
    welcomeMsg += `╚══════════════════════╝\n\n`;
    
    for (let participant of participants) {
      const name = participant.split('@')[0];
      welcomeMsg += `👋 *Hey @${name}* \n`;
    }
    
    welcomeMsg += `\n📌 *Group:* ${groupMetadata.subject || 'NEXUS Group'}\n`;
    welcomeMsg += `👥 *Members:* ${groupMetadata.participants ? groupMetadata.participants.length : 'N/A'}\n`;
    welcomeMsg += `🔰 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}\n\n`;
    welcomeMsg += `━━━━━━━━━━━━━━━━━━━━\n`;
    welcomeMsg += `📜 *RULES:*\n`;
    welcomeMsg += `• ❌ No spam or promotional links\n`;
    welcomeMsg += `• ❌ No hate speech or harassment\n`;
    welcomeMsg += `• ❌ No NSFW content\n`;
    welcomeMsg += `• ✅ Respect all members\n`;
    welcomeMsg += `• ✅ Follow group description\n`;
    welcomeMsg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    welcomeMsg += `💫 *Enjoy your stay!* 💫\n`;
    welcomeMsg += `🤖 Powered by NEXUS-AI`;
    
    let ppUrl = '';
    try {
      ppUrl = await sock.profilePictureUrl(groupId, 'image');
    } catch {
      ppUrl = 'https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/nexus.jpg';
    }
    
    await sock.sendMessage(groupId, {
      'image': { 'url': ppUrl },
      'caption': welcomeMsg,
      'mentions': participants
    });
    
    console.log(`✅ Welcome message sent to ${groupId}`);
  } catch (error) {
    console.log("❌ Welcome message error:", error);
  }
}

// ============= NEW: GROUP GOODBYE STYLED MESSAGE =============
async function sendStyledGoodbye(sock, groupId, participants, groupMetadata) {
  try {
    let goodbyeMsg = `╔══════════════════════╗\n`;
    goodbyeMsg += `  👋 *GOODBYE NEXUS MEMBER* 👋\n`;
    goodbyeMsg += `╚══════════════════════╝\n\n`;
    
    for (let participant of participants) {
      const name = participant.split('@')[0];
      goodbyeMsg += `😢 *@${name}* has left the group\n`;
    }
    
    const now = new Date();
    goodbyeMsg += `\n📅 *Time:* ${now.toLocaleTimeString()}\n`;
    goodbyeMsg += `📌 *Group:* ${groupMetadata.subject || 'NEXUS Group'}\n`;
    goodbyeMsg += `👥 *Remaining:* ${groupMetadata.participants ? groupMetadata.participants.length : 'N/A'}\n\n`;
    goodbyeMsg += `━━━━━━━━━━━━━━━━━━━━\n`;
    goodbyeMsg += `💔 *We'll miss you!*\n`;
    goodbyeMsg += `🤖 Powered by NEXUS-AI`;
    
    await sock.sendMessage(groupId, {
      'text': goodbyeMsg,
      'mentions': participants
    });
    
    console.log(`✅ Goodbye message sent to ${groupId}`);
  } catch (error) {
    console.log("❌ Goodbye message error:", error);
  }
}

// ============= FIXED: ANTI-DELETE WITH ALL MEDIA TYPES =============
async function sendStyledAntiDelete(sock, ownerJid, deletedMsg, sender, sockInstance) {
  try {
    const senderName = sender.split('@')[0];
    let msg = `╔══════════════════════════╗\n`;
    msg += `  🚫 *ANTI-DELETE ALERT* 🚫\n`;
    msg += `╚══════════════════════════╝\n\n`;
    msg += `👤 *User:* @${senderName}\n`;
    msg += `⏰ *Time:* ${new Date().toLocaleString()}\n\n`;
    msg += `📝 *Deleted Message:*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    
    // Check for conversation (text)
    if (deletedMsg.message.conversation) {
      msg += `💬 ${deletedMsg.message.conversation}\n`;
      await sock.sendMessage(ownerJid, {
        'text': msg,
        'mentions': [sender]
      });
      return;
    }
    
    // Check for extended text message
    if (deletedMsg.message.extendedTextMessage) {
      const text = deletedMsg.message.extendedTextMessage.text || '';
      msg += `💬 ${text}\n`;
      await sock.sendMessage(ownerJid, {
        'text': msg,
        'mentions': [sender]
      });
      return;
    }
    
    // IMAGE MESSAGE
    if (deletedMsg.message.imageMessage) {
      msg += `🖼️ *Image Deleted*\n`;
      msg += `📝 Caption: ${deletedMsg.message.imageMessage.caption || 'No caption'}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      try {
        // Download the image
        const imageBuffer = await sockInstance.downloadMediaMessage(deletedMsg, 'image');
        await sock.sendMessage(ownerJid, {
          'image': imageBuffer,
          'caption': msg,
          'mentions': [sender]
        });
      } catch (downloadError) {
        console.log("❌ Failed to download image:", downloadError);
        msg += `\n⚠️ *Could not recover image*`;
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      }
      return;
    }
    
    // VIDEO MESSAGE
    if (deletedMsg.message.videoMessage) {
      msg += `🎥 *Video Deleted*\n`;
      msg += `📝 Caption: ${deletedMsg.message.videoMessage.caption || 'No caption'}\n`;
      msg += `⏱️ Duration: ${deletedMsg.message.videoMessage.seconds || 'N/A'}s\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      try {
        const videoBuffer = await sockInstance.downloadMediaMessage(deletedMsg, 'video');
        await sock.sendMessage(ownerJid, {
          'video': videoBuffer,
          'caption': msg,
          'mentions': [sender]
        });
      } catch (downloadError) {
        console.log("❌ Failed to download video:", downloadError);
        msg += `\n⚠️ *Could not recover video*`;
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      }
      return;
    }
    
    // AUDIO / VOICE MESSAGE
    if (deletedMsg.message.audioMessage) {
      const isVoice = deletedMsg.message.audioMessage.ptt === true;
      msg += isVoice ? `🎤 *Voice Message Deleted*\n` : `🎵 *Audio Deleted*\n`;
      msg += `⏱️ Duration: ${deletedMsg.message.audioMessage.seconds || 'N/A'}s\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      try {
        const audioBuffer = await sockInstance.downloadMediaMessage(deletedMsg, 'audio');
        await sock.sendMessage(ownerJid, {
          'audio': audioBuffer,
          'mimetype': 'audio/mp4',
          'ptt': isVoice || false,
          'caption': msg,
          'mentions': [sender]
        });
      } catch (downloadError) {
        console.log("❌ Failed to download audio:", downloadError);
        msg += `\n⚠️ *Could not recover audio*`;
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      }
      return;
    }
    
    // STICKER MESSAGE
    if (deletedMsg.message.stickerMessage) {
      msg += `🎨 *Sticker Deleted*\n`;
      msg += `📦 Pack: ${deletedMsg.message.stickerMessage.packId || 'Unknown'}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      try {
        const stickerBuffer = await sockInstance.downloadMediaMessage(deletedMsg, 'sticker');
        await sock.sendMessage(ownerJid, {
          'sticker': stickerBuffer,
          'mentions': [sender]
        });
        // Send text separately for sticker (can't have caption with sticker)
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      } catch (downloadError) {
        console.log("❌ Failed to download sticker:", downloadError);
        msg += `\n⚠️ *Could not recover sticker*`;
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      }
      return;
    }
    
    // DOCUMENT MESSAGE
    if (deletedMsg.message.documentMessage) {
      msg += `📄 *Document Deleted*\n`;
      msg += `📝 Title: ${deletedMsg.message.documentMessage.title || 'Untitled'}\n`;
      msg += `📏 Size: ${(deletedMsg.message.documentMessage.fileLength || 0) / 1024} KB\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      try {
        const docBuffer = await sockInstance.downloadMediaMessage(deletedMsg, 'document');
        await sock.sendMessage(ownerJid, {
          'document': docBuffer,
          'mimetype': deletedMsg.message.documentMessage.mimetype || 'application/octet-stream',
          'fileName': deletedMsg.message.documentMessage.title || 'document',
          'caption': msg,
          'mentions': [sender]
        });
      } catch (downloadError) {
        console.log("❌ Failed to download document:", downloadError);
        msg += `\n⚠️ *Could not recover document*`;
        await sock.sendMessage(ownerJid, {
          'text': msg,
          'mentions': [sender]
        });
      }
      return;
    }
    
    // CONTACT MESSAGE
    if (deletedMsg.message.contactMessage) {
      msg += `👤 *Contact Deleted*\n`;
      msg += `📛 Name: ${deletedMsg.message.contactMessage.displayName || 'Unknown'}\n`;
      msg += `📱 Number: ${deletedMsg.message.contactMessage.vcard ? 'VCard attached' : 'N/A'}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      await sock.sendMessage(ownerJid, {
        'text': msg,
        'mentions': [sender]
      });
      return;
    }
    
    // LOCATION MESSAGE
    if (deletedMsg.message.locationMessage) {
      msg += `📍 *Location Deleted*\n`;
      msg += `🌐 Lat: ${deletedMsg.message.locationMessage.degreesLatitude || 'N/A'}\n`;
      msg += `🌐 Long: ${deletedMsg.message.locationMessage.degreesLongitude || 'N/A'}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
      
      await sock.sendMessage(ownerJid, {
        'text': msg,
        'mentions': [sender]
      });
      return;
    }
    
    // Default fallback
    msg += `📎 *Media/File was deleted*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `🔞 *NEXUS-AI doesn't allow message deletion!*`;
    await sock.sendMessage(ownerJid, {
      'text': msg,
      'mentions': [sender]
    });
    
    console.log(`✅ Anti-delete alert sent for ${sender}`);
  } catch (error) {
    console.log("❌ Anti-delete styled message error:", error);
  }
}

// ============= NEW: BOT CONNECTION STYLED MESSAGE =============
async function sendStyledConnectionMessage(sock, userJid, mode, prefix) {
  try {
    let msg = `╔═══════════════════════════════╗\n`;
    msg += `  🤖 *NEXUS-AI BOT ONLINE* 🤖\n`;
    msg += `╚═══════════════════════════════╝\n\n`;
    msg += `┌─────────────────────────────┐\n`;
    msg += `│ 🔥 *Status:* ✅ Online      │\n`;
    msg += `│ 🎯 *Prefix:* [ ${prefix} ]  │\n`;
    msg += `│ 🌍 *Mode:* ${mode}          │\n`;
    msg += `│ 📱 *Bot:* NEXUS-AI         │\n`;
    msg += `│ 🛡️ *Version:* v2.0.0       │\n`;
    msg += `└─────────────────────────────┘\n\n`;
    msg += `📌 *Commands:*\n`;
    msg += `• ${prefix}help - Show all commands\n`;
    msg += `• ${prefix}ping - Check bot status\n`;
    msg += `• ${prefix}menu - Bot menu\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💖 *Powered by NEXUS-AI*\n`;
    msg += `📢 Channel: https://whatsapp.com/channel/0029VbAchaI59PwSijs6a81f`;
    
    await sock.sendMessage(userJid, { 'text': msg });
    console.log(`✅ Connection message sent to ${userJid}`);
  } catch (error) {
    console.log("❌ Connection message error:", error);
  }
}

// ============= MAIN BOT SETUP =============
setTimeout(() => {
  async function _0x1b1480() {
    0x0;
    const {
      version: _0x3729c6,
      isLatest: _0x2bc48f
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0xfe616d,
      saveCreds: _0x43ea6e
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0x34e3ed = {
      'version': _0x3729c6,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["NEXUS-AI", "Chrome", '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0xfe616d.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0xfe616d.keys, logger)
      },
      'getMessage': async _0x415751 => {
        if (store) {
          const _0x47b422 = await store.loadMessage(_0x415751.remoteJid, _0x415751.id, undefined);
          return _0x47b422.message || undefined;
        }
        return {
          'conversation': "⚠️ An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x243e88 = baileys_1["default"](_0x34e3ed);
    store.bind(_0x243e88.ev);
    const _0x32404a = new Map();
    function _0x507042(_0x3dc481) {
      const _0x155b79 = Date.now();
      if (!_0x32404a.has(_0x3dc481)) {
        _0x32404a.set(_0x3dc481, _0x155b79);
        return false;
      }
      const _0x42a7dd = _0x32404a.get(_0x3dc481);
      if (_0x155b79 - _0x42a7dd < 0xbb8) {
        return true;
      }
      _0x32404a.set(_0x3dc481, _0x155b79);
      return false;
    }
    const _0xe9147a = new Map();
    async function _0x29c430(_0x1d4240, _0xd3aa26) {
      if (_0xe9147a.has(_0xd3aa26)) {
        return _0xe9147a.get(_0xd3aa26);
      }
      try {
        const _0x461194 = await _0x1d4240.groupMetadata(_0xd3aa26);
        _0xe9147a.set(_0xd3aa26, _0x461194);
        setTimeout(() => _0xe9147a['delete'](_0xd3aa26), 0xea60);
        return _0x461194;
      } catch (_0xb096db) {
        if (_0xb096db.message && _0xb096db.message.includes("rate-overlimit")) {
          await new Promise(_0x277665 => setTimeout(_0x277665, 0x1388));
        }
        return null;
      }
    }
    
    // ============= FIXED: ANTI-DELETE WITH ALL MEDIA TYPES =============
    _0x243e88.ev.on("messages.upsert", async _0x43b2d7 => {
      if (conf.ANTIDELETE1 === "yes") {
        const { messages: _0x17eec3 } = _0x43b2d7;
        const _0x20b50c = _0x17eec3[0x0];
        if (!_0x20b50c.message) return;
        
        const _0x48820c = _0x20b50c.key;
        const _0x213692 = _0x48820c.remoteJid;
        
        // Skip status updates
        if (_0x213692 === "status@broadcast") return;
        
        if (!store.chats[_0x213692]) {
          store.chats[_0x213692] = [];
        }
        store.chats[_0x213692].push(_0x20b50c);
        
        if (store.chats[_0x213692].length > 100) {
          store.chats[_0x213692] = store.chats[_0x213692].slice(-100);
        }
        
        // Check for protocolMessage (deleted message)
        if (_0x20b50c.message.protocolMessage && _0x20b50c.message.protocolMessage.type === 0x0) {
          const _0x4c6c05 = _0x20b50c.message.protocolMessage.key;
          const _0x1d7b3e = store.chats[_0x213692];
          const _0x475212 = _0x1d7b3e.find(_0x341e45 => _0x341e45.key.id === _0x4c6c05.id);
          
          if (_0x475212) {
            try {
              const sender = _0x475212.key.participant || _0x475212.key.remoteJid;
              const ownerJid = conf.NUMERO_OWNER + "@s.whatsapp.net";
              
              // Send styled anti-delete message with all media types
              await sendStyledAntiDelete(_0x243e88, ownerJid, _0x475212, sender, _0x243e88);
              
              // Also notify in group
              const groupMsg = `╔══════════════════════════╗\n`;
              const groupMsg2 = `  🚫 *MESSAGE DELETED* 🚫\n`;
              const groupMsg3 = `╚══════════════════════════╝\n\n`;
              const groupMsg4 = `👤 @${sender.split('@')[0]} deleted a message!\n`;
              const groupMsg5 = `🔞 *NEXUS-AI doesn't allow deletion!*`;
              
              await _0x243e88.sendMessage(_0x213692, {
                'text': groupMsg + groupMsg2 + groupMsg3 + groupMsg4 + groupMsg5,
                'mentions': [sender]
              });
              
            } catch (_0x4be404) {
              console.error("❌ Anti-delete error:", _0x4be404);
            }
          }
        }
      }
    });
    // ============= END FIXED ANTI-DELETE =============
    
    // ============= STATUS REACTION =============
    const _0xe3bf32 = _0x3c0a4d => new Promise(_0x6b4f98 => setTimeout(_0x6b4f98, _0x3c0a4d));
    let _0x242b59 = 0x0;
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("🔄 AUTO_REACT_STATUS enabled...");
      _0x243e88.ev.on("messages.upsert", async _0x34d193 => {
        const { messages: _0x494066 } = _0x34d193;
        for (const _0x5b0b1e of _0x494066) {
          if (_0x5b0b1e.key && _0x5b0b1e.key.remoteJid === "status@broadcast") {
            const _0x2826c5 = Date.now();
            if (_0x2826c5 - _0x242b59 < 0x1388) continue;
            
            const _0x511531 = _0x243e88.user && _0x243e88.user.id ? _0x243e88.user.id.split(':')[0x0] + '@s.whatsapp.net' : null;
            if (!_0x511531) continue;
            
            await _0x243e88.sendMessage(_0x5b0b1e.key.remoteJid, {
              'react': {
                'key': _0x5b0b1e.key,
                'text': '🪀'
              }
            }, {
              'statusJidList': [_0x5b0b1e.key.participant, _0x511531]
            });
            _0x242b59 = Date.now();
            await _0xe3bf32(0x7d0);
          }
        }
      });
    }
    
    // ============= AUTO REACT EMOJI MAP =============
    const _0x8a5dbb = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', "🚶‍♂️"],
      'bro': ['🤜🤛', '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", '👯‍♀️', "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'ibrahim': ['😎', '💯', '🔥', '🚀', '👑'],
      'adams': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', '🎖️', '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", "👩‍💻"],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", '🤷‍♀️', '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", "🏙️", '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀']
    };
    
    const _0x42c72f = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    
    const _0x2b754b = _0x58b36a => {
      const _0x40361c = _0x58b36a.split(/\s+/);
      for (const _0x52a5fa of _0x40361c) {
        const _0x2a4276 = _0x4986d0(_0x52a5fa.toLowerCase());
        if (_0x2a4276) {
          return _0x2a4276;
        }
      }
      return _0x42c72f[Math.floor(Math.random() * _0x42c72f.length)];
    };
    
    const _0x4986d0 = _0x17b17c => {
      const _0x1b2acc = _0x8a5dbb[_0x17b17c.toLowerCase()];
      if (_0x1b2acc && _0x1b2acc.length > 0x0) {
        return _0x1b2acc[Math.floor(Math.random() * _0x1b2acc.length)];
      }
      return null;
    };
    
    if (conf.AUTO_REACT === "yes") {
      console.log("🔄 AUTO_REACT enabled...");
      _0x243e88.ev.on('messages.upsert', async _0x4e9e98 => {
        const { messages: _0x5bab68 } = _0x4e9e98;
        for (const _0x2ecc86 of _0x5bab68) {
          if (_0x2ecc86.key && _0x2ecc86.key.remoteJid) {
            const _0x536b89 = Date.now();
            if (_0x536b89 - _0x242b59 < 0x1388) continue;
            
            const _0x191879 = _0x2ecc86?.['message']?.["conversation"] || '';
            const _0x5761d0 = _0x2b754b(_0x191879) || _0x42c72f[Math.floor(Math.random() * _0x42c72f.length)];
            
            if (_0x5761d0) {
              await _0x243e88.sendMessage(_0x2ecc86.key.remoteJid, {
                'react': {
                  'text': _0x5761d0,
                  'key': _0x2ecc86.key
                }
              }).then(() => {
                _0x242b59 = Date.now();
              })['catch'](_0x45d35c => {
                console.error("❌ Reaction failed:", _0x45d35c);
              });
            }
            await _0xe3bf32(0x7d0);
          }
        }
      });
    }
    
    // ============= VCF COMMAND =============
    _0x243e88.ev.on("messages.upsert", async _0x3340c3 => {
      const { messages: _0x216e8c } = _0x3340c3;
      const _0x351e6e = _0x216e8c[0x0];
      if (!_0x351e6e.message) return;
      
      const _0x52acba = _0x351e6e.message.conversation || _0x351e6e.message.extendedTextMessage?.["text"] || '';
      const _0x30ff1a = _0x351e6e.key.remoteJid;
      
      if (_0x52acba.slice(0x1).toLowerCase() === "vcf") {
        if (!_0x30ff1a.endsWith('@g.us')) {
          await _0x243e88.sendMessage(_0x30ff1a, {
            'text': "❌ This command only works in groups.\n\n🔞 Nexus"
          });
          return;
        }
        await createAndSendGroupVCard(_0x30ff1a, "nexus family", _0x243e88);
      }
    });
    
    // ============= FIXED: ANTI-CALL - SINGLE RESPONSE =============
    const processedCalls = new Set();
    
    _0x243e88.ev.on("call", async _0x470dda => {
      if (conf.ANTICALL === "yes") {
        try {
          const callData = _0x470dda[0x0];
          if (!callData) return;
          
          const callId = callData.id;
          const from = callData.from;
          
          // Check if this call was already processed
          if (processedCalls.has(callId)) {
            console.log(`📞 Call ${callId} already processed, skipping...`);
            return;
          }
          
          // Mark as processed
          processedCalls.add(callId);
          
          // Remove from set after 10 seconds to prevent memory buildup
          setTimeout(() => {
            processedCalls.delete(callId);
          }, 10000);
          
          console.log(`📞 Incoming call from ${from} - Rejecting...`);
          
          // Reject the call
          await _0x243e88.rejectCall(callId, from);
          
          // Send single response after short delay
          await baileys_1.delay(1000);
          
          await _0x243e88.sendMessage(from, {
            'text': `╔══════════════════════════╗\n  🚫 *CALL REJECTED* 🚫\n╚══════════════════════════╝\n\n❌ I cannot receive calls.\n📱 Please text me instead!\n\n🤖 NEXUS-AI`
          });
          
          console.log(`✅ Call rejected and response sent to ${from}`);
          
        } catch (error) {
          console.log("❌ Anti-call error:", error);
        }
      }
    });
    // ============= END ANTI-CALL =============
    
    // ============= MAIN MESSAGE HANDLER =============
    _0x243e88.ev.on("messages.upsert", async _0x5c6cf5 => {
      const { messages: _0x3387e4 } = _0x5c6cf5;
      const _0x24b35c = _0x3387e4[0x0];
      if (!_0x24b35c.message) return;
      
      // Skip status updates
      if (_0x24b35c.key && _0x24b35c.key.remoteJid === "status@broadcast") return;
      
      // Skip reactions
      const contentType = baileys_1.getContentType(_0x24b35c.message);
      if (contentType === 'reactionMessage') return;
      
      const _0x26fc14 = _0x2d93bd => {
        if (!_0x2d93bd) return _0x2d93bd;
        if (/:\d+@/gi.test(_0x2d93bd)) {
          let _0x2be113 = baileys_1.jidDecode(_0x2d93bd) || {};
          return _0x2be113.user && _0x2be113.server && _0x2be113.user + '@' + _0x2be113.server || _0x2d93bd;
        } else {
          return _0x2d93bd;
        }
      };
      
      var _0x3ac7a5 = baileys_1.getContentType(_0x24b35c.message);
      var _0xf697f8 = _0x3ac7a5 == 'conversation' ? _0x24b35c.message.conversation : 
                     _0x3ac7a5 == "imageMessage" ? _0x24b35c.message.imageMessage?.["caption"] : 
                     _0x3ac7a5 == 'videoMessage' ? _0x24b35c.message.videoMessage?.["caption"] : 
                     _0x3ac7a5 == 'extendedTextMessage' ? _0x24b35c.message?.["extendedTextMessage"]?.["text"] : 
                     _0x3ac7a5 == "buttonsResponseMessage" ? _0x24b35c?.["message"]?.['buttonsResponseMessage']?.["selectedButtonId"] : 
                     _0x3ac7a5 == "listResponseMessage" ? _0x24b35c.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : 
                     _0x3ac7a5 == "messageContextInfo" ? _0x24b35c?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x24b35c.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] || _0x24b35c.text : '';
      
      var _0xbaefcb = _0x24b35c.key.remoteJid;
      var _0x4b2990 = _0x26fc14(_0x243e88.user.id);
      var _0x5f203a = _0x4b2990.split('@')[0x0];
      const _0x37f41c = _0xbaefcb?.['endsWith']("@g.us");
      var _0x2a34d7 = _0x37f41c ? await _0x243e88.groupMetadata(_0xbaefcb) : '';
      var _0x878d70 = _0x37f41c ? _0x2a34d7.subject : '';
      var _0x11e945 = _0x24b35c.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x3b005b = _0x26fc14(_0x24b35c.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x133a07 = _0x37f41c ? (_0x24b35c.key.participant ? _0x24b35c.key.participant : _0x24b35c.participant) : _0xbaefcb;
      
      if (_0x24b35c.key.fromMe) {
        _0x133a07 = _0x4b2990;
      }
      
      var _0x53233c = _0x37f41c ? _0x24b35c.key.participant : '';
      
      const { getAllSudoNumbers: _0x560f6b } = require("./bdd/sudo");
      const _0x556a7b = _0x24b35c.pushName;
      const _0x2d1d33 = await _0x560f6b();
      const _0x1acf53 = [_0x5f203a, "254710772666", '254785392165', "254799056874", '254710772666', conf.NUMERO_OWNER].map(_0x58d6f1 => _0x58d6f1.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x4e50eb = _0x1acf53.concat(_0x2d1d33);
      const _0x34fccb = _0x4e50eb.includes(_0x133a07);
      var _0x296907 = ["254710772666", '254710772666', "254799056874", '254785392165'].map(_0x38d537 => _0x38d537.replace(/[^0-9]/g) + '@s.whatsapp.net').includes(_0x133a07);
      
      function _0x574167(_0x42c1ba) {
        _0x243e88.sendMessage(_0xbaefcb, {
          'text': _0x42c1ba
        }, {
          'quoted': _0x24b35c
        });
      }
      
      console.log("\t🌍 NEXUS-AI ONLINE 🌍");
      console.log("========================================");
      if (_0x37f41c) {
        console.log("📌 Group: " + _0x878d70);
      }
      console.log("👤 User: [" + _0x556a7b + " : " + _0x133a07.split('@s.whatsapp.net')[0x0] + " ]");
      console.log("📝 Type: " + _0x3ac7a5);
      console.log("💬 Content: " + (_0xf697f8 ? _0xf697f8.substring(0, 100) : 'N/A'));
      console.log("========================================");
      
      function _0x521d5b(_0x49b667) {
        let _0x55b787 = [];
        for (let _0x5c6cf5 of _0x49b667) {
          if (_0x5c6cf5.admin == null) continue;
          _0x55b787.push(_0x5c6cf5.id);
        }
        return _0x55b787;
      }
      
      // Presence update
      var _0x22a59d = conf.ETAT;
      if (_0x22a59d == 0x1) {
        await _0x243e88.sendPresenceUpdate("available", _0xbaefcb);
      } else if (_0x22a59d == 0x2) {
        await _0x243e88.sendPresenceUpdate("composing", _0xbaefcb);
      } else if (_0x22a59d == 0x3) {
        await _0x243e88.sendPresenceUpdate("recording", _0xbaefcb);
      } else {
        await _0x243e88.sendPresenceUpdate("unavailable", _0xbaefcb);
      }
      
      const _0x15fef6 = _0x37f41c ? await _0x2a34d7.participants : '';
      let _0x11ea71 = _0x37f41c ? _0x521d5b(_0x15fef6) : '';
      const _0x62654f = _0x37f41c ? _0x11ea71.includes(_0x133a07) : false;
      var _0x7d8980 = _0x37f41c ? _0x11ea71.includes(_0x4b2990) : false;
      const _0x43a440 = _0xf697f8 ? _0xf697f8.trim().split(/ +/).slice(0x1) : null;
      const _0x4d3533 = _0xf697f8 ? _0xf697f8.startsWith(prefixe) : false;
      const _0x375469 = _0x4d3533 ? _0xf697f8.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x41f5ea = conf.URL.split(',');
      
      function _0x215274() {
        const _0x2e3bf7 = Math.floor(Math.random() * _0x41f5ea.length);
        const _0x1e8c83 = _0x41f5ea[_0x2e3bf7];
        return _0x1e8c83;
      }
      
      var _0x20955d = {
        'superUser': _0x34fccb,
        'dev': _0x296907,
        'verifGroupe': _0x37f41c,
        'mbre': _0x15fef6,
        'membreGroupe': _0x53233c,
        'verifAdmin': _0x62654f,
        'infosGroupe': _0x2a34d7,
        'nomGroupe': _0x878d70,
        'auteurMessage': _0x133a07,
        'nomAuteurMessage': _0x556a7b,
        'idBot': _0x4b2990,
        'verifZokouAdmin': _0x7d8980,
        'prefixe': prefixe,
        'arg': _0x43a440,
        'repondre': _0x574167,
        'mtype': _0x3ac7a5,
        'groupeAdmin': _0x521d5b,
        'msgRepondu': _0x11e945,
        'auteurMsgRepondu': _0x3b005b,
        'ms': _0x24b35c,
        'mybotpic': _0x215274
      };
      
      // AUTO READ
      if (conf.AUTO_READ === 'yes') {
        _0x243e88.ev.on("messages.upsert", async _0x490d27 => {
          const { messages: _0x543d2e } = _0x490d27;
          for (const _0x179941 of _0x543d2e) {
            if (!_0x179941.key.fromMe) {
              await _0x243e88.readMessages([_0x179941.key]);
            }
          }
        });
      }
      
      // AUTO READ STATUS
      if (_0x24b35c.key && _0x24b35c.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'yes') {
        await _0x243e88.readMessages([_0x24b35c.key]);
      }
      
      // AUTO DOWNLOAD STATUS
      if (_0x24b35c.key && _0x24b35c.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x24b35c.message.extendedTextMessage) {
          var _0x2cea19 = _0x24b35c.message.extendedTextMessage.text;
          await _0x243e88.sendMessage(_0x4b2990, {
            'text': _0x2cea19
          }, {
            'quoted': _0x24b35c
          });
        } else if (_0x24b35c.message.imageMessage) {
          var _0x2aebb5 = _0x24b35c.message.imageMessage.caption;
          var _0x1222c1 = await _0x243e88.downloadAndSaveMediaMessage(_0x24b35c.message.imageMessage);
          await _0x243e88.sendMessage(_0x4b2990, {
            'image': {
              'url': _0x1222c1
            },
            'caption': _0x2aebb5
          }, {
            'quoted': _0x24b35c
          });
        } else if (_0x24b35c.message.videoMessage) {
          var _0x2aebb5 = _0x24b35c.message.videoMessage.caption;
          var _0x4d83aa = await _0x243e88.downloadAndSaveMediaMessage(_0x24b35c.message.videoMessage);
          await _0x243e88.sendMessage(_0x4b2990, {
            'video': {
              'url': _0x4d83aa
            },
            'caption': _0x2aebb5
          }, {
            'quoted': _0x24b35c
          });
        }
      }
      
      // Skip for specific group if not dev
      if (!_0x296907 && _0xbaefcb == "120363158701337904@g.us") {
        return;
      }
      
      // Level system
      if (_0xf697f8 && _0x133a07.endsWith('s.whatsapp.net')) {
        const { ajouterOuMettreAJourUserData: _0x48d8c5 } = require("./bdd/level");
        try {
          await _0x48d8c5(_0x133a07);
        } catch (_0x1cb55f) {
          console.error(_0x1cb55f);
        }
      }
      
      // MENTION response
      try {
        if (_0x24b35c.message[_0x3ac7a5].contextInfo && 
            _0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid && 
            (_0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid.includes(_0x4b2990) || 
             _0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
          
          if (_0xbaefcb == "120363417804135599@newsletter") return;
          if (_0x34fccb) return;
          
          let _0x4826b6 = require("./bdd/mention");
          let _0x300c49 = await _0x4826b6.recupererToutesLesValeurs();
          let _0xa3a8cf = _0x300c49[0x0];
          
          if (_0xa3a8cf.status === "non") {
            console.log("Mention not active");
            return;
          }
          
          let _0x21e48d;
          if (_0xa3a8cf.type.toLocaleLowerCase() === "image") {
            _0x21e48d = {
              'image': { 'url': _0xa3a8cf.url },
              'caption': _0xa3a8cf.message
            };
          } else if (_0xa3a8cf.type.toLocaleLowerCase() === 'video') {
            _0x21e48d = {
              'video': { 'url': _0xa3a8cf.url },
              'caption': _0xa3a8cf.message
            };
          } else if (_0xa3a8cf.type.toLocaleLowerCase() === "sticker") {
            let _0x1bc6c0 = new Sticker(_0xa3a8cf.url, {
              'pack': conf.NOM_OWNER,
              'type': StickerTypes.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x46,
              'background': 'transparent'
            });
            const _0x1bd60b = await _0x1bc6c0.toBuffer();
            _0x21e48d = { 'sticker': _0x1bd60b };
          } else if (_0xa3a8cf.type.toLocaleLowerCase() === "audio") {
            _0x21e48d = {
              'audio': { 'url': _0xa3a8cf.url },
              'mimetype': "audio/mp4"
            };
          }
          
          _0x243e88.sendMessage(_0xbaefcb, _0x21e48d, {
            'quoted': _0x24b35c
          });
        }
      } catch (_0x14e2ce) {}
      
      // ============= FIXED ANTI-LINK =============
      try {
        const isAntiLinkEnabled = await verifierEtatJid(_0xbaefcb);
        
        if (isAntiLinkEnabled && _0x37f41c) {
          let messageText = '';
          if (_0xf697f8) {
            messageText = _0xf697f8;
          } else if (_0x3ac7a5 === 'imageMessage' && _0x24b35c.message.imageMessage?.caption) {
            messageText = _0x24b35c.message.imageMessage.caption;
          } else if (_0x3ac7a5 === 'videoMessage' && _0x24b35c.message.videoMessage?.caption) {
            messageText = _0x24b35c.message.videoMessage.caption;
          } else if (_0x3ac7a5 === 'documentMessage' && _0x24b35c.message.documentMessage?.caption) {
            messageText = _0x24b35c.message.documentMessage.caption;
          }
          
          let hasLink = false;
          if (messageText) {
            const lowerText = messageText.toLowerCase();
            hasLink = lowerText.includes('https://') || 
                       lowerText.includes('http://') || 
                       lowerText.includes('www.') ||
                       lowerText.includes('.com') ||
                       lowerText.includes('.net') ||
                       lowerText.includes('.org') ||
                       lowerText.includes('wa.me') ||
                       lowerText.includes('chat.whatsapp.com') ||
                       lowerText.includes('t.me') ||
                       lowerText.includes('bit.ly') ||
                       lowerText.includes('tinyurl.com') ||
                       lowerText.includes('youtube.com') ||
                       lowerText.includes('youtu.be') ||
                       lowerText.includes('instagram.com') ||
                       lowerText.includes('facebook.com') ||
                       lowerText.includes('twitter.com') ||
                       lowerText.includes('x.com') ||
                       lowerText.includes('whatsapp.com');
          }
          
          if (hasLink) {
            console.log("🔗 LINK DETECTED in group:", _0xbaefcb, "by:", _0x133a07);
            
            const isBotAdmin = _0x7d8980;
            const isAdmin = _0x62654f;
            const isSuperUser = _0x34fccb;
            
            if (isAdmin || isSuperUser) {
              console.log("Admin/SuperUser sent link, ignoring...");
              return;
            }
            
            if (!isBotAdmin) {
              await _0x243e88.sendMessage(_0xbaefcb, {
                'text': `╔══════════════════════════╗\n  ⚠️ *LINK DETECTED* ⚠️\n╚══════════════════════════╝\n\n👤 @${_0x133a07.split('@')[0]}\n🚫 Links are not allowed!\n\n🤖 Bot is not admin. Make me admin for full protection.`,
                'mentions': [_0x133a07]
              }, {
                'quoted': _0x24b35c
              });
              return;
            }
            
            const action = await recupererActionJid(_0xbaefcb);
            const messageToDelete = {
              'remoteJid': _0xbaefcb,
              'fromMe': false,
              'id': _0x24b35c.key.id,
              'participant': _0x133a07
            };
            
            if (action === 'remove') {
              const warningMsg = `╔══════════════════════════╗\n  🚨 *LINK DETECTED* 🚨\n╚══════════════════════════╝\n\n👤 @${_0x133a07.split('@')[0]}\n❌ Removed for sending links!\n\n🚫 Links are not allowed in this group!`;
              
              await _0x243e88.sendMessage(_0xbaefcb, {
                'text': warningMsg,
                'mentions': [_0x133a07]
              }, {
                'quoted': _0x24b35c
              });
              
              try {
                await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], "remove");
              } catch (error) {
                console.log("Anti-link removal error:", error);
              }
              
              await _0x243e88.sendMessage(_0xbaefcb, {
                'delete': messageToDelete
              });
              
            } else if (action === "delete" || action === "supp") {
              const warningMsg = `╔══════════════════════════╗\n  ⚠️ *LINK DETECTED* ⚠️\n╚══════════════════════════╝\n\n👤 @${_0x133a07.split('@')[0]}\n❌ Your message was deleted!\n\n🚫 Links are not allowed!`;
              
              await _0x243e88.sendMessage(_0xbaefcb, {
                'text': warningMsg,
                'mentions': [_0x133a07]
              }, {
                'quoted': _0x24b35c
              });
              
              await _0x243e88.sendMessage(_0xbaefcb, {
                'delete': messageToDelete
              });
              
            } else if (action === 'warn') {
              try {
                const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require("./bdd/warn");
                
                let warnCount = await getWarnCountByJID(_0x133a07);
                let maxWarns = conf.WARN_COUNT || 3;
                
                if (warnCount >= maxWarns) {
                  const removeMsg = `╔══════════════════════════╗\n  ⚠️ *FINAL WARNING* ⚠️\n╚══════════════════════════╝\n\n👤 @${_0x133a07.split('@')[0]}\n❌ Removed after ${maxWarns} warnings!\n\n🚫 Links are not allowed!`;
                  
                  await _0x243e88.sendMessage(_0xbaefcb, {
                    'text': removeMsg,
                    'mentions': [_0x133a07]
                  }, {
                    'quoted': _0x24b35c
                  });
                  
                  await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], "remove");
                  await _0x243e88.sendMessage(_0xbaefcb, {
                    'delete': messageToDelete
                  });
                } else {
                  const remainingWarns = maxWarns - warnCount - 1;
                  const warningMsg = `╔══════════════════════════╗\n  ⚠️ *WARNING* ⚠️\n╚══════════════════════════╝\n\n👤 @${_0x133a07.split('@')[0]}\n📌 Warning ${warnCount + 1}/${maxWarns}\n⚠️ ${remainingWarns} warning(s) remaining\n\n🚫 Links are not allowed!`;
                  
                  await ajouterUtilisateurAvecWarnCount(_0x133a07);
                  await _0x243e88.sendMessage(_0xbaefcb, {
                    'text': warningMsg,
                    'mentions': [_0x133a07]
                  }, {
                    'quoted': _0x24b35c
                  });
                  
                  await _0x243e88.sendMessage(_0xbaefcb, {
                    'delete': messageToDelete
                  });
                }
              } catch (warnError) {
                console.log("Warning system error:", warnError);
                await _0x243e88.sendMessage(_0xbaefcb, {
                  'text': `⚠️ Link detected! @${_0x133a07.split('@')[0]} message deleted.`,
                  'mentions': [_0x133a07]
                }, {
                  'quoted': _0x24b35c
                });
                await _0x243e88.sendMessage(_0xbaefcb, {
                  'delete': messageToDelete
                });
              }
            }
          }
        }
      } catch (_0x588dec) {
        console.log("Anti-link error:", _0x588dec);
      }
      // ============= END ANTI-LINK =============
      
      // ============= ANTIBOT =============
      try {
        const _0x397cb5 = _0x24b35c.key?.['id']?.["startsWith"]("BAES") && _0x24b35c.key?.['id']?.["length"] === 0x10;
        const _0x59c5c6 = _0x24b35c.key?.['id']?.["startsWith"]('BAE5') && _0x24b35c.key?.['id']?.["length"] === 0x10;
        
        if (_0x397cb5 || _0x59c5c6) {
          if (_0x3ac7a5 === 'reactionMessage') {
            console.log("Not reacting to reactions");
            return;
          }
          
          const _0x52804c = await atbverifierEtatJid(_0xbaefcb);
          if (!_0x52804c) return;
          
          if (_0x62654f || _0x133a07 === _0x4b2990) {
            console.log("Admin or bot, ignoring");
            return;
          }
          
          const _0x13af2e = {
            'remoteJid': _0xbaefcb,
            'fromMe': false,
            'id': _0x24b35c.key.id,
            'participant': _0x133a07
          };
          
          var _0x54a3df = "🤖 Bot detected!\n";
          
          var _0x1ae492 = await atbrecupererActionJid(_0xbaefcb);
          
          if (_0x1ae492 === "remove") {
            _0x54a3df += `❌ @${_0x133a07.split('@')[0]} removed from group.`;
            await _0x243e88.sendMessage(_0xbaefcb, {
              'text': _0x54a3df,
              'mentions': [_0x133a07]
            }, {
              'quoted': _0x24b35c
            });
            try {
              await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], "remove");
            } catch (_0xc9bcd0) {
              console.log("Antibot remove error: " + _0xc9bcd0);
            }
            await _0x243e88.sendMessage(_0xbaefcb, {
              'delete': _0x13af2e
            });
          } else if (_0x1ae492 === "delete") {
            _0x54a3df += `❌ @${_0x133a07.split('@')[0]} message deleted.`;
            await _0x243e88.sendMessage(_0xbaefcb, {
              'text': _0x54a3df,
              'mentions': [_0x133a07]
            }, {
              'quoted': _0x24b35c
            });
            await _0x243e88.sendMessage(_0xbaefcb, {
              'delete': _0x13af2e
            });
          } else if (_0x1ae492 === 'warn') {
            const { getWarnCountByJID: _0x48fe1a, ajouterUtilisateurAvecWarnCount: _0x3e2cfc } = require("./bdd/warn");
            let _0x21e70c = await _0x48fe1a(_0x133a07);
            let _0x3272e9 = conf.WARN_COUNT;
            
            if (_0x21e70c >= _0x3272e9) {
              var _0x4f58ee = `🤖 Bot detected! @${_0x133a07.split('@')[0]} removed for reaching warn limit.`;
              await _0x243e88.sendMessage(_0xbaefcb, {
                'text': _0x4f58ee,
                'mentions': [_0x133a07]
              }, {
                'quoted': _0x24b35c
              });
              await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], "remove");
              await _0x243e88.sendMessage(_0xbaefcb, {
                'delete': _0x13af2e
              });
            } else {
              var _0x3d8b18 = _0x3272e9 - _0x21e70c;
              var _0x343224 = `🤖 Bot detected! Warning ${_0x21e70c + 1}/${_0x3272e9} for @${_0x133a07.split('@')[0]}`;
              await _0x3e2cfc(_0x133a07);
              await _0x243e88.sendMessage(_0xbaefcb, {
                'text': _0x343224,
                'mentions': [_0x133a07]
              }, {
                'quoted': _0x24b35c
              });
              await _0x243e88.sendMessage(_0xbaefcb, {
                'delete': _0x13af2e
              });
            }
          }
        }
      } catch (_0x402a2c) {
        console.log("Antibot error: " + _0x402a2c);
      }
      
      // ============= COMMAND HANDLER =============
      if (_0x4d3533) {
        const _0x105af6 = evt.cm.find(_0x1187ba => _0x1187ba.nomCom === _0x375469);
        if (_0x105af6) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x34fccb) {
              return;
            }
            
            if (!_0x34fccb && _0xbaefcb === _0x133a07 && conf.PM_PERMIT === "yes") {
              _0x574167("⚠️ You don't have access to commands in private messages");
              return;
            }
            
            if (!_0x34fccb && _0x37f41c) {
              let _0x1f3f9c = await isGroupBanned(_0xbaefcb);
              if (_0x1f3f9c) {
                _0x574167("⚠️ This group is banned from using bot commands");
                return;
              }
            }
            
            if (!_0x62654f && _0x37f41c) {
              let _0x4d5d3a = await isGroupOnlyAdmin(_0xbaefcb);
              if (_0x4d5d3a) {
                _0x574167("⚠️ Only admins can use commands in this group");
                return;
              }
            }
            
            if (!_0x34fccb) {
              let _0x1a2c28 = await isUserBanned(_0x133a07);
              if (_0x1a2c28) {
                _0x574167("⚠️ You are banned from using bot commands");
                return;
              }
            }
            
            reagir(_0xbaefcb, _0x243e88, _0x24b35c, _0x105af6.reaction);
            _0x105af6.fonction(_0xbaefcb, _0x243e88, _0x20955d);
          } catch (_0x459532) {
            console.log("❌ Command error: " + _0x459532);
            _0x243e88.sendMessage(_0xbaefcb, {
              'text': `❌ Error: ${_0x459532.message || _0x459532}`
            }, {
              'quoted': _0x24b35c
            });
          }
        }
      }
    });
    
    // ============= GROUP PARTICIPANTS HANDLER WITH STYLED MESSAGES =============
    const { recupevents: _0xad0996 } = require("./bdd/welcome");
    
    _0x243e88.ev.on("group-participants.update", async _0x22fd53 => {
      console.log("👥 Group update:", _0x22fd53);
      
      try {
        const groupMetadata = await _0x243e88.groupMetadata(_0x22fd53.id);
        
        if (_0x22fd53.action == 'add' && (await _0xad0996(_0x22fd53.id, 'welcome')) == 'on') {
          await sendStyledWelcome(_0x243e88, _0x22fd53.id, _0x22fd53.participants, groupMetadata);
        } else if (_0x22fd53.action == 'remove' && (await _0xad0996(_0x22fd53.id, "goodbye")) == 'on') {
          await sendStyledGoodbye(_0x243e88, _0x22fd53.id, _0x22fd53.participants, groupMetadata);
        } else if (_0x22fd53.action == 'promote' && (await _0xad0996(_0x22fd53.id, "antipromote")) == 'on') {
          if (_0x22fd53.author == groupMetadata.owner || 
              _0x22fd53.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || 
              _0x22fd53.author == decodeJid(_0x243e88.user.id) || 
              _0x22fd53.author == _0x22fd53.participants[0x0]) {
            console.log("SuperUser case, ignoring");
            return;
          }
          
          await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [_0x22fd53.author, _0x22fd53.participants[0x0]], "demote");
          await _0x243e88.sendMessage(_0x22fd53.id, {
            'text': `╔══════════════════════════╗\n  🚫 *ANTI-PROMOTE* 🚫\n╚══════════════════════════╝\n\n@${_0x22fd53.author.split('@')[0]} tried to promote @${_0x22fd53.participants[0x0].split('@')[0]}\n\n❌ Both have been demoted!\n\n🔞 NEXUS-AI Anti-Promote System`,
            'mentions': [_0x22fd53.author, _0x22fd53.participants[0x0]]
          });
        } else if (_0x22fd53.action == "demote" && (await _0xad0996(_0x22fd53.id, 'antidemote')) == 'on') {
          if (_0x22fd53.author == groupMetadata.owner || 
              _0x22fd53.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || 
              _0x22fd53.author == decodeJid(_0x243e88.user.id) || 
              _0x22fd53.author == _0x22fd53.participants[0x0]) {
            console.log("SuperUser case, ignoring");
            return;
          }
          
          await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [_0x22fd53.author], "demote");
          await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [_0x22fd53.participants[0x0]], "promote");
          await _0x243e88.sendMessage(_0x22fd53.id, {
            'text': `╔══════════════════════════╗\n  🚫 *ANTI-DEMOTE* 🚫\n╚══════════════════════════╝\n\n@${_0x22fd53.author.split('@')[0]} tried to demote @${_0x22fd53.participants[0x0].split('@')[0]}\n\n❌ Demoter has been demoted!\n✅ Victim has been promoted back!\n\n🔞 NEXUS-AI Anti-Demote System`,
            'mentions': [_0x22fd53.author, _0x22fd53.participants[0x0]]
          });
        }
      } catch (_0x51b1a3) {
        console.error("Group participants update error:", _0x51b1a3);
      }
    });
    
    // ============= CRON JOBS =============
    async function _0x1f93c4() {
      const _0x25cc58 = require("node-cron");
      const { getCron: _0x22d016 } = require('./bdd/cron');
      let _0x9418e1 = await _0x22d016();
      console.log("📅 Cron jobs:", _0x9418e1);
      
      if (_0x9418e1.length > 0x0) {
        for (let _0x226f5f = 0x0; _0x226f5f < _0x9418e1.length; _0x226f5f++) {
          if (_0x9418e1[_0x226f5f].mute_at != null) {
            let _0x45a162 = _0x9418e1[_0x226f5f].mute_at.split(':');
            console.log(`⏰ Auto-mute scheduled for ${_0x9418e1[_0x226f5f].group_id} at ${_0x45a162[0x0]}:${_0x45a162[0x1]}`);
            _0x25cc58.schedule(_0x45a162[0x1] + " " + _0x45a162[0x0] + " * * *", async () => {
              await _0x243e88.groupSettingUpdate(_0x9418e1[_0x226f5f].group_id, 'announcement');
              await _0x243e88.sendMessage(_0x9418e1[_0x226f5f].group_id, {
                'image': { 'url': './media/chrono.webp' },
                'caption': `╔══════════════════════════╗\n  🔒 *GROUP LOCKED* 🔒\n╚══════════════════════════╝\n\n⏰ Auto-mute activated!\n📌 Only admins can send messages.\n\n🌙 Goodnight everyone!`
              });
            }, { 'timezone': "Africa/Nairobi" });
          }
          if (_0x9418e1[_0x226f5f].unmute_at != null) {
            let _0x4dc2dd = _0x9418e1[_0x226f5f].unmute_at.split(':');
            console.log(`⏰ Auto-unmute scheduled at ${_0x4dc2dd[0x0]}:${_0x4dc2dd[0x1]}`);
            _0x25cc58.schedule(_0x4dc2dd[0x1] + " " + _0x4dc2dd[0x0] + " * * *", async () => {
              await _0x243e88.groupSettingUpdate(_0x9418e1[_0x226f5f].group_id, "not_announcement");
              await _0x243e88.sendMessage(_0x9418e1[_0x226f5f].group_id, {
                'image': { 'url': "./media/chrono.webp" },
                'caption': `╔══════════════════════════╗\n  🔓 *GROUP UNLOCKED* 🔓\n╚══════════════════════════╝\n\n⏰ Auto-unmute activated!\n✅ Everyone can send messages now.\n\n🌞 Good morning everyone!`
              });
            }, { 'timezone': "Africa/Nairobi" });
          }
        }
      } else {
        console.log("No cron jobs activated");
      }
    }
    
    // ============= CONTACTS HANDLER =============
    _0x243e88.ev.on("contacts.upsert", async _0x45e936 => {
      const _0x5d3871 = _0x2133d1 => {
        for (const _0x47ac40 of _0x2133d1) {
          if (store.contacts[_0x47ac40.id]) {
            Object.assign(store.contacts[_0x47ac40.id], _0x47ac40);
          } else {
            store.contacts[_0x47ac40.id] = _0x47ac40;
          }
        }
      };
      _0x5d3871(_0x45e936);
    });
    
    // ============= CONNECTION UPDATE =============
    _0x243e88.ev.on("connection.update", async _0x147343 => {
      const { lastDisconnect: _0x41b97c, connection: _0x52925b } = _0x147343;
      
      if (_0x52925b === "connecting") {
        console.log("🔄 NEXUS-AI is connecting...");
      } else if (_0x52925b === 'open') {
        console.log("✅ NEXUS-AI Connected to WhatsApp! ☺️");
        console.log("========================================");
        await baileys_1.delay(0xc8);
        console.log("🤖 NEXUS-AI is Online 🚀");
        await baileys_1.delay(0x12c);
        console.log("📦 Loading Commands...");
        
        fs.readdirSync(__dirname + "/pkdriller").forEach(_0x5c00ae => {
          if (path.extname(_0x5c00ae).toLowerCase() == ".js") {
            try {
              require(__dirname + "/pkdriller/" + _0x5c00ae);
              console.log(`✅ ${_0x5c00ae} installed successfully`);
            } catch (_0x12f781) {
              console.log(`❌ ${_0x5c00ae} failed to install: ${_0x12f781}`);
            }
            baileys_1.delay(0x12c);
          }
        });
        
        await baileys_1.delay(0x2bc);
        
        var _0x50f3b5;
        if (conf.MODE.toLocaleLowerCase() === "yes") {
          _0x50f3b5 = 'PUBLIC';
        } else if (conf.MODE.toLocaleLowerCase() === 'no') {
          _0x50f3b5 = "PRIVATE";
        } else {
          _0x50f3b5 = "UNDEFINED";
        }
        
        console.log(`✅ Commands Installation Completed`);
        console.log(`🌍 Mode: ${_0x50f3b5}`);
        console.log(`📱 Prefix: ${prefixe}`);
        console.log("========================================");
        
        await _0x1f93c4();
        
        // Start auto-about rotation
        startAutoAbout(_0x243e88);
        
        // Send styled connection message
        if (conf.DP.toLowerCase() === "yes") {
          await sendStyledConnectionMessage(_0x243e88, _0x243e88.user.id, _0x50f3b5, prefixe);
        }
        
      } else if (_0x52925b == 'close') {
        let _0x46bf7 = new boom_1.Boom(_0x41b97c?.["error"])?.["output"]['statusCode'];
        
        if (_0x46bf7 === baileys_1.DisconnectReason.badSession) {
          console.log("❌ Session error, please scan again...");
        } else if (_0x46bf7 === baileys_1.DisconnectReason.connectionClosed) {
          console.log("🔄 Connection closed, reconnecting...");
          _0x1b1480();
        } else if (_0x46bf7 === baileys_1.DisconnectReason.connectionLost) {
          console.log("🔄 Connection lost, reconnecting...");
          _0x1b1480();
        } else if (_0x46bf7 === baileys_1.DisconnectReason.connectionReplaced) {
          console.log("⚠️ Connection replaced, another session is open");
        } else if (_0x46bf7 === baileys_1.DisconnectReason.loggedOut) {
          console.log("❌ Logged out, please scan QR code again");
        } else if (_0x46bf7 === baileys_1.DisconnectReason.restartRequired) {
          console.log("🔄 Restart required, restarting...");
          _0x1b1480();
        } else {
          console.log(`⚠️ Unknown disconnect reason: ${_0x46bf7}, restarting...`);
          const { exec } = require("child_process");
          exec("pm2 restart all");
        }
        _0x1b1480();
      }
    });
    
    // ============= CREDS UPDATE =============
    _0x243e88.ev.on("creds.update", _0x43ea6e);
    
    // ============= DOWNLOAD MEDIA FUNCTION =============
    _0x243e88.downloadAndSaveMediaMessage = async (_0x4a8528, _0x4ef4eb = '', _0x213632 = true) => {
      let _0x55b529 = _0x4a8528.msg ? _0x4a8528.msg : _0x4a8528;
      let _0x22362d = (_0x4a8528.msg || _0x4a8528).mimetype || '';
      let _0x2620bf = _0x4a8528.mtype ? _0x4a8528.mtype.replace(/Message/gi, '') : _0x22362d.split('/')[0x0];
      
      const _0x3ac107 = await baileys_1.downloadContentFromMessage(_0x55b529, _0x2620bf);
      let _0x2cb55c = Buffer.from([]);
      for await (const _0x30ca65 of _0x3ac107) {
        _0x2cb55c = Buffer.concat([_0x2cb55c, _0x30ca65]);
      }
      let _0x741e23 = await FileType.fromBuffer(_0x2cb55c);
      let _0x1689a1 = './' + _0x4ef4eb + '.' + _0x741e23.ext;
      await fs.writeFileSync(_0x1689a1, _0x2cb55c);
      return _0x1689a1;
    };
    
    // ============= AWAIT FOR MESSAGE FUNCTION =============
    _0x243e88.awaitForMessage = async (_0x272ee8 = {}) => {
      return new Promise((_0x2d207e, _0x25c039) => {
        if (typeof _0x272ee8 !== "object") {
          _0x25c039(new Error("Options must be an object"));
        }
        if (typeof _0x272ee8.sender !== 'string') {
          _0x25c039(new Error("Sender must be a string"));
        }
        if (typeof _0x272ee8.chatJid !== "string") {
          _0x25c039(new Error("ChatJid must be a string"));
        }
        if (_0x272ee8.timeout && typeof _0x272ee8.timeout !== "number") {
          _0x25c039(new Error("Timeout must be a number"));
        }
        if (_0x272ee8.filter && typeof _0x272ee8.filter !== "function") {
          _0x25c039(new Error("Filter must be a function"));
        }
        
        const _0x48cf8b = _0x272ee8?.["timeout"] || undefined;
        const _0x50d51d = _0x272ee8?.["filter"] || (() => true);
        let _0x2b6fd7 = undefined;
        let _0xa776a1 = _0x2c10e5 => {
          let { type: _0x3efe17, messages: _0x3bedb5 } = _0x2c10e5;
          if (_0x3efe17 == "notify") {
            for (let _0x553b45 of _0x3bedb5) {
              const _0x13e794 = _0x553b45.key.fromMe;
              const _0x58a35e = _0x553b45.key.remoteJid;
              const _0x40c9c7 = _0x58a35e.endsWith('@g.us');
              const _0x4df2b4 = _0x58a35e == "status@broadcast";
              const _0x11cd4e = _0x13e794 ? _0x243e88.user.id.replace(/:.*@/g, '@') : 
                               _0x40c9c7 || _0x4df2b4 ? _0x553b45.key.participant.replace(/:.*@/g, '@') : _0x58a35e;
              
              if (_0x11cd4e == _0x272ee8.sender && _0x58a35e == _0x272ee8.chatJid && _0x50d51d(_0x553b45)) {
                _0x243e88.ev.off("messages.upsert", _0xa776a1);
                clearTimeout(_0x2b6fd7);
                _0x2d207e(_0x553b45);
              }
            }
          }
        };
        
        _0x243e88.ev.on("messages.upsert", _0xa776a1);
        if (_0x48cf8b) {
          _0x2b6fd7 = setTimeout(() => {
            _0x243e88.ev.off("messages.upsert", _0xa776a1);
            _0x25c039(new Error('Timeout'));
          }, _0x48cf8b);
        }
      });
    };
    
    return _0x243e88;
  }
  
  let _0x5519b4 = require.resolve(__filename);
  fs.watchFile(_0x5519b4, () => {
    fs.unwatchFile(_0x5519b4);
    console.log("🔄 Updating " + __filename);
    delete require.cache[_0x5519b4];
    require(_0x5519b4);
  });
  
  _0x1b1480();
}, 0x1388);
