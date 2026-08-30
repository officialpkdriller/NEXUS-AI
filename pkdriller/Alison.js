Absolutely. I’ll keep the **Zokou structure and functionality**, but rebrand it completely for **NEXUS-AI** and give the messages a more distinctive futuristic style. I’ve also removed the old **Rahmany** branding.

```javascript
const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "add",
  categorie: "Group",
  reaction: "🧩",
  desc: "Add a WhatsApp user to the group using their phone number",
  fromMe: true
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    arg,
    verifGroupe,
    verifAdmin,
    nomGroupe
  } = commandeOptions;

  // ─────────────────────────────────────────────
  // NEXUS-AI • GROUP ADD SYSTEM
  // ─────────────────────────────────────────────

  // Group check
  if (!verifGroupe) {
    return repondre(
      "╭━━〔 ⚡ NEXUS-AI 〕━━╮\n" +
      "┃\n" +
      "┃ ❌ *GROUP ONLY*\n" +
      "┃\n" +
      "┃ This command can only be\n" +
      "┃ executed inside a group.\n" +
      "┃\n" +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }

  // Admin check
  if (!verifAdmin) {
    return repondre(
      "╭━━〔 🔐 NEXUS-AI 〕━━╮\n" +
      "┃\n" +
      "┃ 🚫 *ACCESS DENIED*\n" +
      "┃\n" +
      "┃ Only group administrators\n" +
      "┃ can use the add command.\n" +
      "┃\n" +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }

  // Number check
  if (!arg[0]) {
    return repondre(
      "╭━━〔 🧩 NEXUS ADD 〕━━╮\n" +
      "┃\n" +
      "┃ ⚠️ *NUMBER REQUIRED*\n" +
      "┃\n" +
      "┃ Provide the WhatsApp number\n" +
      "┃ you want to add.\n" +
      "┃\n" +
      "┃ ✦ Example:\n" +
      "┃   `.add 254712345678`\n" +
      "┃\n" +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }

  // Clean number
  let phoneNumber = arg[0].replace(/[^0-9]/g, "");

  // Remove leading zero
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.substring(1);
  }

  // Default Tanzania country code
  if (!phoneNumber.startsWith("255") && phoneNumber.length === 9) {
    phoneNumber = "255" + phoneNumber;
  }

  // Create WhatsApp JID
  const userJid = phoneNumber + "@s.whatsapp.net";

  // Processing message
  await repondre(
    "╭━━〔 ⚡ NEXUS-AI 〕━━╮\n" +
    "┃\n" +
    "┃ 🔄 *PROCESSING REQUEST*\n" +
    "┃\n" +
    `┃ 📱 Number: *${phoneNumber}*\n` +
    "┃\n" +
    "┃ Establishing group access...\n" +
    "┃ Please wait.\n" +
    "┃\n" +
    "╰━━━━━━━━━━━━━━━━━━╯"
  );

  try {
    // Add participant
    const response = await zk.groupParticipantsUpdate(
      dest,
      [userJid],
      "add"
    );

    console.log("NEXUS-AI Add Response:", response);

    if (response && response[0]) {
      const status = response[0].status;

      // ─────────────────────────────────────────
      // SUCCESS
      // ─────────────────────────────────────────

      if (status === "200") {
        const successMsg =
          "╭━━〔 ✅ NEXUS-AI 〕━━╮\n" +
          "┃\n" +
          "┃ *MEMBER ADDED*\n" +
          "┃\n" +
          `┃ 👤 User: @${phoneNumber}\n` +
          `┃ 📱 Number: ${phoneNumber}\n` +
          `┃ 👥 Group: ${nomGroupe || "Unknown"}\n` +
          "┃\n" +
          "┃ ✦ Status: *Connected*\n" +
          "┃ ✦ Access: *Granted*\n" +
          "┃\n" +
          "╰━━━━━━━━━━━━━━━━━━╯\n" +
          "       ⚡ *NEXUS-AI*";

        await zk.sendMessage(dest, {
          text: successMsg,
          mentions: [userJid]
        });

      // ─────────────────────────────────────────
      // PRIVACY SETTINGS
      // ─────────────────────────────────────────

      } else if (status === "408") {
        const inviteMsg =
          "╭━━〔 ⚠️ NEXUS-AI 〕━━╮\n" +
          "┃\n" +
          "┃ *DIRECT ADD BLOCKED*\n" +
          "┃\n" +
          `┃ 👤 User: @${phoneNumber}\n` +
          "┃\n" +
          "┃ WhatsApp privacy settings\n" +
          "┃ prevent this user from being\n" +
          "┃ added directly.\n" +
          "┃\n" +
          "┃ 🔗 An invite link will be\n" +
          "┃ generated below.\n" +
          "┃\n" +
          "╰━━━━━━━━━━━━━━━━━━╯";

        await repondre(inviteMsg);

        try {
          const inviteCode = await zk.groupInviteCode(dest);
          const inviteLink =
            `https://chat.whatsapp.com/${inviteCode}`;

          await zk.sendMessage(dest, {
            text:
              "╭━━〔 🔗 GROUP ACCESS 〕━━╮\n" +
              "┃\n" +
              "┃ *INVITE LINK GENERATED*\n" +
              "┃\n" +
              `┃ ${inviteLink}\n` +
              "┃\n" +
              "┃ Send this link to the user\n" +
              "┃ to join the group.\n" +
              "┃\n" +
              "╰━━━━━━━━━━━━━━━━━━╯\n" +
              "       ⚡ *NEXUS-AI*"
          });

        } catch (inviteError) {
          console.log(
            "NEXUS-AI Invite Error:",
            inviteError
          );
        }

      // ─────────────────────────────────────────
      // ALREADY IN GROUP
      // ─────────────────────────────────────────

      } else if (status === "409") {
        await repondre(
          "╭━━〔 ℹ️ NEXUS-AI 〕━━╮\n" +
          "┃\n" +
          "┃ *USER ALREADY EXISTS*\n" +
          "┃\n" +
          `┃ 👤 @${phoneNumber}\n` +
          "┃ is already a member of\n" +
          "┃ this group.\n" +
          "┃\n" +
          "╰━━━━━━━━━━━━━━━━━━╯"
        );

      // ─────────────────────────────────────────
      // BOT NOT ADMIN
      // ─────────────────────────────────────────

      } else if (status === "403") {
        await repondre(
          "╭━━〔 🚫 NEXUS-AI 〕━━╮\n" +
          "┃\n" +
          "┃ *ACTION BLOCKED*\n" +
          "┃\n" +
          "┃ NEXUS-AI does not have\n" +
          "┃ sufficient group privileges.\n" +
          "┃\n" +
          "┃ Make sure the bot is a\n" +
          "┃ group administrator.\n" +
          "┃\n" +
          "╰━━━━━━━━━━━━━━━━━━╯"
        );

      // ─────────────────────────────────────────
      // OTHER STATUS
      // ─────────────────────────────────────────

      } else {
        await repondre(
          "╭━━〔 ⚠️ NEXUS-AI 〕━━╮\n" +
          "┃\n" +
          "┃ *ADD REQUEST FAILED*\n" +
          "┃\n" +
          `┃ Status: *${status}*\n` +
          "┃\n" +
          "┃ The user could not be added.\n" +
          "┃ Try again or add them\n" +
          "┃ manually.\n" +
          "┃\n" +
          "╰━━━━━━━━━━━━━━━━━━╯"
        );
      }

    } else {
      await repondre(
        "╭━━〔 ❌ NEXUS-AI 〕━━╮\n" +
        "┃\n" +
        "┃ *UNKNOWN RESPONSE*\n" +
        "┃\n" +
        "┃ WhatsApp returned no valid\n" +
        "┃ response for the request.\n" +
        "┃\n" +
        "╰━━━━━━━━━━━━━━━━━━╯"
      );
    }

  } catch (error) {
    console.error("NEXUS-AI Add Error:", error);

    const errorMessage = error?.message || "";

    // Authorization error
    if (errorMessage.includes("not-authorized")) {
      await repondre(
        "╭━━〔 🔐 NEXUS-AI 〕━━╮\n" +
        "┃\n" +
        "┃ *AUTHORIZATION ERROR*\n" +
        "┃\n" +
        "┃ NEXUS-AI is not authorized\n" +
        "┃ to add group participants.\n" +
        "┃\n" +
        "┃ ⚡ Promote the bot to\n" +
        "┃ group administrator first.\n" +
        "┃\n" +
        "╰━━━━━━━━━━━━━━━━━━╯"
      );

    // Participant error
    } else if (errorMessage.includes("participant")) {
      await repondre(
        "╭━━〔 ❌ NEXUS-AI 〕━━╮\n" +
        "┃\n" +
        "┃ *INVALID USER*\n" +
        "┃\n" +
        "┃ The phone number may be\n" +
        "┃ invalid or the account may\n" +
        "┃ not be available on WhatsApp.\n" +
        "┃\n" +
        "╰━━━━━━━━━━━━━━━━━━╯"
      );

    // General error
    } else {
      await repondre(
        "╭━━〔 💠 NEXUS-AI 〕━━╮\n" +
        "┃\n" +
        "┃ *SYSTEM ERROR*\n" +
        "┃\n" +
        `┃ ${errorMessage}\n` +
        "┃\n" +
        "┃ Please try again later.\n" +
        "┃\n" +
        "╰━━━━━━━━━━━━━━━━━━╯"
      );
    }
  }
});
```

This keeps the original `.add` behavior, but the output now has a **NEXUS-AI futuristic/system-terminal style**, with no Rahmany branding.
