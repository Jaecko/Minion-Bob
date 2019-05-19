/* eslint-disable */

const Command = require('../../modules/Command.js');
const Discord = require('discord.js');

class Poll extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      description: 'Créer un sondage.',
      usage: 'poll <question>',
      category: 'Staff',
      permLevel: 'Staff'
    });
  }

  async run(message, args) {
    try {
      if (!args[0]) return message.channel.send('Syntaxe: poll <question>');

      const pollEmbed = new Discord.RichEmbed()
        .setTitle(`__Sondage créé par ${message.author.username}__`)
        .setColor('#dc143c')
        .setFooter('Appuyez que les réactions ci-dessous.')
        .setDescription(args.join(' '));

      message.delete(2000);
      const msg = await message.channel.send(pollEmbed);
      await msg.react('✔');
      await msg.react('❌');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Poll;
