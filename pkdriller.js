"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { verifierEtatJid, recupererActionJid } = require("./bdd/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("./bdd/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("./bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("./bdd/onlyAdmin");
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, "");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;
const zlib = require('zlib');
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

// Channel/Newsletter JIDs (UPDATE THESE WITH YOUR ACTUAL IDs)
const CHANNEL_JID = "120363023455492333@newsletter"; // Your channel jid
const NEWS_LETTER = "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X"; // Your newsletter link

// Status emojis for different message types
const statusEmojis = {
    text: ['📝', '✍️', '💬', '📨', '📩', '💭', '🗨️', '📌'],
    image: ['📸', '🖼️', '🌅', '🏞️', '📷', '🎑', '🌠', '🌈'],
    video: ['🎥', '📹', '🎬', '📽️', '🎦', '📀', '💽', '📼'],
    audio: ['🎵', '🎶', '🎧', '📻', '🎤', '🎼', '🔊', '🔈'],
    sticker: ['🏷️', '🎭', '🎨', '🖼️', '🃏', '🎴', '🪪', '🔖'],
    document: ['📄', '📃', '📑', '📊', '📈', '📉', '🗂️', '📁'],
    link: ['🔗', '🌐', '🔍', '📎', '🖇️', '🔌', '📡', '📲'],
    poll: ['📊', '📋', '🗳️', '✍️', '✅', '❌', '📝', '📌'],
    contact: ['👤', '📇', '📞', '📱', '🤵', '👥', '🗂️', '🆔'],
    location: ['📍', '🗺️', '🌍', '🌎', '🌏', '🧭', '🏙️', '🗾'],
    voice: ['🎤', '🗣️', '🔊', '📢', '📣', '🎙️', '🔔', '🎛️'],
    gif: ['🎞️', '🖼️', '🎨', '🎭', '🎪', '🎡', '🔄', '🌀'],
    payment: ['💰', '💵', '💳', '💸', '🪙', '🏦', '📦', '🛒'],
    default: ['💫', '✨', '⚡', '💥', '🔥', '⭐', '🌟', '💪']
};

// Funny jokes array for auto bio
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything! 🤓",
    "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
    "Why don't eggs tell jokes? They'd crack each other up! 🥚",
    "What do you call a fake noodle? An impasta! 🍝",
    "Why did the math book look sad? Because it had too many problems! 📚",
    "What do you call a bear with no teeth? A gummy bear! 🐻",
    "Why don't skeletons fight each other? They don't have the guts! 💀",
    "What do you call a sleeping bull? A bulldozer! 🐂",
    "Why did the coffee file a police report? It got mugged! ☕",
    "What do you call a fish with no eyes? A fsh! 🐟",
    "Why can't you give Elsa a balloon? Because she will let it go! 🎈",
    "What do you call a pig that does karate? A pork chop! 🐷",
    "Why did the bicycle fall over? Because it was two-tired! 🚲",
    "How does a penguin build its house? Igloos it together! 🐧",
    "Why was the broom late? It swept in! 🧹",
    "What do you call a sleeping dinosaur? A dino-snore! 🦖",
    "Why are ghosts bad liars? Because you can see right through them! 👻",
    "What do you call a cheese that's not yours? Nacho cheese! 🧀",
    "Why did the tomato turn red? Because it saw the salad dressing! 🍅",
    "What do you call a belt made of watches? A waist of time! ⌚"
];

// Quotes array for auto bio
const quotes = [
    "The only way to do great work is to love what you do. 💫",
    "Success is not final, failure is not fatal. 🌟",
    "Dream big and dare to fail. 🚀",
    "Stay hungry, stay foolish. 💪",
    "Everything you can imagine is real. ✨",
    "The future belongs to those who believe in beauty of their dreams. 🌈",
    "Make it happen, shock everyone. ⚡",
    "Don't stop when you're tired, stop when you're done. 🔥",
    "Believe you can and you're halfway there. 💯",
    "Act as if what you do makes a difference. It does. 🌍",
    "The best time to plant a tree was 20 years ago. The second best time is now. 🌳",
    "Your limitation—it's only your imagination. 🎨",
    "Push yourself, because no one else is going to do it for you. 👊",
    "Great things never come from comfort zones. 🏔️",
    "Dream it. Wish it. Do it. 💫",
    "Success doesn't just find you. You have to go out and get it. 🎯",
    "The harder you work for something, the greater you'll feel when you achieve it. 🏆",
    "Dream bigger. Do bigger. 🌟",
    "Don't stop when you're tired. Stop when you're done. 💪",
    "Wake up with determination. Go to bed with satisfaction. 🌅"
];

