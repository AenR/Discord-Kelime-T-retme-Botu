const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../config.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  client.user.setStatus("online");
  var oyun = [
    "🔥 AenR Kelime Botu 🔥",
    `${client.guilds.cache.size} 💻 sunucuya hizmet veriyor.`,
    `${client.users.cache.size} 🎩 kullanıcıya hizmet veriyor.`,
    "discord.gg/yr4xpYJvvp 🔗 destek sunucusu linki.",
    "🤖 !!yardım 🤖 !!kelime komutlar 🤖"

  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], "");
  }, 2 * 2500);
};