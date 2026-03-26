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

        if (!arg[0]) {
            return zk.sendMessage(dest, {
                text: `╭─❏ *🔐 NEXUS-AI PAIR SYSTEM*\n│\n│ 📌 Usage: *pair <number>*\n│ 📌 Example: *pair 254712345678*\n│\n╰───────────────❏`,
            }, { quoted: ms });
        }

        const number = arg.join("").replace(/[^0-9]/g, '');
        const encoded = encodeURIComponent(number);

        await zk.sendMessage(dest, {
            text: `╭─❏ *🔄 GENERATING PAIR CODE*\n│\n│ 📱 Number: *${number}*\n│ ⏳ Processing...\n│\n╰───────────────❏`
        }, { quoted: ms });

        let code = null;

        // ✅ API 1 (FIXED URL)
        try {
            const { data } = await axios.get(`https://nezxus-session-b1d9a3226d1e.herokuapp.com/code?number=${encoded}`);
            console.log("API1:", data);
            if (data?.code) code = data.code;
        } catch (e) {
            console.log("API1 ERROR:", e.message);
        }

        // ✅ API 2 (STRONG BACKUP)
        if (!code) {
            try {
                const { data } = await axios.get(`https://session-id-site-fycn.onrender.com/code?number=${encoded}`);
                console.log("API2:", data);
                if (data?.code) code = data.code;
            } catch (e) {
                console.log("API2 ERROR:", e.message);
            }
        }

        // ✅ API 3 (FINAL BACKUP)
        if (!code) {
            try {
                const { data } = await axios.get(`https://session-id-site-fycn.onrender.com/pair?number=${encoded}`);
                console.log("API3:", data);
                if (data?.pairCode) code = data.pairCode;
                else if (data?.code) code = data.code;
            } catch (e) {
                console.log("API3 ERROR:", e.message);
            }
        }

        // ✅ SUCCESS
        if (code) {
            return zk.sendMessage(dest, {
                text: code.toString().trim()
            }, { quoted: ms });
        }

        // ❌ FAILED
        return zk.sendMessage(dest, {
            text: `╭─❏ *❌ PAIR FAILED*\n│\n│ No API returned code\n│ Try again later\n│\n╰───────────────❏`
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Pair Error:", e);

        await zk.sendMessage(dest, {
            text: `❌ Error: ${e.message}`
        }, { quoted: ms });
    }
});