// Store for antidelete
const messageStore = {
    chats: {},
    deletedMessages: new Map(),
    editedMessages: new Map(),
    
    loadMessage: async function (jid, id) {
        if (!this.chats[jid]) return null;
        return this.chats[jid].find(msg => msg.key.id === id) || null;
    },
    
    storeMessage: function (jid, message) {
        if (!this.chats[jid]) {
            this.chats[jid] = [];
        }
        this.chats[jid].push(message);
        // Keep only last 50 messages per chat to prevent memory issues
        if (this.chats[jid].length > 50) {
            this.chats[jid].shift();
        }
    },
    
    storeDeleted: function (messageKey, messageData) {
        this.deletedMessages.set(messageKey.id, {
            data: messageData,
            timestamp: Date.now()
        });
        // Clean up old deleted messages after 1 hour
        setTimeout(() => {
            this.deletedMessages.delete(messageKey.id);
        }, 3600000);
    },
    
    getDeleted: function (messageId) {
        return this.deletedMessages.get(messageId);
    }
};

// Auto bio update function
async function updateBotBio(zk) {
    try {
        const now = moment().tz('Africa/Nairobi');
        const date = now.format('MMMM Do YYYY');
        const time = now.format('h:mm:ss A');
        const day = now.format('dddd');
        
        // Get random joke and quote
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const randomEmoji = statusEmojis.default[Math.floor(Math.random() * statusEmojis.default.length)];
        
        // Different bio formats
        const bioFormats = [
            `📅 ${date} | ⏰ ${time} | ${day} ${randomEmoji}`,
            `"${randomQuote}" ${randomEmoji}`,
            `😂 ${randomJoke}`,
            `🤖 NEXUS-AI Online | ${time} | ${randomEmoji}`,
            `✨ ${randomQuote.substring(0, 30)}... ${randomEmoji}`,
            `⚡ Serving with love | ${time}`,
            `🌟 ${randomEmoji} | ${date}`,
            `💫 ${randomJoke.substring(0, 40)}...`
        ];
        
        const selectedBio = bioFormats[Math.floor(Math.random() * bioFormats.length)];
        await zk.updateProfileStatus(selectedBio);
        console.log(`✅ Bio updated: ${selectedBio}`);
    } catch (error) {
        console.error('❌ Error updating bio:', error);
    }
}

// Function to get status emoji based on message type
function getStatusEmoji(message) {
    if (!message || !message.message) return statusEmojis.default[Math.floor(Math.random() * statusEmojis.default.length)];
    
    const mtype = Object.keys(message.message)[0];
    
    if (mtype.includes('image')) return statusEmojis.image[Math.floor(Math.random() * statusEmojis.image.length)];
    if (mtype.includes('video')) return statusEmojis.video[Math.floor(Math.random() * statusEmojis.video.length)];
    if (mtype.includes('audio')) return statusEmojis.audio[Math.floor(Math.random() * statusEmojis.audio.length)];
    if (mtype.includes('sticker')) return statusEmojis.sticker[Math.floor(Math.random() * statusEmojis.sticker.length)];
    if (mtype.includes('document')) return statusEmojis.document[Math.floor(Math.random() * statusEmojis.document.length)];
    if (mtype.includes('contact')) return statusEmojis.contact[Math.floor(Math.random() * statusEmojis.contact.length)];
    if (mtype.includes('location')) return statusEmojis.location[Math.floor(Math.random() * statusEmojis.location.length)];
    if (mtype.includes('poll')) return statusEmojis.poll[Math.floor(Math.random() * statusEmojis.poll.length)];
    
    // Check for link in text
    if (message.message.conversation && message.message.conversation.match(/https?:\/\/[^\s]+/g)) {
        return statusEmojis.link[Math.floor(Math.random() * statusEmojis.link.length)];
    }
    
    return statusEmojis.text[Math.floor(Math.random() * statusEmojis.text.length)];
}

