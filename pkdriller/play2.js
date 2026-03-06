const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

const AXIOS_DEFAULTS = {
timeout: 60000,
headers:{
'User-Agent':'Mozilla/5.0',
'Accept':'application/json'
}
};

async function tryRequest(getter, attempts = 3) {
let lastError;
for(let attempt=1; attempt<=attempts; attempt++){
try{
return await getter();
}catch(err){
lastError = err;
if(attempt < attempts){
await new Promise(r => setTimeout(r, 1000 * attempt));
}
}
}
throw lastError;
}

// API 1
async function getEliteProTechVideoByUrl(url){
const api = `https://eliteprotech-apis.zone.id/ytdown?url=${encodeURIComponent(url)}&format=mp4`;
const res = await tryRequest(()=>axios.get(api,AXIOS_DEFAULTS));

if(res?.data?.success && res?.data?.downloadURL){
return{
download:res.data.downloadURL,
title:res.data.title
};
}

throw new Error("EliteProTech failed");
}

// API 2
async function getYupraVideoByUrl(url){
const api = `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}`;
const res = await tryRequest(()=>axios.get(api,AXIOS_DEFAULTS));

if(res?.data?.success && res?.data?.data?.download_url){
return{
download:res.data.data.download_url,
title:res.data.data.title,
thumbnail:res.data.data.thumbnail
};
}

throw new Error("Yupra failed");
}

// API 3
async function getOkatsuVideoByUrl(url){
const api = `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp4?url=${encodeURIComponent(url)}`;
const res = await tryRequest(()=>axios.get(api,AXIOS_DEFAULTS));

if(res?.data?.result?.mp4){
return{
download:res.data.result.mp4,
title:res.data.result.title
};
}

throw new Error("Okatsu failed");
}

zokou(
{
nomCom:"videoelite",
aliases:["video","elitevideo"],
categorie:"Search",
reaction:"🎬"
},
async (jid, sock, data)=>{

const { arg, ms } = data;

const repondre = async(text)=>{
await sock.sendMessage(jid,{
text,
contextInfo:{
forwardingScore:999,
isForwarded:true,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363417804135599@newsletter",
newsletterName:"NEXUS-AI",
serverMessageId:143
},
externalAdReply:{
title:"🎬 NEXUS VIDEO DOWNLOADER",
body:"Elite Download System",
thumbnailUrl:"https://files.catbox.moe/vsp16g.jpg",
sourceUrl:"https://github.com/pkdriller0/NEXUS-AI",
mediaType:1,
renderLargerThumbnail:false
}
}
},{quoted:ms})
}

if(!arg[0]) return repondre("❌ Please provide a video name or YouTube link.");

const query = arg.join(" ");

try{

let videoUrl="";
let videoTitle="";
let videoThumbnail="";

if(query.startsWith("http")){
videoUrl=query;
}else{

const search = await yts(query);

if(!search.videos.length)
return repondre("❌ No video found.");

videoUrl = search.videos[0].url;
videoTitle = search.videos[0].title;
videoThumbnail = search.videos[0].thumbnail;

}

try{

if(videoThumbnail){
await sock.sendMessage(jid,{
image:{url:videoThumbnail},
caption:`*${videoTitle || query}*\nDownloading...`
},{quoted:ms});
}

}catch(e){}

const apiMethods=[
{method:()=>getEliteProTechVideoByUrl(videoUrl)},
{method:()=>getYupraVideoByUrl(videoUrl)},
{method:()=>getOkatsuVideoByUrl(videoUrl)}
];

let videoData=null;

for(const api of apiMethods){

try{

videoData = await api.method();

if(videoData?.download) break;

}catch(err){
console.log("API failed:",err.message);
}

}

if(!videoData) throw new Error("All APIs failed");

await sock.sendMessage(jid,{
video:{url:videoData.download},
mimetype:"video/mp4",
fileName:`${(videoData.title || videoTitle || "video")}.mp4`,
caption:`🎬 *${videoData.title || videoTitle || "Video"}*

> Powered by NEXUS-AI`,
contextInfo:{
forwardingScore:999,
isForwarded:true,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363417804135599@newsletter",
newsletterName:"NEXUS-AI",
serverMessageId:143
}
}
},{quoted:ms});

}catch(err){

console.log(err);

repondre("❌ Failed to download video.");

}

}
);
