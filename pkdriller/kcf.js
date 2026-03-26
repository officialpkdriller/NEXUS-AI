'use strict';

const { zokou } = require("../framework/zokou");
const fetch = require("node-fetch");

zokou({ nomCom: "xvideo", categorie: "General", reaction: "💻" }, async (originMsg, zk, opts) => {
    const { msgRepondu, repondre } = opts;
    const text = msgRepondu?.conversation || msgRepondu?.caption || "";

    if (!text) return repondre("⚠️ Type something to search, genius!");
    if (text.length > 150) return repondre("⚠️ Keep your search under 150 characters, bro.");

    try {
        // ⏳ Loading reaction
        await zk.react(msgRepondu.key, '⌛');

        const searchQuery = encodeURIComponent(text.trim());
        const searchResponse = await fetch(`https://api.nekolabs.web.id/discovery/xvideos/search?q=${searchQuery}`);
        const searchData = await searchResponse.json();

        if (!searchData.success || !searchData.result || searchData.result.length === 0) {
            await zk.react(msgRepondu.key, '❌');
            return repondre(`⚠️ No results found for "${text}". Try better keywords.`);
        }

        const firstVideo = searchData.result[0];
        const videoPageUrl = firstVideo.url;
        const videoTitle = firstVideo.title || "Untitled Clip";
        const duration = firstVideo.duration || "??";
        const cleanTitle = `${videoTitle.replace(/[^a-zA-Z0-9]/g, "_")}__${duration.replace(/[^a-zA-Z0-9]/g, "")}`;

        // Fetch downloadable link
        const encodedVideoUrl = encodeURIComponent(videoPageUrl);
        const downloadResponse = await fetch(`https://api.nekolabs.web.id/downloader/xvideos?url=${encodedVideoUrl}`);
        const downloadData = await downloadResponse.json();

        if (!downloadData.success || !downloadData.result || !downloadData.result.videos) {
            await zk.react(msgRepondu.key, '❌');
            return repondre("⚠️ Found the video but cannot download it right now.");
        }

        const videoDownloadUrl = downloadData.result.videos.high || downloadData.result.videos.low;
        if (!videoDownloadUrl) {
            await zk.react(msgRepondu.key, '❌');
            return repondre("⚠️ No proper MP4 link available. Only HLS found.");
        }

        // ✅ Success reaction
        await zk.react(msgRepondu.key, '✅');

        // Smart newsletter style message
        const captionMsg = `
📰 *NEXUS VIDEO DISCOVERY*

📌 *Title:* ${videoTitle}
⏱ *Duration:* ${duration}
🔗 *Source:* [Click Here](${videoPageUrl})

✨ Tips:
- Share or save this clip
- Works for educational purposes only
- Powered by NEXUS-AI 💖

Reply with another search to generate a new link instantly!
`;

        await zk.sendMessage(msgRepondu.key.remoteJid, {
            video: { url: videoDownloadUrl },
            mimetype: "video/mp4",
            fileName: `${cleanTitle}.mp4`,
            caption: captionMsg,
            contextInfo: {
                externalAdReply: {
                    title: videoTitle.length > 80 ? videoTitle.substring(0, 77) + "..." : videoTitle,
                    body: "Suck it up • Edu purposes only",
                    thumbnailUrl: downloadData.result.thumb || firstVideo.cover,
                    sourceUrl: videoPageUrl,
                    mediaType: 2,
                    renderLargerThumbnail: true,
                },
            },
        }, { quoted: msgRepondu });

    } catch (error) {
        console.error(error);
        await zk.react(msgRepondu.key, '❌');
        repondre("⚠️ Something went wrong while generating your video. Try again later.");
    }
});