// Function to handle deleted messages with emojis
async function handleDeletedMessage(zk, deletedMessage, remoteJid) {
    try {
        const deletedBy = deletedMessage.key.participant || deletedMessage.key.remoteJid;
        const timeInNairobi = moment().tz('Africa/Nairobi').format('MMMM Do YYYY, h:mm:ss A');
        const statusEmoji = getStatusEmoji(deletedMessage);
        
        let notification = `╭━━━〔 🚨 *ANTI-DELETE* 〕━━━╮\n`;
        notification += `┃ ${statusEmoji} *Message Deleted*\n`;
        notification += `┃ ⏰ *Time:* ${timeInNairobi}\n`;
        notification += `┃ 👤 *Deleted By:* @${deletedBy.split('@')[0]}\n`;
        notification += `┃ 📍 *From:* ${remoteJid.includes('@g.us') ? 'Group' : 'Private'}\n`;
        
        // Determine message type and content
        const mtype = Object.keys(deletedMessage.message)[0];
        
        if (mtype === 'conversation' || mtype === 'extendedTextMessage') {
            notification += `┃ 💬 *Message:* ${deletedMessage.message[mtype].text || deletedMessage.message.conversation}\n`;
            await zk.sendMessage(CHANNEL_JID, {
                text: notification,
                mentions: [deletedBy]
            });
        } else if (mtype.includes('image') || mtype.includes('video') || mtype.includes('audio')) {
            notification += `┃ 📎 *Type:* ${mtype.replace('Message', '').toUpperCase()}\n`;
            // Download and forward media
            const mediaBuffer = await downloadMedia(zk, deletedMessage.message);
            if (mediaBuffer) {
                const mediaType = mtype.replace('Message', '').toLowerCase();
                await zk.sendMessage(CHANNEL_JID, {
                    [mediaType]: mediaBuffer,
                    caption: notification,
                    mentions: [deletedBy]
                });
            }
        }
        
        notification += `╰━━━━━━━━━━━━━━━━━━╯\n`;
        notification += `📢 *Join our channel:* ${NEWS_LETTER}`;
        
        console.log(`✅ Deleted message handled with ${statusEmoji}`);
    } catch (error) {
        console.error('❌ Error handling deleted message:', error);
    }
}

// Download media helper function
async function downloadMedia(zk, message) {
    try {
        const mediaType = Object.keys(message)[0].replace('Message', '');
        const stream = await zk.downloadContentFromMessage(message[Object.keys(message)[0]], mediaType.toLowerCase());
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    } catch (error) {
        console.error('Error downloading media:', error);
        return null;
    }
}

