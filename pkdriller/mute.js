const { zokou } = require("../framework/zokou")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot")
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

// Store muted groups
let mutedGroups = new Map();

zokou({ 
    nomCom: "mute", 
    categorie: 'Group', 
    reaction: "🔇" 
}, async (dest, zk, commandeOptions) => {

    const { 
        ms, 
        repondre, 
        arg, 
        verifGroupe, 
        nomGroupe, 
        verifAdmin, 
        superUser 
    } = commandeOptions;

    if (!verifGroupe) { 
        repondre(" thís cσmmαnd ís rєsєrvєd fσr grσups"); 
        return; 
    }

    if (!verifAdmin && !superUser) { 
        repondre("cσmmαnd ís rєsєrvєd fσr αdmíns  σnlч"); 
        return; 
    }

    let duration = arg && arg[0] ? parseInt(arg[0]) : 60;
    let unit = arg && arg[1] ? arg[1] : 'minutes';
    
    let timeInMs = duration * (unit === 'hours' ? 3600000 : unit === 'seconds' ? 1000 : 60000);
    
    mutedGroups.set(dest, {
        muted: true,
        until: Date.now() + timeInMs,
        mutedBy: superUser ? 'Owner' : 'Admin'
    });

    let tag = `  
┌─────────────────
│ 🔇 *GROUP MUTED* 🔇
│
│ *Group :* ${nomGroupe}
│ *Duration :* ${duration} ${unit}
│ *Muted by :* ${superUser ? 'Owner' : 'Admin'}
│
│ ⚠️ All members except admins are muted!
│ ✅ Bot will automatically unmute after time
└─────────────────`;

    await zk.sendMessage(dest, { text: tag }, { quoted: ms });
    
    setTimeout(async () => {
        if (mutedGroups.has(dest)) {
            mutedGroups.delete(dest);
            let unmuteMsg = `  
┌─────────────────
│ 🔊 *GROUP UNMUTED* 🔊
│
│ *Group :* ${nomGroupe}
│
│ ✅ Group has been automatically unmuted
│ 💬 You can now chat normally
└─────────────────`;
            await zk.sendMessage(dest, { text: unmuteMsg });
        }
    }, timeInMs);
});

zokou({ 
    nomCom: "unmute", 
    categorie: 'Group', 
    reaction: "🔊" 
}, async (dest, zk, commandeOptions) => {

    const { 
        ms, 
        repondre, 
        verifGroupe, 
        nomGroupe, 
        verifAdmin, 
        superUser 
    } = commandeOptions;

    if (!verifGroupe) { 
        repondre(" thís cσmmαnd ís rєsєrvєd fσr grσups"); 
        return; 
    }

    if (!verifAdmin && !superUser) { 
        repondre("cσmmαnd ís rєsєrvєd fσr αdmíns  σnlч"); 
        return; 
    }

    if (!mutedGroups.has(dest)) {
        return repondre("❌ This group is not muted!");
    }

    mutedGroups.delete(dest);

    let tag = `  
┌─────────────────
│ 🔊 *GROUP UNMUTED* 🔊
│
│ *Group :* ${nomGroupe}
│
│ ✅ Group has been unmuted
│ 💬 Members can now chat normally
└─────────────────`;

    await zk.sendMessage(dest, { text: tag }, { quoted: ms });
});
