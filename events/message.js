const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const settings_path = 'Veriler/kelime_bulmaca/settings.json';

module.exports = (client, message) => {
  if(message.channel.type === 'dm')return;
	if(message.author.bot)return;
	if (message.content.indexOf(client.config.prefix) == 0){
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        cmd.execute(message,args);
    }
    else{
        if(message.content.indexOf('.') == 0)return;
        let kanal_index = global.fullarr.channels.findIndex(find => find.guild_id === message.guild.id);
        let game_bool_index = global.fullarr.game_bool.findIndex(find => find.guild_id === message.guild.id);
        if(global.fullarr.game_bool[game_bool_index].game_bool == 'true' && global.fullarr.channels[kanal_index].channel_id == message.channel.id){
            var puanlar_guilds_index = global.fullarr.puanlar.findIndex(find => find.guild_id === message.guild.id);
            var puanlar_client_index = global.fullarr.puanlar[puanlar_guilds_index].puanlar.findIndex(find => find.client_id === message.author.id);
            let son_kelime_index = global.fullarr.son_kelime.findIndex(find => find.guild_id === message.guild.id);
            let son_kelime_yazan_index = global.fullarr.son_kelime_yazan.findIndex(find => find.guild_id === message.guild.id);
            let kullanilan_kelimeler_guilds_index = global.fullarr.kullanilan_kelimeler_guilds.findIndex(find => find.guild_id === message.guild.id);            
            let sonharf = message.content.length;
            let kelime = message.content.turkishtoEnglish();
            kelime = kelime.toLowerCase();
            sonharf = kelime.charAt(sonharf - 1);
            var reg = /\s[^a-zA-Z]/g;
            if(global.fullarr.son_kelime_yazan[son_kelime_yazan_index].son_kelime_yazan == message.author.id){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`${message.author.username}, ??st ??ste yazamazs??n??z.`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;
            }
            if(kelime.match(reg)){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`**${kelime}**, ge??ersiz karakter i??eriyor. L??tfen sadece t??rk??e karakter ve harf kullan??n.`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;                
            }
            if(global.fullarr.son_kelime[son_kelime_index].son_harf && global.fullarr.son_kelime[son_kelime_index].son_harf !== kelime[0]){
                let stngssonharf = global.fullarr.son_kelime[son_kelime_index].son_harf;
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`**${kelime}**, bu kelime **${stngssonharf}** ile ba??lam??yor.`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;
            }
            if(global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.includes(kelime)){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`**${kelime}**, bu kelime daha ??nce kullan??lm????.`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;
            }
            if(kelime.length <= 1){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`Yazm???? oldu??un **${kelime}** kelimesi ??ok k??sa.`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;                
            }
            if(sonharf == '??' && global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.length < 1500){
                let kalan_kelime = 1500 - global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.length;
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                    .setDescription(`Oyun bitirici kelimeleri yazmak i??in biraz daha oynaman??z gerekmekte.\nKalan kelime say??s?? **${kalan_kelime}**`)
                    .setColor("#FFCC00");
                message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                return;
            }
            let link = encodeURI("https://sozluk.gov.tr/gts?ara=" + kelime); 
            request.post(
                link,
                {
                    json: {key: 'value',},
                },
                (error, res, body) => {
                    if (error) {
                        console.error(error);
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                            .setDescription(`Bir sorun olu??tu l??tfen y??neticiyle ileti??ime ge??in. ${error}`)
                            .setDescription(`L??tfen ileti??ime ge??meden ??nce ayn?? kelimeyi tekrar yazmay?? deneyin.`)
                            .setColor("#FFCC00");
                        message.channel.send(embed);
                        return;
                    }
                    if(body.error){
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                            .setDescription(`**${kelime}**, bu kelime **T??rk Dil Kurumunda** bulunamad??.`)
                            .setColor("#FFCC00");
                            message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                        return;
                    }
                    if(global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.includes(kelime)){
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                            .setDescription(`**${kelime}**, bu kelime daha ??nce kullan??lm????.`)
                            .setColor("#FFCC00");
                        message.channel.send(embed).then(del => del.delete({timeout:2000} , message.delete({timeout:2000})));
                        return;
                    }
		            global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.push(kelime);
                    message.react('????');
                    if(puanlar_client_index == -1){
                        global.fullarr.puanlar[puanlar_guilds_index].puanlar.push({
                            client_id : message.author.id,
                            puan : 3
                        });
                    }else{
                        global.fullarr.puanlar[puanlar_guilds_index].puanlar[puanlar_client_index].puan += 3;
                    }
                    global.fullarr.son_kelime_yazan[son_kelime_yazan_index].son_kelime_yazan = message.author.id;
                    global.fullarr.son_kelime[son_kelime_index].son_kelime = kelime;
                    global.fullarr.son_kelime[son_kelime_index].son_harf = sonharf;
                    if(sonharf == '??' && global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler.length >= 1500){
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL(),"https://discord.gg/yr4xpYJvvp")
                            .setDescription(`${message.author},  Kilit kelimeyi yazarak oyunu bitirdi tebrikler birazdan yeni oyun ba??layacak <3.`)
                            .setColor("#FFCC00");
                        message.channel.send(embed);
                        global.fullarr.puanlar[puanlar_guilds_index].puanlar[puanlar_client_index].puan += 50;
                        global.fullarr.game_bool[game_bool_index].game_bool = 'false';
                        fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function(err) {
                            if (err) throw err;
                            setTimeout(() => {
                                let rastgele_kelimeler = global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler;
                                let sansli_isim = rastgele_kelimeler[Math.floor(Math.random() * (rastgele_kelimeler.length - 1))];
                                let sonharf = sansli_isim.length;
                                sonharf = sansli_isim.charAt(sonharf - 1);
                                delete global.fullarr.son_kelime_yazan[son_kelime_yazan_index].son_kelime_yazan;
                                global.fullarr.son_kelime[son_kelime_index].son_kelime = sansli_isim;
                                global.fullarr.son_kelime[son_kelime_index].son_harf = sonharf;
                                global.fullarr.kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler = [sansli_isim];
                                global.fullarr.game_bool[game_bool_index].game_bool = 'true';
                                fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function(err) {
                                    if (err) throw err;
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle('Yeni Kelime Oyunu')
                                        .setDescription(`Yeni oyun ba??lad?? herkese iyi e??lenceler\nBa??lang???? kelimesi: **${sansli_isim}**.`)
                                        .setColor("#FFCC00");
                                    message.channel.send(embed);
                                });
                            }, 5000);
                        });
                        return;
                    }
                    fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function(err) {
                        if (err) throw err;
                    });
                }
            );
        }
    }
};
String.prototype.turkishtoEnglish = function () {
    return this.replace('??','??')
        .replace('??','??')
        .replace('??','??')
        .replace('I','??')
        .replace('??','i')
        .replace('??','??')
        .replace('??','??');
};
