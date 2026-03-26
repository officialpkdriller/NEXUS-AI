'use strict';

const { zokou } = require("../framework/zokou");
const fs = require('fs');

zokou({ nomCom: "vcf2", categorie: "General", reaction: "📇" }, async (origineMsg, zk, opts) => {
    const { msgRepondu, repondre } = opts;

    if (!msgRepondu.key.remoteJid.endsWith('@g.us')) {
        return repondre('❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n✿ This command is meant for groups only.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤');
    }

    try {
        await zk.react(msgRepondu.key, '⌛'); // Loading reaction

        const gcdata = await zk.groupMetadata(msgRepondu.key.remoteJid);
        const vcard = gcdata.participants
            .map((p, i) => {
                const number = p.id.split('@')[0];
                return `BEGIN:VCARD\nVERSION:3.0\nFN:[${i+1}] +${number}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`;
            })
            .join('\n');

        const tempFile = './GroupContacts.vcf';

        await repondre(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n✿ Compiling *${gcdata.participants.length}* contacts into a VCF... 📝\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);

        await fs.promises.writeFile(tempFile, vcard);

        const captionMsg = `
📰 *NEXUS CONTACT EXPORT*

📌 *Group:* ${gcdata.subject}
👥 *Contacts Count:* ${gcdata.participants.length}

✨ Tips:
- Import this VCF into a separate email account to avoid messing with your main contacts.
- Powered by NEXUS-AI 💖
`;

        await zk.sendMessage(msgRepondu.key.remoteJid, {
            document: fs.readFileSync(tempFile),
            mimetype: 'text/vcard',
            fileName: 'GroupContacts.vcf',
            caption: captionMsg,
            contextInfo: {
                externalAdReply: {
                    title: `VCF Export • ${gcdata.subject}`,
                    body: `Contacts: ${gcdata.participants.length}`,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: msgRepondu });

        await fs.promises.unlink(tempFile);
        await zk.react(msgRepondu.key, '✅'); // Success reaction

    } catch (error) {
        console.error(`VCF error: ${error.message}`);
        await zk.react(msgRepondu.key, '❌'); // Error reaction
        repondre('❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\n✿ Failed to generate VCF. Try again later.\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤');
    }
});
