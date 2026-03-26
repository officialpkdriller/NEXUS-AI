'use strict';

const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ nomCom: "apk", categorie: "Download", reaction: "📱" }, async (dest, zk, opts) => {
    const { repondre, arg } = opts;

    if (!arg[0]) {
        return repondre(`
📰 *NEXUS APK DOWNLOADER*

📋 *Usage:*
• apk <app name>

📝 *Examples:*
• apk facebook
• apk whatsapp
• apk instagram
• apk tiktok

✨ *Features:*
• APK file download
• App information
• Safe direct link

> Powered by NEXUS-AI 💖
`);
    }

    try {
        await zk.sendMessage(dest, { react: { text: '⌛', key: opts.ms.key } });

        const query = encodeURIComponent(arg.join(" "));
        const url = `https://ws75.aptoide.com/api/7/apps/search/query=${query}`;

        const { data } = await axios.get(url);

        if (!data?.datalist?.list?.length) {
            await zk.sendMessage(dest, { react: { text: '❌', key: opts.ms.key } });
            return repondre(`
📰
