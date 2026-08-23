const { zokou } = require('../framework/zokou');
const { attribuerUnevaleur, recupererUnevaleur } = require('../bdd/welcome');

// ═══════════════════════════════════════════════
// NEXUS-AI — WELCOME & GOODBYE SYSTEM
// ═══════════════════════════════════════════════

async function events(nomCom) {
    zokou(
        {
            nomCom: nomCom,
            categorie: 'Group'
        },
        async (dest, zk, commandeOptions) => {
            const { arg, repondre, superUser, verifAdmin } = commandeOptions;

            if (!verifAdmin && !superUser) {
                return repondre("❌ You can't use this command.");
            }

            if (!arg[0]) {
                return repondre(
                    `╭━━━〔 NEXUS-AI 〕━━━╮\n` +
                    `┃\n` +
                    `┃ ⚙️ *${nomCom.toUpperCase()} SETTINGS*\n` +
                    `┃\n` +
                    `┃ Use:\n` +
                    `┃ • .${nomCom} on\n` +
                    `┃ • .${nomCom} off\n` +
                    `┃\n` +
                    `╰━━━━━━━━━━━━━━━━━━╯`
                );
            }

            const option = arg[0].toLowerCase();

            if (option !== 'on' && option !== 'off') {
                return repondre(
                    `❌ Invalid option.\n\nUse *.${nomCom} on* or *.${nomCom} off*.`
                );
            }

            await attribuerUnevaleur(dest, nomCom, option);

            const status = option === 'on' ? '🟢 ENABLED' : '🔴 DISABLED';

            return repondre(
                `╭━━━〔 NEXUS-AI 〕━━━╮\n` +
                `┃\n` +
                `┃ ⚙️ *${nomCom.toUpperCase()}*\n` +
                `┃\n` +
                `┃ Status: ${status}\n` +
                `┃\n` +
                `╰━━━━━━━━━━━━━━━━━━╯`
            );
        }
    );
}

// Settings commands
events('welcome');
events('goodbye');


// ═══════════════════════════════════════════════
// GROUP EVENT HANDLER
// ═══════════════════════════════════════════════

zokou(
    {
        nomCom: 'group-event',
        categorie: 'Group'
    },
    async (dest, zk, commandeOptions) => {
        try {
            const { ms } = commandeOptions;

            // Make sure this is a group
            if (!dest.endsWith('@g.us')) return;

            // Get group metadata
            const metadata = await zk.groupMetadata(dest);

            // Baileys group participant update
            const participants =
                ms?.message?.groupParticipantsUpdateMessage?.participants || [];

            const action =
                ms?.message?.groupParticipantsUpdateMessage?.action;

            if (!participants || !participants.length || !action) return;

            // ═══════════════════════════════════════
            // WELCOME
            // ═══════════════════════════════════════

            if (action === 'add') {
                let welcomeStatus = 'off';

                try {
                    welcomeStatus = await recupererUnevaleur(dest, 'welcome');
                } catch (e) {
                    welcomeStatus = 'off';
                }

                if (welcomeStatus !== 'on') return;

                for (const participant of participants) {
                    const username = participant.split('@')[0];

                    const welcomeMessage =
                        `╭━━━〔 *NEXUS-AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ 👋 *WELCOME!*\n` +
                        `┃\n` +
                        `┃ Hello @${username} 👋\n` +
                        `┃ Welcome to *${metadata.subject}*!\n` +
                        `┃\n` +
                        `┃ 📌 Please read the group rules.\n` +
                        `┃ 🤝 Respect all members.\n` +
                        `┃ 🚫 No spam or unnecessary links.\n` +
                        `┃\n` +
                        `┃ Enjoy your stay! ❤️\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯`;

                    await zk.sendMessage(dest, {
                        text: welcomeMessage,
                        mentions: [participant]
                    });
                }
            }


            // ═══════════════════════════════════════
            // GOODBYE
            // ═══════════════════════════════════════

            if (action === 'remove') {
                let goodbyeStatus = 'off';

                try {
                    goodbyeStatus = await recupererUnevaleur(dest, 'goodbye');
                } catch (e) {
                    goodbyeStatus = 'off';
                }

                if (goodbyeStatus !== 'on') return;

                for (const participant of participants) {
                    const username = participant.split('@')[0];

                    const goodbyeMessage =
                        `╭━━━〔 *NEXUS-AI* 〕━━━╮\n` +
                        `┃\n` +
                        `┃ 👋 *GOODBYE!*\n` +
                        `┃\n` +
                        `┃ @${username} has left the group. 😢\n` +
                        `┃\n` +
                        `┃ We wish you all the best! ❤️\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━╯`;

                    await zk.sendMessage(dest, {
                        text: goodbyeMessage,
                        mentions: [participant]
                    });
                }
            }

        } catch (error) {
            console.error('NEXUS-AI Group Event Error:', error);
        }
    }
);
