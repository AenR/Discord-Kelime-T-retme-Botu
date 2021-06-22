const Eris = require('eris');

function getHighestRole(member, guild) {
member = member.id ? member : guild.members.get(member);
const filteredRoles = guild.roles.filter(r => member.roles.includes(r.id));
return filteredRoles.sort((a, b) => b.position - a.position)[0] || guild.roles.length+1;
};

exports.run = async (client, message, args) => {// can#0002

function embedCreate(content) {
return client.createMessage(message.channel.id, { embed: { description: content, author: { name: client.user.username, icon_url: client.user.avatarURL } } });
};

if(!args[0]) return embedCreate('İsmini değiştirmek istediğin kullanıcıyı etiketle.');
if(!message.member.permissions.has('manageNicknames')) return embedCreate('Yeterli yetkiye sahip değilsin.');
if(!message.mentions[0]) return embedCreate('Bir kullanıcı etiketlemelisin.');
if(!client.guilds.get(message.guildID).members.map(a => a.user.id).includes(message.mentions[0].id)) return embedCreate('Etiketlediğin kişi bu sunucuda değil.');
if(getHighestRole(message.member, client.guilds.get(message.guildID)).position <= getHighestRole(client.guilds.get(message.guildID).members.get(message.mentions[0].id), client.guilds.get(message.guildID)).position) return embedCreate('Etiketlediğin kullanıcının rolü/rolleri senden daha yüksek/seninle aynı olduğu için işlem iptal edildi.');
if(getHighestRole(client.guilds.get(message.guildID).members.get(client.user.id), client.guilds.get(message.guildID)).position <= getHighestRole(client.guilds.get(message.guildID).members.get(message.mentions[0].id), client.guilds.get(message.guildID)).position) return embedCreate('Botun rolü/rolleri etiketlenen kullanıcıdan daha yüksek/aynı olduğu için işlem iptal edildi.');
if(!args[1]) return embedCreate('Bir isim belirtmen lazım ki o ismi etiketlediğin kişinin ismiyle değiştireyim.');
if(args.slice(1).join(' ').length > 31) return embedCreate('Maksimum 31 karakter kullanabilirsin.');
client.guilds.get(message.guildID).members.get(message.mentions[0].id).edit({ nick: args.slice(1).join(' ') });
return embedCreate(`<@!${message.mentions[0].id}> kişisinin ismi **${args.slice(1).join(' ')}** olarak değiştirildi.`);

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'isim-değiştir'
};// codare ♥