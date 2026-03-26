'use strict';

const { zokou } = require(__dirname + "/../framework/zokou");
const axios = require("axios");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

moment.tz.setDefault(conf.TZ);

zokou({ nomCom: "repo", categorie: "General", reaction: "📦" }, async (dest, zk, commandeOptions) => {
    const { ms } = commandeOptions;

    const REPO_API = "https://api.github.com/repos/officialPkdriller/NEXUS-AI";
    const REPO_URL = "https://github.com/officialPkdriller/NEXUS-AI";

    try {
        const res = await axios.get(REPO_API, { headers: { "User-Agent": "NEXUS-AI" }, timeout: 5000 });
        const data = res.data;

        const stars = data.stargazers_count || 0;
        const forks = data.forks_count || 0;
        const issues = data.open_issues_count || 0;
        const watchers = data.watchers_count || 0;
        const owner = data.owner.login;
        const repoName = data.name;
        const description = data.description || "No description available";
        const lastUpdate = moment(data.updated_at).format("DD/MM/YYYY HH:mm");

        const time = moment().format("HH:mm:ss");
        const date = moment().format("DD/MM/YYYY");

        const msg = `╭─❏ *📦 NEXUS-AI REPOSITORY*\n` +
                    `│\n` +
                    `│ 📝 Description: *${description.substring(0, 50)}${description.length > 50 ? '...' : ''}*\n` +
                    `│ 👨‍💻 Developer: *${owner}*\n` +
                    `│ 📁 Repo: *${repoName}*\n` +
                    `│ ⭐ Stars: *${stars}*\n` +
                    `│ 🍴 Forks: *${forks}*\n` +
                    `│ 👁 Watchers: *${watchers}*\n` +
                    `│ 🐛 Issues: *${issues}*\n` +
                    `│ 🔄 Last Update: *${lastUpdate}*\n` +
                    `│ 🌐 Repo Link: ${REPO_URL}\n` +
                    `│\n` +
                    `│ 📆 Date: *${date}*\n` +
                    `│ 🕒 Time: *${time}*\n` +
                    `╰───────────────❏`;

        await zk.sendMessage(dest, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363417804135599@newsletter",
                    newsletterName: "NEXUS-AI",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "📦 NEXUS-AI REPO INFO",
                    body: "Visit the repository for more details",
                    thumbnailUrl: conf.LOGO,
                    sourceUrl: REPO_URL,
                    mediaType: 1
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Repo Command Error:", e);
        await zk.sendMessage(dest, { text: `❌ Error fetching repo info: ${e.message}` }, { quoted: ms });
    }
});
