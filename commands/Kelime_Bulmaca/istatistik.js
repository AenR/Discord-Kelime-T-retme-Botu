const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");



exports.run = (client, message) => {
  const istatistikozel = new Discord.MessageEmbed()
  .setColor(0x36393F)
.setDescription(`${ client.user.username}`)
.addField(`Bot Sahibi`, `<@535033289346514964>`, )
.addField("Sunucu Sayısı ", `${client.guilds.cache.size.toLocaleString()}`, true)
.addField("Toplam Kullanıcı Sayısı ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
.addField("Ping" , `${client.ws.ping}`, true)
.addField("Discord.js Sürümü ", `${Discord.version}`, true)  
 .addField(`Destek Sunucum`, `[Tıkla]( https://discord.gg/yr4xpYJvvp)`, true)
.addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=856238953296691200&scope=bot&permissions=3664960)`, true)
//.addField(`Websitem`, `[http://enesozdemir.site/]( )`, true)
  .setImage("https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg")
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
  return message.channel.send(istatistikozel);
};
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["statistics", "YEDEK KOMUT2", "i",'istatistik'],
    permLevel: 0
  };
  
  exports.help = {
    name: "istatistik",
    description: "Bot i",
    usage: "istatistik"
  };