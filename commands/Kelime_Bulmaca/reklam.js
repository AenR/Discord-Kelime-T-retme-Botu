const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  const davet = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle('Sosyal Medya Hesaplarımız')
  .setThumbnail("https://images-ext-2.discordapp.net/external/Vp9wRHuMvyvbm8cj7ZawAlDEMOoxlj9zQCVF8nGMT8c/https/images-ext-1.discordapp.net/external/i-oh_sHBnc1HeffJswk-0CKkLHJwZYiGdMwUnZtLROg/https/images-ext-2.discordapp.net/external/vkhS2Mn-_bXwJPi2g6yFGc6rxBV9G1sUVu2q-xcPlE4/https/images-ext-2.discordapp.net/external/m9ffKdWJauk_uD909THC3EV6IH8CzCw3MKABEwfJ4l8/https/images-ext-1.discordapp.net/external/RqIz1zWfNGZpqoxjYVsFaWARjTHjws2bJEhfF4FpMuE/https/images-ext-2.discordapp.net/external/pZ3A3c65_LOWwu6FQyrCn3lqad4DeYmISvQ2BhDi6Do/%25252525253Fwidth%25252525253D1025%252525252526height%25252525253D299/https/media.discordapp.net/attachments/777107668954382347/790162151527809024/sosyal_medya_png.png")
   .setDescription(`
**» Bağlantılar** 
**[YouTube]( https://www.youtube.com/c/EnesÖzdemir)** **•** **[Instagram](https://www.instagram.com/enesozdemirim/?hl=tr)** **•** **[Twitter]( https://twitter.com/enesozdemirim)** **•** **[Discord Sunucumuz]( https://discord.gg/vfAFnJ6)** **•** **[Twitch]( https://www.twitch.tv/enesozdemirim)** **•** **[Telegram Kanalımız]( https://t.me/enesozdemirimm)** **•** **[Steam]( https://steamcommunity.com/profiles/76561199097923928)** **•** **[Facebook]( https://www.facebook.com/profile.php?id=100033537300658)** **•** **[Linkedin]( https://www.linkedin.com/in/enes-%C3%B6zdemir-523bb21b6/)** **•** **[TikTok](  https://www.tiktok.com/@enesozdemirim)** **•** **[Yaay]( https://yaay.com.tr/enesozdemirim)**
Bir komut hakkında detaylı yardım için : **.yardım**`)
              
message.channel.send(davet)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'medya',
  description: '',
  usage: ''
};