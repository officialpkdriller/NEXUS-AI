'use strict';

const { zokou } = require("../framework/zokou");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require('node-catbox');

const catbox = new Catbox();

async function uploadToCatbox(path) {
    if (!fs.existsSync(path)) throw new Error("File does not exist");
    try {
        const response = await catbox.uploadFile({ path });
        if (response) return response;
        throw new Error("Error retrieving the file link");
    } catch (err) {
        throw new Error(String(err));
    }
}

async function convertToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat("mp3")
            .on("error", (err) => reject(err))
            .on("end", () => resolve(outputPath))
            .save(outputPath);
    });
}

zokou({ nomCom: "url", categorie: "General", reaction: "💗" }, async (originMsg, zk, opts) => {
    const { msgRepondu, repondre } = opts;

    if (!msgRepondu) return repondre('⚠️ *Please reply to an image, video, or audio file.*');

    let mediaPath, mediaType;

    try {
        if (msgRepondu.videoMessage) {
            const size = msgRepondu.videoMessage.fileLength;
            if (size > 50 * 1024 * 1024) return repondre('⚠️ *Video too large! Please send a smaller video.*');

            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
            mediaType = 'Video';
        } else if (msgRepondu.imageMessage) {
            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
            mediaType = 'Image';
        } else if (msgRepondu.audioMessage) {
            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
            mediaType = 'Audio';

            const mp3Path = `${mediaPath}.mp3`;
            await convertToMp3(mediaPath, mp3Path);
            fs.unlinkSync(mediaPath);
            mediaPath = mp3Path;
        } else {
            return repondre('⚠️ *Unsupported media type. Reply with image, video, or audio.*');
        }

        const catboxUrl = await uploadToCatbox(mediaPath);
        fs.unlinkSync(mediaPath);

        // Smart newsletter style response
        const msg = `
📰 *NEXUS URL GENERATOR*

📌 *Type:* ${mediaType}
🔗 *Your URL:* ${catboxUrl}

✨ *Tips:*
- Copy & share your link easily
- Works for images, videos & audio
- Powered by NEXUS-AI 💖

💬 Reply to any media to generate a new URL instantly!
`;

        repondre(msg);

    } catch (err) {
        console.error('Error generating URL:', err);
        repondre('⚠️ *Oops! Something went wrong while generating your URL.*');
    }
});
