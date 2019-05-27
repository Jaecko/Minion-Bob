/* eslint-disable */
const Command = require("../../modules/Command.js");

const num_key_min = 1;
const num_key_max = 4;
const num_char_min = 4;
const num_char_max = 40;

const tab_char = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

class Keygen extends Command {
  constructor(client) {
    super(client, {
      name: "keygen",
      description:
        "Générer X clés de X caractères. Par défaut, génère 1 clé de 16 caractères.",
      usage: `keygen <${num_key_min} - ${num_key_max}> <${num_char_min} - ${num_char_max}>`,
      aliases: ["kg"]
    });
  }

  async run(message, args) {
    try {
      const tab_key = [];

      let num_key;
      if (!args[0]) args[0] = 1;
      if (!args[1]) args[1] = 16;
      if (!Number(args[0]) || !Number(args[1]))
        return message.reply("Vous devez entrer des nombres !");
      if (args[0] < num_key_min || args[0] > num_key_max)
        return message.reply(
          `Vous pouvez générer entre ${num_key_min} et ${num_key_max} clés à la fois.`
        );

      !args[0] ? (num_key = 1) : (num_key = args[0]);
      let num_char;
      !args[1] ? (num_char = 16) : (num_char = args[1]);
      if (args[1] < num_char_min || args[1] > num_char_max)
        return message.reply(
          `Vous pouvez générer un clé entre ${num_char_min} et ${num_char_max} caractères.`
        );

      for (let i = 0; i < num_key; i++) {
        let key = "";
        for (let i = 0; i < num_char; i++) {
          const alea = Math.floor(Math.random() * Math.floor(100));
          const rand_tab_char = Math.floor(
            Math.random() * Math.floor(tab_char.length)
          );

          alea % 3
            ? (key = key + tab_char[rand_tab_char])
            : (key = key + tab_char[rand_tab_char].toUpperCase());
        }
        tab_key.push(key);
      }

      message.delete(100);
      const channel = this.client.guilds
        .find(g => g.id == message.guild.id)
        .channels.find(c => c.name == "bob-keygen" && c.type == "text");
      tab_key.length == 1
        ? await channel.send(
            `${message.author}, votre clé de ${num_char} caractères :`
          )
        : await channel.send(
            `${message.author}, vos ${num_key} clés de ${num_char} caractères :`
          );
      tab_key.map(key => {
        // message.channel.send('```' + key + '```');
        channel.send(key, {
          code: "asciidoc",
          split: { char: "\u200b" }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Keygen;
