const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "play",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {

const { ms, repondre, arg } = commandeOptions;

if (!arg[0]) return repondre("Give me song name");

try {

let query = arg.join(" ");

let res = await axios.get(`https://api.ootaizumi.web.id/downloader/spotifyplay?query=${encodeURIComponent(query)}`);

let data = res.data.result;

await zk.sendMessage(dest,{
audio:{ url: data.download },
mimetype:"audio/mpeg",
ptt:false
},{ quoted: ms });

} catch(e) {
repondre("Download failed");
}

});
