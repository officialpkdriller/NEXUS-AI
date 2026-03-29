const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

const BASE_URL = "https://noobs-api.top";
const NEWSLETTER_JID = "120363417804135599@newsletter";
const BOT_NAME = "NEXUS-AI";
const DEVELOPER = "pkdriller";

// === Command: .play (Audio Play - send as voice) ===
zokou({
  nomCom: "play",
  aliases: ["music", "audio", "mziki"],
  reaction: "🎵",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ");

  try {
    if (!query) {
      await zk.sendMessage(dest, {
        text: "🎵 *NEXUS-AI*\n\n_🎧 Enter song name_\n\n📌 _.play nikuone_",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
      return;
    }

    await zk.sendMessage(dest, {
      text: `🔍 *${query}*\n⏳ _Processing..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    const search = await yts(query);
    const video = search.videos[0];
    
    if (!video) {
      return await zk.sendMessage(dest, {
        text: "❌ _No results_\n\n🎵 *NEXUS-AI*",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      text: `🎵 *${video.title}*\n⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n📺 ${video.author.name}\n🔗 ${video.url}\n\n⏳ _Downloading..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    try {
      const apiURL = `${BASE_URL}/dipto/ytDl3?link=${video.videoId}&format=mp3`;
      const response = await axios.get(apiURL, { timeout: 60000 });
      
      let downloadLink = response.data?.downloadLink || response.data?.download || response.data?.url;
      
      if (downloadLink) {
        await zk.sendMessage(dest, {
          audio: { url: downloadLink },
          mimetype: "audio/mp4",
          fileName: `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: NEWSLETTER_JID,
              newsletterName: "NEXUS-AI",
              serverMessageId: 143
            },
            forwardingScore: 999
          }
        }, { quoted: ms });
      }
    } catch (downloadErr) {
      console.log("Download error:", downloadErr.message);
    }

  } catch (error) {
    console.error("Music error:", error);
    
    await zk.sendMessage(dest, {
      text: `❌ _Error_\n\n🎵 *NEXUS-AI*`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });
  }
});

// === Command: .song (Audio as Document) ===
zokou({
  nomCom: "song",
  aliases: ["mp3", "audiofile"],
  reaction: "🎶",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ");

  try {
    if (!query) {
      await zk.sendMessage(dest, {
        text: "🎶 *NEXUS-AI*\n\n_🎧 Enter song name_\n\n📌 _.song nikuone_",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
      return;
    }

    await zk.sendMessage(dest, {
      text: `🔍 *${query}*\n⏳ _Processing..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    const search = await yts(query);
    const video = search.videos[0];
    
    if (!video) {
      return await zk.sendMessage(dest, {
        text: "❌ _No results_\n\n🎶 *NEXUS-AI*",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      text: `🎶 *${video.title}*\n⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n📺 ${video.author.name}\n🔗 ${video.url}\n\n⏳ _Downloading..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    try {
      const apiURL = `${BASE_URL}/dipto/ytDl3?link=${video.videoId}&format=mp3`;
      const response = await axios.get(apiURL, { timeout: 60000 });
      
      let downloadLink = response.data?.downloadLink || response.data?.download || response.data?.url;
      
      if (downloadLink) {
        await zk.sendMessage(dest, {
          document: { url: downloadLink },
          mimetype: "audio/mpeg",
          fileName: `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: NEWSLETTER_JID,
              newsletterName: "NEXUS-AI",
              serverMessageId: 143
            },
            forwardingScore: 999
          }
        }, { quoted: ms });
      }
    } catch (downloadErr) {
      console.log("Download error:", downloadErr.message);
    }

  } catch (error) {
    console.error("Song error:", error);
    
    await zk.sendMessage(dest, {
      text: `❌ _Error_\n\n🎶 *NEXUS-AI*`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });
  }
});

// === Command: .video (YouTube Video MP4) ===
zokou({
  nomCom: "video",
  aliases: ["vid", "mp4"],
  reaction: "🎥",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const query = arg.join(" ");

  try {
    if (!query) {
      await zk.sendMessage(dest, {
        text: "🎥 *NEXUS-AI*\n\n_🎬 Enter video name_\n\n📌 _.video nikuone_",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
      return;
    }

    await zk.sendMessage(dest, {
      text: `🔍 *${query}*\n⏳ _Processing..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    const search = await yts(query);
    const video = search.videos[0];
    
    if (!video) {
      return await zk.sendMessage(dest, {
        text: "❌ _No results_\n\n🎥 *NEXUS-AI*",
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: NEWSLETTER_JID,
            newsletterName: "NEXUS-AI",
            serverMessageId: 143
          },
          forwardingScore: 999
        }
      }, { quoted: ms });
    }

    await zk.sendMessage(dest, {
      text: `🎥 *${video.title}*\n⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n📺 ${video.author.name}\n🔗 ${video.url}\n\n⏳ _Downloading..._`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });

    try {
      const apiURL = `${BASE_URL}/dipto/ytDl3?link=${video.videoId}&format=mp4`;
      const response = await axios.get(apiURL, { timeout: 60000 });
      
      let downloadLink = response.data?.downloadLink || response.data?.download || response.data?.url;
      
      if (downloadLink) {
        await zk.sendMessage(dest, {
          video: { url: downloadLink },
          mimetype: "video/mp4",
          fileName: `${video.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`,
          caption: `🎥 *NEXUS-AI*`,
          contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: NEWSLETTER_JID,
              newsletterName: "NEXUS-AI",
              serverMessageId: 143
            },
            forwardingScore: 999
          }
        }, { quoted: ms });
      }
    } catch (downloadErr) {
      console.log("Video download error:", downloadErr.message);
    }

  } catch (error) {
    console.error("Video error:", error);
    
    await zk.sendMessage(dest, {
      text: `❌ _Error_\n\n🎥 *NEXUS-AI*`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: NEWSLETTER_JID,
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        forwardingScore: 999
      }
    }, { quoted: ms });
  }
});
