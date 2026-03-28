zokou({ nomCom: "tagall", categorie: 'Group', reaction: "🔔" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) { 
    repondre("❌ This command is reserved for groups"); 
    return; 
  }

  // Check if user is admin or superuser (optional - remove if you want all members to use it)
  if (!verifAdmin && !superUser) { 
    repondre("❌ This command is reserved for group admins"); 
    return; 
  }

  let mess = arg && arg !== ' ' ? arg.join(' ') : '📢 Attention everyone!';

  // Get all group participants (not just admins)
  let allMembers = infosGroupe.participants;

  let tag = `  
╭━━━━━━━━━━━━━━━╮
┃ 📢 *GROUP ANNOUNCEMENT* 
┃
┃ *Group :* ${nomGroupe}
┃ *From :* ${nomAuteurMessage}
┃ *Message :* ${mess}
┃
┃ *Total Members :* ${allMembers.length}
╰━━━━━━━━━━━━━━━╯

`;

  let emojis = ['👥', '🔔', '📢', '⚡', '💬'];
  let randomEmoji = Math.floor(Math.random() * emojis.length);

  for (const membre of allMembers) {
    tag += `${emojis[randomEmoji]} @${membre.id.split("@")[0]}\n`;
  }

  // Add a footer
  tag += `\n━━━━━━━━━━━━━━━\n⚠️ *Important announcement!* ⚠️`;

  await zk.sendMessage(dest, { 
    text: tag, 
    mentions: allMembers.map(i => i.id) 
  }, { quoted: ms });

});
