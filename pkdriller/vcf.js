const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");
const fs = require("fs");

moment.tz.setDefault(conf.TZ);

zokou({ nomCom: "vcf", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms, args, repondre, superUser } = commandeOptions;

  try {
    const start = Date.now();
    
    // Check if command is used in a group
    const groupMetadata = await zk.groupMetadata(dest);
    if (!groupMetadata) {
      return zk.sendMessage(dest, { text: "❌ This command can only be used in groups!" }, { quoted: ms });
    }

    const option = args[0]?.toLowerCase();
    const isFull = option === "full" || option === "all";
    
    await zk.sendMessage(dest, { text: isFull ? "📇 Collecting all group contacts with details..." : "📇 Collecting group contacts, please wait..." });

    // Get all group participants
    const participants = groupMetadata.participants;
    const groupName = groupMetadata.subject;
    const groupDesc = groupMetadata.desc || "No description";
    const totalMembers = participants.length;

    let vcfContent = "";
    let processedCount = 0;
    let errorCount = 0;
    let contactsList = [];

    // Generate VCard for each participant
    for (const participant of participants) {
      try {
        const jid = participant.id;
        const phoneNumber = jid.split('@')[0];
        
        // Try to get contact details if available
        let contactName = "";
        let contactPhoto = "";
        
        try {
          const contact = await zk.getContact(jid);
          contactName = contact.notify || contact.name || contact.verifiedName || phoneNumber;
          
          // Try to get profile picture if FULL option is used
          if (isFull) {
            try {
              const ppUrl = await zk.profilePictureUrl(jid, "image");
              contactPhoto = ppUrl;
            } catch {}
          }
        } catch {
          contactName = phoneNumber;
        }

        contactsList.push({
          name: contactName,
          number: phoneNumber,
          jid: jid,
          admin: participant.admin || "not admin"
        });

        // Create VCard format (v3.0) with more details for FULL option
        let vcard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${contactName}`,
          `TEL;TYPE=CELL:${phoneNumber}`,
          `ORG:NEXUS-AI Group;${groupName}`,
          `NOTE:Added from ${groupName} WhatsApp Group via NEXUS-AI Bot`,
        ];
        
        if (isFull && contactPhoto) {
          vcard.push(`PHOTO;TYPE=JPEG;ENCODING=b:${contactPhoto}`);
        }
        
        if (participant.admin) {
          vcard.push(`ROLE:${participant.admin.toUpperCase()} of ${groupName}`);
        }
        
        vcard.push("END:VCARD", "");
        
        vcfContent += vcard.join("\n");
        processedCount++;
        
      } catch (err) {
        errorCount++;
        console.log(`Failed to process ${participant.id}:`, err);
      }
    }

    const end = Date.now();
    const ping = end - start;
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");

    if (processedCount === 0) {
      return zk.sendMessage(dest, { text: "❌ Failed to generate VCF file!" }, { quoted: ms });
    }

    // Save VCF file
    const fileName = `${groupName.replace(/[^a-z0-9]/gi, '_')}_contacts.vcf`;
    const filePath = `./temp/${fileName}`;
    
    if (!fs.existsSync("./temp")) {
      fs.mkdirSync("./temp", { recursive: true });
    }
    
    fs.writeFileSync(filePath, vcfContent);

    // Count admins
    const admins = participants.filter(p => p.admin === "admin" || p.admin === "superadmin").length;
    
    let infoMsg = `╭─❏ *📇 NEXUS-AI GROUP EXPORT*\n` +
                  `│\n` +
                  `│ 📋 Group: *${groupName}*\n` +
                  `│ 📝 Description: *${groupDesc.substring(0, 50)}${groupDesc.length > 50 ? "..." : ""}*\n` +
                  `│ 👥 Total Members: *${totalMembers}*\n` +
                  `│ ✅ Processed: *${processedCount}*\n` +
                  `│ ❌ Failed: *${errorCount}*\n` +
                  `│ 👑 Admins: *${admins}*\n`;
                  
    if (isFull) {
      infoMsg += `│ 🖼️ Photos: *Included for available contacts*\n`;
    }
    
    infoMsg += `│ 📆 Date: *${date}*\n` +
               `│ 🕒 Time: *${time}*\n` +
               `│ ⏱️ Response: *${ping}ms*\n` +
               `│\n` +
               `│ 💡 *How to import:*\n` +
               `│ 1. Download this VCF file\n` +
               `│ 2. Open Contacts app on your phone\n` +
               `│ 3. Tap "Import from storage" or "Import contacts"\n` +
               `│ 4. Select "${fileName}"\n` +
               `│ 5. All contacts will be saved to your phone\n` +
               `│\n` +
               `│ 🔔 *Note:* Contacts will be saved with group name tag\n` +
               `│\n` +
               `╰───────────────❏`;

    // Send as document
    await zk.sendMessage(dest, {
      document: fs.readFileSync(filePath),
      mimetype: "text/vcard",
      fileName: fileName,
      caption: infoMsg,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363417804135599@newsletter",
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "📇 NEXUS-AI VCF EXPORTER",
          body: `${processedCount} contacts exported from ${groupName}`,
          thumbnailUrl: conf.LOGO,
          sourceUrl: conf.GURL,
          mediaType: 1
        }
      }
    }, { quoted: ms });

    // Also send a quick preview of first 10 contacts if not too many
    if (processedCount <= 30 && !isFull) {
      let previewMsg = `╭─❏ *👥 CONTACT PREVIEW*\n│\n`;
      const previewContacts = contactsList.slice(0, 10);
      previewContacts.forEach((contact, index) => {
        previewMsg += `│ ${index + 1}. *${contact.name}*\n`;
        previewMsg += `│    📞 ${contact.number}\n`;
        if (contact.admin === "admin") previewMsg += `│    👑 Group Admin\n`;
        previewMsg += `│\n`;
      });
      if (processedCount > 10) {
        previewMsg += `│ *And ${processedCount - 10} more...*\n`;
      }
      previewMsg += `╰───────────────❏`;
      
      await zk.sendMessage(dest, { text: previewMsg }, { quoted: ms });
    }

    // Clean up temp file
    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }, 5000);

  } catch (e) {
    console.log("❌ VCF Command Error:", e);
    await zk.sendMessage(dest, { text: `❌ Error: ${e.message || e}` }, { quoted: ms });
  }
});