// Function to get group image with fallback
async function getGroupImage(zk, groupId) {
    try {
        return await zk.profilePictureUrl(groupId, 'image');
    } catch {
        return 'https://files.catbox.moe/2md9k8.jpg';
    }
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

async function authentification() {
    try {
        if (!fs.existsSync(__dirname + "/scan/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        }
        else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();

setTimeout(() => {
    authentification();
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/scan");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['NEXUS-AI', "Chrome", "10.0.0"],
            printQRInTerminal: false,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: true,
            keepAliveIntervalMs: 30_000,
            auth: {
                creds: state.creds,
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            getMessage: async (key) => {
                const msg = await messageStore.loadMessage(key.remoteJid, key.id);
                return msg?.message || { conversation: "" };
            }
        };

        const zk = (0, baileys_1.default)(sockOptions);
   
        const rateLimit = new Map();

        // Rate limiting
        function isRateLimited(jid) {
            const now = Date.now();
            if (!rateLimit.has(jid)) {
                rateLimit.set(jid, now);
                return false;
            }
            const lastRequestTime = rateLimit.get(jid);
            if (now - lastRequestTime < 1000) { // 1 second rate limit for faster responses
                return true;
            }
            rateLimit.set(jid, now);
            return false;
        }

        // Group metadata cache
        const groupMetadataCache = new Map();
        async function getGroupMetadata(zk, groupId) {
            if (groupMetadataCache.has(groupId)) {
                return groupMetadataCache.get(groupId);
            }
            try {
                const metadata = await zk.groupMetadata(groupId);
                groupMetadataCache.set(groupId, metadata);
                setTimeout(() => groupMetadataCache.delete(groupId), 300000); // 5 minutes cache
                return metadata;
            } catch (error) {
                return null;
            }
        }

        // Silent error handling
        process.on("uncaughtException", (err) => {});
        process.on("unhandledRejection", (err) => {});

        // AI Response function
        const availableApis = [
            "https://bk9.fun/ai/llama?q=",
            "https://bk9.fun/ai/Aoyo?q="
        ];

        function getRandomApi() {
            return availableApis[Math.floor(Math.random() * availableApis.length)];
        }

        function processForTTS(text) {
            if (!text || typeof text !== 'string') return '';
            return text.replace(/[\[\]\(\)\{\}]/g, ' ')
                      .replace(/\s+/g, ' ')
                      .substring(0, 190);
        }

        async function getAIResponse(query) {
            try {
                const apiUrl = getRandomApi();
                const response = await fetch(apiUrl + encodeURIComponent(query));
                try {
                    const data = await response.json();
                    let aiResponse = data.BK9 || data.result || data.response || data.message || 
                                   (data.data && (data.data.text || data.data.message)) || 
                                   JSON.stringify(data);
                    
                    if (typeof aiResponse === 'object') {
                        aiResponse = JSON.stringify(aiResponse);
                    }
                    
                    return aiResponse;
                } catch (jsonError) {
                    const textResponse = await response.text();
                    return textResponse;
                }
            } catch (error) {
                console.error("API Error:", error);
                return "Sorry, I couldn't get a response right now. Please try again later.";
            }
        }

        // Auto bio update interval (every 60 seconds)
        setInterval(() => {
            if (zk.user && zk.user.id) {
                updateBotBio(zk);
            }
        }, 60000);

        // Message handling with antidelete
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            if (!messages || messages.length === 0) return;
            
            for (const ms of messages) {
                if (!ms.message) continue;
                
                const from = ms.key.remoteJid;
                if (isRateLimited(from)) continue;
                
                // Store message for antidelete
                if (conf.ANTIDELETE2 === "yes" || conf.ANTIDELETE1 === "yes") {
                    messageStore.storeMessage(from, ms);
                    
                    // Handle deleted messages
                    if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
                        const deletedKey = ms.message.protocolMessage.key;
                        const deletedMessage = messageStore.chats[from]?.find(
                            msg => msg.key.id === deletedKey.id
                        );
                        
                        if (deletedMessage) {
                            await handleDeletedMessage(zk, deletedMessage, from);
                        }
                    }
                }
            }
        });

        // Handle status updates with emojis
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            
            for (const message of messages) {
                if (message.key && message.key.remoteJid === "status@broadcast") {
                    if (conf.AUTO_READ_STATUS === "yes") {
                        await zk.readMessages([message.key]);
                    }
                    
                    if (conf.AUTO_REACT_STATS === "yes") {
                        const statusEmoji = getStatusEmoji(message);
                        await zk.sendMessage(message.key.remoteJid, {
                            react: {
                                key: message.key,
                                text: statusEmoji,
                            }
                        });
                        console.log(`✅ Reacted to status with ${statusEmoji}`);
                    }
                    
                    if (conf.AUTO_DOWNLOAD_STATUS === "yes") {
                        // Forward status to channel
                        const statusEmoji = getStatusEmoji(message);
                        let statusText = `${statusEmoji} *Status Update*\n\n`;
                        
                        if (message.message.extendedTextMessage) {
                            statusText += message.message.extendedTextMessage.text;
                            await zk.sendMessage(CHANNEL_JID, { text: statusText });
                        } else if (message.message.imageMessage) {
                            const caption = message.message.imageMessage.caption || '';
                            const mediaBuffer = await downloadMedia(zk, message.message);
                            if (mediaBuffer) {
                                await zk.sendMessage(CHANNEL_JID, {
                                    image: mediaBuffer,
                                    caption: statusText + caption
                                });
                            }
                        } else if (message.message.videoMessage) {
                            const caption = message.message.videoMessage.caption || '';
                            const mediaBuffer = await downloadMedia(zk, message.message);
                            if (mediaBuffer) {
                                await zk.sendMessage(CHANNEL_JID, {
                                    video: mediaBuffer,
                                    caption: statusText + caption
                                });
                            }
                        }
                    }
                }
            }
        });

        // Chatbot functionality
        if (conf.CHATBOT === "yes" || conf.AUDIO_CHATBOT === "yes") {
            zk.ev.on("messages.upsert", async ({ messages }) => {
                try {
                    const msg = messages[0];
                    if (!msg?.message || msg.key.fromMe) return;

                    const jid = msg.key.remoteJid;
                    let text = '';
                    
                    if (msg.message.conversation) {
                        text = msg.message.conversation;
                    } else if (msg.message.extendedTextMessage?.text) {
                        text = msg.message.extendedTextMessage.text;
                    } else if (msg.message.imageMessage?.caption) {
                        text = msg.message.imageMessage.caption;
                    }

                    if (!text || typeof text !== 'string') return;

                    const aiResponse = await getAIResponse(text);

                    if (conf.CHATBOT === "yes") {
                        await zk.sendMessage(jid, { 
                            text: String(aiResponse)
                        }, { quoted: msg });
                    }
                } catch (error) {
                    console.error("Message processing error:", error);
                }
            });
        }

        // Call handling
        zk.ev.on("call", async (callData) => {
            if (conf.ANTICALL === 'yes') {
                const callId = callData[0].id;
                const callerId = callData[0].from;
                await zk.rejectCall(callId, callerId);
                await zk.sendMessage(callerId, {
                    text: `📞 *Call Rejected*\n\nHello! I'm NEXUS-AI, a WhatsApp bot. I don't accept calls. Please text me instead.\n\n📢 Join our channel: ${NEWS_LETTER}`
                });
            }
        });

        // Auto read messages
        if (conf.AUTO_READ === 'yes') {
            zk.ev.on('messages.upsert', async (m) => {
                const { messages } = m;
                for (const message of messages) {
                    if (!message.key.fromMe) {
                        await zk.readMessages([message.key]);
                    }
                }
            });
        }

        // Welcome and Goodbye messages with channel and group image
        const { recupevents } = require('./bdd/welcome');
        
        zk.ev.on('group-participants.update', async (group) => {
            try {
                const metadata = await zk.groupMetadata(group.id);
                const groupImage = await getGroupImage(zk, group.id);
                const timeInNairobi = moment().tz('Africa/Nairobi').format('MMMM Do YYYY, h:mm:ss A');
                
                if (group.action == 'add' && (await recupevents(group.id, "welcome")) == 'on') {
                    let welcomeMsg = `╭━━━〔 🎉 *WELCOME* 〕━━━╮\n`;
                    welcomeMsg += `┃ 👋 *Welcome to the group!*\n`;
                    welcomeMsg += `┃ ⏰ *Time:* ${timeInNairobi}\n`;
                    welcomeMsg += `┃ 📍 *Group:* ${metadata.subject}\n`;
                    welcomeMsg += `┃ 👥 *Members:* ${metadata.participants.length}\n`;
                    
                    let mentions = [];
                    for (let membre of group.participants) {
                        welcomeMsg += `┃ 🎊 @${membre.split("@")[0]}\n`;
                        mentions.push(membre);
                    }
                    
                    welcomeMsg += `┃\n┃ 📖 *Please read the group description*\n`;
                    welcomeMsg += `┃ 🤖 *Powered by NEXUS-AI*\n`;
                    welcomeMsg += `╰━━━━━━━━━━━━━━━━━━╯\n`;
                    welcomeMsg += `📢 *Join our channel:* ${NEWS_LETTER}`;
                    
                    await zk.sendMessage(group.id, {
                        image: { url: groupImage },
                        caption: welcomeMsg,
                        mentions: mentions
                    });
                    
                    console.log(`✅ Welcome message sent to ${metadata.subject}`);
                    
                } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye")) == 'on') {
                    let goodbyeMsg = `╭━━━〔 👋 *GOODBYE* 〕━━━╮\n`;
                    goodbyeMsg += `┃ 😢 *Member(s) left the group*\n`;
                    goodbyeMsg += `┃ ⏰ *Time:* ${timeInNairobi}\n`;
                    goodbyeMsg += `┃ 📍 *Group:* ${metadata.subject}\n`;
                    
                    let mentions = [];
                    for (let membre of group.participants) {
                        goodbyeMsg += `┃ 👋 @${membre.split("@")[0]}\n`;
                        mentions.push(membre);
                    }
                    
                    goodbyeMsg += `┃\n┃ 🌟 *We'll miss you!*\n`;
                    goodbyeMsg += `┃ 🤖 *NEXUS-AI*\n`;
                    goodbyeMsg += `╰━━━━━━━━━━━━━━━━━━╯\n`;
                    goodbyeMsg += `📢 *Join our channel:* ${NEWS_LETTER}`;
                    
                    await zk.sendMessage(group.id, {
                        image: { url: groupImage },
                        caption: goodbyeMsg,
                        mentions: mentions
                    });
                    
                    console.log(`✅ Goodbye message sent to ${metadata.subject}`);
                }
            } catch (e) {
                console.error('Error in group update:', e);
            }
        });

        // Connection update with channel message and auto bio
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            
            if (connection === "connecting") {
                console.log("🔌 NEXUS-AI is connecting...");
            }
            else if (connection === 'open') {
                console.log("✅ NEXUS-AI Connected to WhatsApp! ☺️");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("🚀 NEXUS-AI is Online 🕸\n\n");
                
                // Initial bio update
                await updateBotBio(zk);
                
                // Load commands
                console.log("📦 Loading NEXUS-AI Commands ...\n");
                fs.readdirSync(__dirname + "/pkdriller").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/pkdriller/" + fichier);
                            console.log(`✅ ${fichier} Installed Successfully`);
                        }
                        catch (e) {
                            console.log(`❌ ${fichier} could not be installed due to: ${e}`);
                        }
                        (0, baileys_1.delay)(100);
                    }
                });
                
                await (0, baileys_1.delay)(700);
                
                var md = (conf.MODE).toLocaleLowerCase() === "yes" ? "public" : "private";
                
                console.log("✅ Commands Installation Completed");
                
                // Send connection message to channel
                const connectionTime = moment().tz('Africa/Nairobi').format('MMMM Do YYYY, h:mm:ss A');
                const connectionMsg = `╭━━━〔 🤖 *NEXUS-AI* 〕━━━╮\n`;
                connectionMsg += `┃ 🚀 *Bot Connected Successfully!*\n`;
                connectionMsg += `┃ ⏰ *Time:* ${connectionTime}\n`;
                connectionMsg += `┃ 📊 *Mode:* ${md.toUpperCase()}\n`;
                connectionMsg += `┃ ⚡ *Prefix:* [ ${prefixe} ]\n`;
                connectionMsg += `┃ 📱 *Status:* Online\n`;
                connectionMsg += `┃ 💫 *Version:* 2.0.0\n`;
                connectionMsg += `╰━━━━━━━━━━━━━━━━━━╯\n`;
                connectionMsg += `📢 *Join our channel:* ${NEWS_LETTER}`;
                
                await zk.sendMessage(CHANNEL_JID, { text: connectionMsg });
                
                if((conf.DP).toLowerCase() === 'yes') {     
                    let cmsg =`╭━━━〔 🤖 *NEXUS-AI* 〕━━━╮\n`;
                    cmsg += `┃ 📌 *Prefix:* [ ${prefixe} ]\n`;
                    cmsg += `┃ 📊 *Mode:* ${md}\n`;
                    cmsg += `┃ 🤖 *Bot Name:* NEXUS-AI\n`;
                    cmsg += `┃ 👤 *Owner:* RAHMANI TECH\n`;
                    cmsg += `╰━━━━━━━━━━━━━━━━━━╯\n`;
                    cmsg += `📢 *Join our channel:*\n${NEWS_LETTER}`;
                    
                    await zk.sendMessage(zk.user.id, { text: cmsg });
                }
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('❌ Session id error, rescan again...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('🔄 Connection closed, reconnecting...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('📡 Connection lost, trying to reconnect...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('⚠️ Connection replaced, another session is open!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('🚪 Logged out, please scan QR again');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('🔄 Restart required, restarting...');
                    main();
                } else {
                    console.log('🔄 Restarting due to error:', raisonDeconnexion);
                    const { exec } = require("child_process");
                    exec("pm2 restart all");
                }
                main();
            }
        });

        // Creds update
        zk.ev.on("creds.update", saveCreds);

        // Utility functions
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };

        zk.awaitForMessage = async (options = {}) => {
            return new Promise((resolve, reject) => {
                if (typeof options !== 'object') reject(new Error('Options must be an object'));
                if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
                if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
                if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
                if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));

                const timeout = options?.timeout || undefined;
                const filter = options?.filter || (() => true);
                let interval = undefined;

                let listener = (data) => {
                    let { type, messages } = data;
                    if (type == "notify") {
                        for (let message of messages) {
                            const fromMe = message.key.fromMe;
                            const chatId = message.key.remoteJid;
                            const isGroup = chatId.endsWith('@g.us');
                            const isStatus = chatId == 'status@broadcast';

                            const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                            if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                                zk.ev.off('messages.upsert', listener);
                                clearTimeout(interval);
                                resolve(message);
                            }
                        }
                    }
                };
                
                zk.ev.on('messages.upsert', listener);
                if (timeout) {
                    interval = setTimeout(() => {
                        zk.ev.off('messages.upsert', listener);
                        reject(new Error('Timeout'));
                    }, timeout);
                }
            });
        };

        return zk;
    }
    
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`🔄 Updating ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    
    main();
}, 5000);
