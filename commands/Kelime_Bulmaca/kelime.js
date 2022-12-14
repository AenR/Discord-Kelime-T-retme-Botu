const Discord = require('discord.js');

const client = new Discord.Client()

const fs = require('fs');
const settings_path = 'Veriler/kelime_bulmaca/settings.json';
const request = require('request');

const moment = require("moment");
const os = require("os");
require("moment-duration-format");

module.exports = {
  
    name: 'kelime',
    description: 'Kelime oyunu.',
    execute(message, args) {
        if (!args[0]) return;
        var settings_channels = global.fullarr.channels;
        var settings_game_bool = global.fullarr.game_bool;
        let kanal_index = settings_channels.findIndex(find => find.guild_id === message.guild.id);
        let game_bool_index = settings_game_bool.findIndex(find => find.guild_id === message.guild.id);
        let game_bool_value = settings_game_bool[game_bool_index].game_bool;
        if (!settings_channels[kanal_index].channel_id) {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply('Bu komutu kullanamazsınız.').then(msg => msg.delete({ timeout: 5000 }));
                message.delete({ timeout: 5000 });
                return;
            }
            let mention_kanal = message.mentions.channels.first();
            if (mention_kanal) {
                settings_channels[kanal_index].channel_id = mention_kanal.id;
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                    .setDescription('Kelime kanalı ayarlandı.')
                    .addField('Kelime Kanalı', mention_kanal)
                    .setColor("#FFCC00");
                message.channel.send(embed);
                fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                    if (err) throw err;
                });
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                .setDescription('Kelime oyunu fonksiyonları için bir kanal ayarlanmalı.\nAyarlamak için **!!kelime kanal #kanal**')
                .setColor("#FFCC00");
            message.channel.send(embed);
            return;
        }
        switch (args[0]) {
            case 'kanal':
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    message.reply('Bu komutu kullanamazsınız.').then(msg => msg.delete({ timeout: 5000 }));
                    message.delete({ timeout: 5000 });
                    return;
                }
                if (settings_channels[kanal_index].channel_id && !args[1]) {
                    let available_channel = message.guild.channels.cache.get(settings_channels[kanal_index].channel_id);
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                        .addField('Ayarlı Kelime Kanalı', available_channel)
                        .setFooter('Değiştirmek için !!kelime kanal #kanal')
                        .setColor("#FFCC00");
                    message.channel.send(embed);
                    return;
                }
                if (settings_channels[kanal_index].channel_id && args[1]) {
                    let mention_kanal = message.mentions.channels.first();
                    if (!mention_kanal) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                            .setDescription('Kullanım: !!kelime kanal #kanal')
                            .setColor("#FFCC00");
                        message.channel.send(embed);
                        return;
                    }
                    settings_channels[kanal_index].channel_id = mention_kanal.id;
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                        .setDescription('Kelime kanalı güncellendi.')
                        .addField('Yeni Kelime Kanalı', mention_kanal)
                        .setColor("#FFCC00");
                    message.channel.send(embed);
                    fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                        if (err) throw err;
                    });
                    return;
                }
                break;
            case 'başlat':
                if (settings_channels[kanal_index].channel_id && settings_channels[kanal_index].channel_id != message.channel.id) {
                    return;
                }
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    message.reply('Bu komutu kullanamazsınız.').then(msg => msg.delete({ timeout: 5000 }));
                    message.delete({ timeout: 5000 });
                    return;
                }
                if (game_bool_index && game_bool_value == 'true') {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                        .setDescription('Kelime oyunu zaten aktif.')
                        .setColor("#FFCC00");
                    message.channel.send(embed);
                    return;
                }
                settings_game_bool[game_bool_index].game_bool = 'true';
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                    .setDescription('Kelime oyunu aktif hale getirildi.')
                    .setColor("#FFCC00");
                message.channel.send(embed);
                fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                    if (err) throw err;
                });
                break;
            case 'durdur':
                if (settings_channels[kanal_index].channel_id && settings_channels[kanal_index].channel_id != message.channel.id) {
                    return;
                }
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    message.reply('Bu komutu kullanamazsınız.').then(msg => msg.delete({ timeout: 5000 }));
                    message.delete({ timeout: 5000 });
                    return;
                }
                if (game_bool_index && game_bool_value == 'false') {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                        .setDescription('Kelime oyunu zaten deaktif.')
                        .setColor("#FFCC00");
                    message.channel.send(embed);
                    return;
                }
                settings_game_bool[game_bool_index].game_bool = 'false';
                const embeds = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                    .setDescription('Kelime oyunu deaktif hale getirildi.')
                    .setColor("#FFCC00");
                message.channel.send(embeds);
                fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                    if (err) throw err;
                });
                break;
            case 'sıfırla':
                if (settings_channels[kanal_index].channel_id && settings_channels[kanal_index].channel_id != message.channel.id) {
                    return;
                }
                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    message.reply('Bu komutu kullanamazsınız.').then(msg => msg.delete({ timeout: 5000 }));
                    message.delete({ timeout: 5000 });
                    return;
                }
                settings_game_bool[game_bool_index].game_bool = 'false';
                fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                    if (err) throw err;
                    var settings_son_kelime_yazan = global.fullarr.son_kelime_yazan;
                    var settings_son_kelime = global.fullarr.son_kelime;
                    var settings_kullanilan_kelimeler_guilds = global.fullarr.kullanilan_kelimeler_guilds;
                    let son_kelime_index = settings_son_kelime.findIndex(find => find.guild_id === message.guild.id);
                    let son_kelime_yazan_index = settings_son_kelime_yazan.findIndex(find => find.guild_id === message.guild.id);
                    let kullanilan_kelimeler_guilds_index = settings_kullanilan_kelimeler_guilds.findIndex(find => find.guild_id === message.guild.id);
                    let rastgele_kelimeler = ["selam", "merhaba", "soğan", "çay", "kaset", "kusmuk", "saat", "mektep", "asparagas", "rastgele", "çay", "vişne", "kestane", "kazak", "tarak", "yarak", "yara", "para", "kesici", "yan"];
                    let sansli_isim = rastgele_kelimeler[Math.floor(Math.random() * (rastgele_kelimeler.length - 1))];
                    let sonharf = sansli_isim.length;
                    sonharf = sansli_isim.charAt(sonharf - 1);
                    delete settings_son_kelime_yazan[son_kelime_yazan_index].son_kelime_yazan;
                    settings_son_kelime[son_kelime_index].son_kelime = sansli_isim;
                    settings_son_kelime[son_kelime_index].son_harf = sonharf;
                    settings_kullanilan_kelimeler_guilds[kullanilan_kelimeler_guilds_index].kullanilan_kelimeler = [sansli_isim];
                    settings_game_bool[game_bool_index].game_bool = 'true';
                    fs.writeFile(settings_path, JSON.stringify(global.fullarr, null, 2), 'utf-8', function (err) {
                        if (err) throw err;
                        const embed = new Discord.MessageEmbed()
                            .setTitle('Yeni Kelime Oyunu')
                            .setDescription(`Oyun Sıfırlandı ve yeni oyun başlatıldı herkese iyi eğlenceler\nBaşlangıç kelimesi: **${sansli_isim}**.`)
                            .setColor("#FFCC00");
                        message.channel.send(embed);
                    });
                });
                break;
            case 'anlam':
                var kelime = args.slice(1).join(' ');
                let link = encodeURI("https://sozluk.gov.tr/gts?ara=" + kelime);
                request.post(
                    link,
                    {
                        json: { key: 'value', },
                    },
                    (error, res, body) => {
                        if (error) {
                            console.error(error);
                            const embed = new Discord.MessageEmbed()
                                .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                                .setDescription(`Bir sorun oluştu. Hata Kodu: ${error}`)
                                .setColor("#FFCC00");
                            message.channel.send(embed);
                            return;
                        }
                        if (body.error) {
                            const embeds = new Discord.MessageEmbed()
                                .setTitle('Nedir ?')
                                .setDescription(`**${kelime}**, bu kelime **Türk Dil Kurumunda** bulunamadı.`)
                                .setColor("#FFCC00");
                            message.channel.send(embeds).then(del => del.delete({ timeout: 2000 }, message.delete({ timeout: 2000 })));
                            return;
                        }
                        const embedss = new Discord.MessageEmbed()
                            .setTitle(`(${kelime}) Nedir ?`)
                            .setDescription(`**Kelime anlamı:** ` + body[0].anlamlarListe[0].anlam)
                            .setColor("#FFCC00");
                        message.channel.send(embedss).then(del => del.delete({ timeout: 15000 }, message.delete({ timeout: 15000 })));
                    });
                break;
            case 'puan':
                var settings_puanlar_guilds = global.fullarr.puanlar;
                let puanlar_guilds_index = settings_puanlar_guilds.findIndex(find => find.guild_id === message.guild.id);
                let puanlar_client_index = settings_puanlar_guilds[puanlar_guilds_index].puanlar.findIndex(find => find.client_id === message.author.id);
                let client_puan;
                if (puanlar_client_index != -1) {
                    client_puan = settings_puanlar_guilds[puanlar_guilds_index].puanlar[puanlar_client_index].puan;
                } else {
                    client_puan = 0;
                }
                const embedd = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                    .setDescription(`Kelime oyundaki toplam puanın: **${client_puan}**`)
                    .setColor("#FFCC00");
                message.channel.send(embedd).then(del => del.delete({ timeout: 15000 }, message.delete({ timeout: 15000 })));
                break;
            default:
                const embedsss = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL(), "https://discord.gg/yr4xpYJvvp")
                    .setDescription('Bilinmeyen komut.')
                    .setColor("#FFCC00");
                message.channel.send(embedsss).then(del => del.delete({ timeout: 7000 }, message.delete({ timeout: 7000 })));
                break;
          case 'komutlar':
            const embedkomutlar = new Discord.MessageEmbed()
        .setColor('#ffcc00')
        .setAuthor('AenR#0663', 'https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg', 'https://discord.gg/yr4xpYJvvp')
        .setTitle('Komutlar:')
        .addField(`!!yardım`, 'Bot hakkında bilgi almanızı sağlar.')
		    .addField(`!!kelime anlam "kelime"`, 'Yazdığınız kelimenin anlamını öğrenmenizi sağlar.')
        .addField(`!!kelime başlat`, 'Kelime oyununu başlatmayı sağlar.')
        .addField(`!!kelime durdur`, 'Kelime oyununu durdurmayı sağlar.')
        .addField(`!!kelime puan`, 'Kelime oyunundaki puanınızı öğrenmenizi sağlar.')
        .addField(`!!kelime kanal #kanal`, 'Kelime oyununun hangi kanalda çalışacağını seçmenizi sağlar.')
        .addField(`!!kelime istatistik`, 'Kelime botunun istatistiklerine erişmenizi sağlar.')
        .addField(`!!kelime kullanım`, 'Kelime botunun nasıl kullanıldığını öğrenmenizi sağlar.')
        .setThumbnail('https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg');
        message.channel.send(embedkomutlar);
            break;
          case 'istatistik':
            const embedistatistik = new Discord.MessageEmbed()
              .setColor("#FFCC00")
              .setAuthor('AenR#0663', 'https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg', 'https://discord.gg/yr4xpYJvvp')
              .setTitle("İstatisikler:")
              .addField("Sunucu Sayısı ", `${client.guilds.cache.size.toLocaleString()}`, true)
              .addField("Toplam Kullanıcı Sayısı ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
              .setThumbnail('https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg')
        message.channel.send(embedistatistik);
            break;
          case 'kullanım':
            const embedkullanim = new Discord.MessageEmbed()
              .setColor("#FFCC00")
              .setAuthor('AenR#0663', 'https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg', 'https://discord.gg/yr4xpYJvvp')
              .setTitle("Botun Kullanımı:")
              .setThumbnail('https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg')
              .addField(`1-)`, 'Öncelikle "!!kelime kanal #kanal" ile kanal seçiyoruz.')
              .addField(`2-)`, 'Daha sonra "!!kelime başlat" diyerek oyunu başlatıyoruz.')
              .addField(`3-)`, 'Ardından kelimeleri yazmaya başlayabilirsiniz.')
              .addField(`4-)`, 'Oyunu sıfırlamak isterseniz "!!kelime sıfırla" yazarak oyunu sıfırlayabilirsiniz.')
              .addField(`5-)`, 'Puanınızı görmek için "!!kelime puan" yazabilirsiniz.')
              
        message.channel.send(embedkullanim);
            break;
        }
        return;
    }
};