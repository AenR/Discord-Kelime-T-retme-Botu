const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
const config = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();
const http = require('http');
const express = require('express');
client.commands = new Discord.Collection();
client.config = config;
const commandFolders = fs.readdirSync('./commands');

global.fullarr = {
    "game_bool": [],
    "channels": [],
    "son_kelime": [],
    "son_kelime_yazan": [],
    "puanlar": [],
    "kullanilan_kelimeler_guilds": []
}

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log(file + ' Yüklendi.');
    }
}

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Event bulunamadı.");
        return;
    }
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

 const app = express();
 app.get("/", (request, response) => {
   console.log(Date.now() + " Ping tamamdır.");
   response.sendStatus(200);
 });
 app.listen(process.env.PORT);
 setInterval(() => {
   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
 }, 280000); 

client.on('ready', async () => {
    const Guilds = client.guilds.cache.map(guild => guild.id);
    const settings_path = 'Veriler/kelime_bulmaca/settings.json';
    fs.readFile(settings_path, 'utf-8', function (err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data);
        if (!arrayOfObjects.channels) {
            arrayOfObjects.channels = [];
        } if (!arrayOfObjects.son_kelime) {
            arrayOfObjects.son_kelime = [];
        } if (!arrayOfObjects.son_kelime_yazan) {
            arrayOfObjects.son_kelime_yazan = [];
        } if (!arrayOfObjects.kullanilan_kelimeler_guilds) {
            arrayOfObjects.kullanilan_kelimeler_guilds = [];
        } if (!arrayOfObjects.game_bool) {
            arrayOfObjects.game_bool = [];
        } if (!arrayOfObjects.puanlar) {
            arrayOfObjects.puanlar = [];
        }
        Guilds.forEach(element => {
            let kanal_index = arrayOfObjects.channels.findIndex(find => find.guild_id === element);
            let game_bool_index = arrayOfObjects.game_bool.findIndex(find => find.guild_id === element);
            let son_kelime_index = arrayOfObjects.son_kelime.findIndex(find => find.guild_id === element);
            let son_kelime_yazan_index = arrayOfObjects.son_kelime_yazan.findIndex(find => find.guild_id === element);
            let kullanilan_kelimeler_guilds_index = arrayOfObjects.kullanilan_kelimeler_guilds.findIndex(find => find.guild_id === element);
            let puan_index = arrayOfObjects.puanlar.findIndex(find => find.guild_id === element);
            if (puan_index == -1) {
                arrayOfObjects.puanlar.push({
                    guild_id: element,
                    puanlar: []
                });
            }
            if (game_bool_index == -1) {
                arrayOfObjects.game_bool.push({
                    guild_id: element
                });
            }
            if (kanal_index == -1) {
                arrayOfObjects.channels.push({
                    guild_id: element
                });
            }
            if (son_kelime_yazan_index == -1) {
                arrayOfObjects.son_kelime_yazan.push({
                    guild_id: element
                });
            }
            if (kullanilan_kelimeler_guilds_index == -1) {
                arrayOfObjects.kullanilan_kelimeler_guilds.push({
                    guild_id: element,
                    kullanilan_kelimeler: []
                });
            }
            if (son_kelime_index == -1) {
                arrayOfObjects.son_kelime.push({
                    guild_id: element
                });
            }
        });
        global.fullarr.puanlar = arrayOfObjects.puanlar;
        global.fullarr.game_bool = arrayOfObjects.game_bool;
        global.fullarr.channels = arrayOfObjects.channels;
        global.fullarr.son_kelime_yazan = arrayOfObjects.son_kelime_yazan;
        global.fullarr.kullanilan_kelimeler_guilds = arrayOfObjects.kullanilan_kelimeler_guilds;
        global.fullarr.son_kelime = arrayOfObjects.son_kelime;
        fs.writeFile(settings_path, JSON.stringify(arrayOfObjects, null, 2), 'utf-8', function (err) {
            if (err) throw err;
        });
    });
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${config.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
  
  client.on('message', msg => {
  if (msg.content.toLowerCase() === config.prefix + 'yardım') {
    const embedyardım = new Discord.MessageEmbed()
        .setColor('#ffcc00')
        .setAuthor('AenR#0663', 'https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg', 'https://discord.gg/FbUmuMbvEb')
        .setTitle('Komutlar:')
		    .addField(`!!kelime anlam "kelime"`, 'Yazdığınız kelimenin anlamını öğrenmenizi sağlar.')
        .addField(`!!kelime başlat`, 'Kelime oyununu başlatmayı sağlar.')
        .addField(`!!kelime durdur`, 'Kelime oyununu durdurmayı sağlar.')
        .addField(`!!kelime puan`, 'Kelime oyunundaki puanınızı öğrenmenizi sağlar.')
        .addField(`!!kelime kanal #kanal`, 'Kelime oyununun hangi kanalda çalışacağını seçmenizi sağlar.')
        .setThumbnail('https://cdn.discordapp.com/attachments/802906619234222081/856207093413183508/tan-yellow-pp.jpg');
        msg.channel.send(embedyardım);
  }
});
  
    client.channels.cache.get("856237979168538644").join(); //KEKE
    client.channels.cache.get("856442949453348867").join(); //Kendi sunucusu
    //client.user.setActivity('🔥 AenR Kelime Botu 🔥 !!kelime komutlar', { type: 'LISTENING' });
    //client.user.setActivity(client.guilds.cache.size + " sunucuya hizmet veriyor.", {type: 'LISTENING'});
  
    console.log(`Logged in as ${client.user.tag}! - ${client.guilds.cache.size}`);
});
client.login(process.env.token);
