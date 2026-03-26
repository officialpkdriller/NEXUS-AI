'use strict';

const { zokou } = require(__dirname + "/../framework/zokou");
const axios = require("axios");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

moment.tz.setDefault(conf.TZ);

zokou({
    nomCom: "pair",
    aliases: ["session", "paircode", "qrcode", "getcode"],
    categorie: "General",
    reaction: "🔐"
}, async (dest, zk, commandeOptions) => {

    const { ms, arg } = commandeOptions;

    try {

        // ❌ No number provided
        if (!arg[0]) {
            return zk.sendMessage(dest, {
                text: `╭─❏ *🔐 NEXUS-AI PAIR SYSTEM*\n` +
                      `│\n` +
                      `│ 📌 Usage: *pair <number>*\n` +
                      `│ 📌 Example: *pair 254712345678*\n` +
                      `│\n` +
                      `│ ⚠️ Include country code\n` +
                      `│\n` +
                      `╰───────────────❏`,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363288304618280@newsletter",
                        newsletterName: "NEXUS-AI",
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "🔐 NEXUS PAIR SYSTEM",
                        body: "Enter your number to generate code",
                        thumbnailUrl: conf.LOGO,
                        sourceUrl: conf.GURL,
                        mediaType: 1
                    }
                }
            }, { quoted: ms });
        }

        const number = arg.join("").replace(/[^0-9]/g, '');

        // ⏳ Generating message
        await zk.sendMessage(dest, {
            text: `╭─❏ *🔄 GENERATING PAIR CODE*\n` +
                  `│\n` +
                  `│ 📱 Number: *${number}*\n` +
                  `│ ⏳ Status: *Processing...*\n` +
                  `│\n` +
                  `╰───────────────❏`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363417804135599@newsletter",
                    newsletterName: "NEXUS-AI",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "⚡ Generating Pair Code",
                    body: number,
                    thumbnailUrl: conf.LOGO,
                    sourceUrl: conf.GURL,
                    mediaType: 1
                }
            }
        }, { quoted: ms });

        const encoded = encodeURIComponent(number);

        let code = null;

        // API 1
        try {
            const { data } = await axios.get(`https://nezxus-session-b1d9a3226d1e.herokuapp.com//code?number=${encoded}`, { timeout: 15000 });
            if (data?.code) code = data.code;
        } catch {}

        // API 2
        if (!code) {
            try {
                const { data } = await axios.get(`https://nezxus-session-b1d9a3226d1e.herokuapp.com/pair?number=${encoded}`, { timeout: 15000 });
                if (data?.pairCode) code = data.pairCode;
                else if (data?.code) code = data.code;
            } catch {}
        }

        // ✅ SUCCESS → SEND ONLY CODE
        if (code) {
            return zk.sendMessage(dest, {
                text: code.toString().trim()
            }, { quoted: ms });
        }

        // ❌ FAILED
        await zk.sendMessage(dest, {
            text: `╭─❏ *❌ PAIR FAILED*\n` +
                  `│\n` +
                  `│ Unable to generate code\n` +
                  `│\n` +
                  `│ 💡 Check:\n` +
                  `│ • Number format\n` +
                  `│ • Try again later\n` +
                  `│\n` +
                  `╰───────────────❏`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363417804135599@newsletter",
                    newsletterName: "NEXUS-AI",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "❌ Pair Failed",
                    body: "Try again later",
                    thumbnailUrl: conf.LOGO,
                    sourceUrl: conf.GURL,
                    mediaType: 1
                }
            }
        }, { quoted: ms });

    } catch (e) {

        console.log("❌ Pair Error:", e);

        await zk.sendMessage(dest, {
            text: `╭─❏ *❌ SYSTEM ERROR*\n` +
                  `│\n` +
                  `│ ${e.message}\n` +
                  `│\n` +
                  `╰───────────────❏`
        }, { quoted: ms });
    }
});
