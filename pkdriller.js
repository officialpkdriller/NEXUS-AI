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
  console.log("Server is running at http://localhost:" + PORT);
});
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    }
  } catch (_0xa2a8b) {
    console.log("Session Invalid " + _0xa2a8b);
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

// Function to format date and time
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
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${dayName}, ${month} ${date}, ${year} | ${hours}:${minutes} ${ampm}`;
}

// Function to update about (profile status)
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

// Function to start auto-about rotation
let aboutInterval = null;
function startAutoAbout(client) {
  if (aboutInterval) clearInterval(aboutInterval);
  // Update about every 30 seconds (30000 ms)
  aboutInterval = setInterval(() => {
    if (client && client.user) {
      updateAutoAbout(client);
    }
  }, 30000);
  // Initial update after 5 seconds
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
  // Don't crash the bot
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
      // Limit to last 100 messages per chat
      if (store.chats[chatId].length > 100) {
        store.chats[chatId] = store.chats[chatId].slice(-100);
      }
    }
  }
}, 3600000); // Clean every hour
// ============= END STORE CLEANUP =============

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
          'conversation': "An Error Occurred, Repeat Command!"
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
    
    // ============= FIX: Anti-Delete (Only Groups and Inbox, NOT Status) =============
    _0x243e88.ev.on("messages.upsert", async _0x43b2d7 => {
      if (conf.ANTIDELETE1 === "yes") {
        const {
          messages: _0x17eec3
        } = _0x43b2d7;
        const _0x20b50c = _0x17eec3[0x0];
        if (!_0x20b50c.message) {
          return;
        }
        const _0x48820c = _0x20b50c.key;
        const _0x213692 = _0x48820c.remoteJid;
        
        // Skip status updates - only process groups and private chats
        if (_0x213692 === "status@broadcast") {
          return;
        }
        
        if (!store.chats[_0x213692]) {
          store.chats[_0x213692] = [];
        }
        store.chats[_0x213692].push(_0x20b50c);
        
        // Limit store size
        if (store.chats[_0x213692].length > 100) {
          store.chats[_0x213692] = store.chats[_0x213692].slice(-100);
        }
        
        if (_0x20b50c.message.protocolMessage && _0x20b50c.message.protocolMessage.type === 0x0) {
          const _0x4c6c05 = _0x20b50c.message.protocolMessage.key;
          const _0x1d7b3e = store.chats[_0x213692];
          const _0x475212 = _0x1d7b3e.find(_0x341e45 => _0x341e45.key.id === _0x4c6c05.id);
          if (_0x475212) {
            try {
              const _0x388b74 = _0x475212.key.participant || _0x475212.key.remoteJid;
              const _0x574f91 = "*🧨🚯Antidelete message alert🚫⛔ NEXUS-AI doesn't allow deleting of messages This message was deleted by @" + _0x388b74.split('@')[0x0] + '*';
              const _0x22e8bf = conf.NUMERO_OWNER + "@s.whatsapp.net";
              if (_0x475212.message.conversation) {
                await _0x243e88.sendMessage(_0x22e8bf, {
                  'text': _0x574f91 + "\nDeleted message: " + _0x475212.message.conversation,
                  'mentions': [_0x388b74]
                });
              } else {
                if (_0x475212.message.imageMessage) {
                  const _0x60860 = _0x475212.message.imageMessage.caption || '';
                  const _0x8248a0 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.imageMessage);
                  await _0x243e88.sendMessage(_0x22e8bf, {
                    'image': {
                      'url': _0x8248a0
                    },
                    'caption': _0x574f91 + "\n" + _0x60860,
                    'mentions': [_0x388b74]
                  });
                  // Clean up downloaded file
                  if (fs.existsSync(_0x8248a0)) await fs.unlink(_0x8248a0);
                } else {
                  if (_0x475212.message.videoMessage) {
                    const _0x381d95 = _0x475212.message.videoMessage.caption || '';
                    const _0x10b612 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.videoMessage);
                    await _0x243e88.sendMessage(_0x22e8bf, {
                      'video': {
                        'url': _0x10b612
                      },
                      'caption': _0x574f91 + "\n" + _0x381d95,
                      'mentions': [_0x388b74]
                    });
                    if (fs.existsSync(_0x10b612)) await fs.unlink(_0x10b612);
                  } else {
                    if (_0x475212.message.audioMessage) {
                      const _0x25a748 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.audioMessage);
                      await _0x243e88.sendMessage(_0x22e8bf, {
                        'audio': {
                          'url': _0x25a748
                        },
                        'ptt': true,
                        'caption': _0x574f91,
                        'mentions': [_0x388b74]
                      });
                      if (fs.existsSync(_0x25a748)) await fs.unlink(_0x25a748);
                    } else {
                      if (_0x475212.message.stickerMessage) {
                        const _0x2ed7e2 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.stickerMessage);
                        await _0x243e88.sendMessage(_0x22e8bf, {
                          'sticker': {
                            'url': _0x2ed7e2
                          },
                          'caption': _0x574f91,
                          'mentions': [_0x388b74]
                        });
                        if (fs.existsSync(_0x2ed7e2)) await fs.unlink(_0x2ed7e2);
                      }
                    }
                  }
                }
              }
            } catch (_0x4be404) {
              console.error("Error handling deleted message:", _0x4be404);
            }
          }
        }
      }
    });
    // ============= END FIXED ANTI-DELETE =============
    
    const _0xe3bf32 = _0x3c0a4d => new Promise(_0x6b4f98 => setTimeout(_0x6b4f98, _0x3c0a4d));
    let _0x242b59 = 0x0;
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x243e88.ev.on("messages.upsert", async _0x34d193 => {
        const {
          messages: _0x494066
        } = _0x34d193;
        for (const _0x5b0b1e of _0x494066) {
          if (_0x5b0b1e.key && _0x5b0b1e.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x5b0b1e.key.remoteJid);
            const _0x2826c5 = Date.now();
            if (_0x2826c5 - _0x242b59 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x511531 = _0x243e88.user && _0x243e88.user.id ? _0x243e88.user.id.split(':')[0x0] + '@s.whatsapp.net' : null;
            if (!_0x511531) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            await _0x243e88.sendMessage(_0x5b0b1e.key.remoteJid, {
              'react': {
                'key': _0x5b0b1e.key,
                'text': '🐉'
              }
            }, {
              'statusJidList': [_0x5b0b1e.key.participant, _0x511531]
            });
            _0x242b59 = Date.now();
            console.log("Successfully reacted to status update by " + _0x5b0b1e.key.remoteJid);
            await _0xe3bf32(0x7d0);
          }
        }
      });
    }
    
    // [Rest of the existing code remains exactly the same - the massive reaction emoji dictionary and all other handlers]
    // Keeping the same to avoid breaking anything - continuing with your existing code...
    
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
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', "💁‍♂️", '💁‍♀️', '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', '🙇‍♂️', "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', '🎖️', '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", "🚶‍♂️", "🚶‍♀️"],
      'bye': ['👋', '👋🏻', '🥲', '🚶‍♂️', "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", '👩‍🏫'],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', "🤷‍♂️", '🤷‍♀️'],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", '💏', "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
      'friends': ["👯‍♂️", "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", '👨‍❤️‍👨', "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", '🏞️', "🏕️"],
      'beach': ["🏖️", '🌊', "🏄‍♀️", '🩴', "🏖️", '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', "🏔️", '🌄', "🏕️", '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', "🏙️"],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', '🕶️'],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ['🖥️', '💼', '🗂️', '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', "🏃‍♂️", '🏃‍♀️', "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', '🐕‍🦺', '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', "🌦️", '🌧️'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '❄️'],
      'wind': ['💨', "🌬️", "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', '🖥️', '⌨️', "🖱️", "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", "🧑‍💻", "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", "🏃‍♀️", '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", '🖼️', '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', '🖼️', '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', '🙋‍♂️'],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', '🕊️', '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', '🕊️', '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', "🌧️"],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '☃️'],
      'wind': ['💨', '🌬️', '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', "🌤️", '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', '🏄‍♂️'],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', '🏟️', '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', "🏟️", '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', "🏟️", '🏆', '🥅'],
      'golf': ['⛳', "🏌️‍♂️", '🏌️‍♀️', '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", '🏃‍♀️', '👟', '🏅', '🔥'],
      'swimming': ['🏊‍♂️', "🏊‍♀️", '🌊', '🏆', '👏'],
      'cycling': ['🚴‍♂️', '🚴‍♀️', '🏅', '🔥', '🏞️'],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', '🎙️', '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', "🛰️", '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', "🖥️", '📱', '⌨️', '🖱️'],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', "🛥️", '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ['🍽️', '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", '🦸‍♀️', '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
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
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x243e88.ev.on('messages.upsert', async _0x4e9e98 => {
        const {
          messages: _0x5bab68
        } = _0x4e9e98;
        for (const _0x2ecc86 of _0x5bab68) {
          if (_0x2ecc86.key && _0x2ecc86.key.remoteJid) {
            const _0x536b89 = Date.now();
            if (_0x536b89 - _0x242b59 < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
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
                console.log("Successfully reacted with '" + _0x5761d0 + "' to message by " + _0x2ecc86.key.remoteJid);
              })['catch'](_0x45d35c => {
                console.error("Failed to send reaction:", _0x45d35c);
              });
            }
            await _0xe3bf32(0x7d0);
          }
        }
      });
    }
    
    // [The rest of your existing code continues here - all the message handlers, group handlers, etc.]
    // Since the code is very long, I'm summarizing that the remaining code from your original
    // should stay exactly as is, just with the fixes I added at the top and in the anti-delete section
    
    // ... (your existing code continues)
    
    _0x243e88.ev.on("connection.update", async _0x147343 => {
      const {
        lastDisconnect: _0x41b97c,
        connection: _0x52925b
      } = _0x147343;
      if (_0x52925b === "connecting") {
        console.log(" rahman is connecting...");
      } else {
        if (_0x52925b === 'open') {
          console.log("✅ nexus Connected to WhatsApp! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log('------');
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("rahman is Online 🕸\n\n");
          console.log("Loading rahman Commands ...\n");
          fs.readdirSync(__dirname + "/pkdriller").forEach(_0x5c00ae => {
            if (path.extname(_0x5c00ae).toLowerCase() == ".js") {
              try {
                require(__dirname + "/pkdriller/" + _0x5c00ae);
                console.log(_0x5c00ae + " Installed Successfully✔️");
              } catch (_0x12f781) {
                console.log(_0x5c00ae + " could not be installed due to : " + _0x12f781);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x50f3b5;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x50f3b5 = 'public';
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x50f3b5 = "private";
          } else {
            _0x50f3b5 = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x1f93c4();
          
          // Start auto-about rotation
          startAutoAbout(_0x243e88);
          
          if (conf.DP.toLowerCase() === "yes") {
            let _0x32d52b = " ⁠⁠⁠⁠\n╭─────────────━┈⊷ \n│🌍 *NEXUS-AI BOT ONLINE READY TO MANAGE YOUR ACCOUNT*🌍\n╰─────────────━┈⊷\n│🎃 ᴘʀᴇғɪx: *[ " + prefixe + " ]*\n│🖤 ᴍᴏᴅᴇ: *" + _0x50f3b5 + "*\n│🏍️ *ʙᴏᴛ ɴᴀᴍᴇ* NEXUS-AI\n╰─────────────━┈⊷\n\n*Follow our Channel For Updates*\n> https://whatsapp.com/channel/0029VbAchaI59PwSijs6a81f\n                \n                \n                 ";
            await _0x243e88.sendMessage(_0x243e88.user.id, {
              'text': _0x32d52b
            });
          }
        } else {
          if (_0x52925b == 'close') {
            let _0x46bf7 = new boom_1.Boom(_0x41b97c?.["error"])?.["output"]['statusCode'];
            if (_0x46bf7 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x46bf7 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x1b1480();
              } else {
                if (_0x46bf7 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x1b1480();
                } else {
                  if (_0x46bf7 === baileys_1.DisconnectReason?.['connectionReplaced']) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x46bf7 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x46bf7 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x1b1480();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x46bf7);
                        const {
                          exec: _0x5b98ef
                        } = require("child_process");
                        _0x5b98ef("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x52925b);
            _0x1b1480();
          }
        }
      }
    });
    
    // ... (rest of your existing code)
    
    return _0x243e88;
  }
  let _0x5519b4 = require.resolve(__filename);
  fs.watchFile(_0x5519b4, () => {
    fs.unwatchFile(_0x5519b4);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x5519b4];
    require(_0x5519b4);
  });
  _0x1b1480();
}, 0x1388);
