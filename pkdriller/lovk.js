const { zokou } = require("../framework/zokou")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot")
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

// Store locked groups
let lockedGroups = new Map();

zokou({ 
    nomCom: "lock", 
    categorie: 'Group', 
    reaction: "🔒" 
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

    let reason = arg && arg.length > 0 ? arg.join(' ') : 'No reason provided';

    lockedGroups.set(dest, {
        locked: true,
        reason: reason,
        lockedBy: superUser ? 'Owner' : 'Admin',
        lockedAt: new Date()
    });

    let tag = `  
┌─────────────────
│ 🔒 *GROUP LOCKED* 🔒
│
│ *Group :* ${nomGroupe}
│ *Reason :* ${reason}
│ *Locked by :* ${superUser ? 'Owner' : 'Admin'}
│ *Time :* ${new Date().toLocaleString()}
│
│ ⚠️ Only admins can send messages now!
│ 💬 Use .unlock to unlock the group
└─────────────────`;

    await zk.sendMessage(dest, { text: tag }, { quoted: ms });
});

zokou({ 
    nomCom: "unlock", 
    categorie: 'Group', 
    reaction: "🔓" 
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

    if (!lockedGroups.has(dest)) {
        return repondre("❌ This group is not locked!");
    }

    let lockInfo = lockedGroups.get(dest);
    lockedGroups.delete(dest);

    let tag = `  
┌─────────────────
│ 🔓 *GROUP UNLOCKED* 🔓
│
│ *Group :* ${nomGroupe}
│ *Unlocked by :* ${superUser ? 'Owner' : 'Admin'}
│
│ *Previous Lock Info :*
│   🔒 Locked by : ${lockInfo.lockedBy}
│   📅 Locked at : ${lockInfo.lockedAt.toLocaleString()}
│   📝 Reason : ${lockInfo.reason}
│
│ ✅ All members can now send messages
└─────────────────`;

    await zk.sendMessage(dest, { text: tag }, { quoted: ms });
});
