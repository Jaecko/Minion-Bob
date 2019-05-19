/* eslint-disable */

const Command = require('../../modules/Command.js');
const Discord = require('discord.js');

tabMonth = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
];

class Server extends Command {
  constructor(client) {
    super(client, {
      name: 'server',
      description: 'Afficher les informations du serveur.',
      usage: 'server',
      category: 'Staff',
      permLevel: 'Staff'
    });
  }

  async run(message, args) {
    try {
      let numbers = [];
      numbers['members'] = message.guild.memberCount;
      numbers['bots'] = 0;
      message.guild.members.map(u => {
        if (u.user.bot === true) numbers['bots']++;
        // console.log(u.user.username);
      });
      numbers['users'] = numbers['members'] - numbers['bots'];

      const servIcon = message.guild.iconURL;
      // Formatter la date de création
      const CreationDate = message.guild.createdAt;
      const CreationDay =
        CreationDate.getDate() < 10
          ? '0' + CreationDate.getDate()
          : CreationDate.getDate();
      const CreationMonth = tabMonth[CreationDate.getMonth()];
      const CreationYear = CreationDate.getFullYear();
      const CreationFullDate =
        CreationDay + ' ' + CreationMonth + ' ' + CreationYear;
      // Formatter la date à laquelle la personne à rejoint
      const JoinDate = message.guild.createdAt;
      const JoinDay =
        JoinDate.getDate() < 10 ? '0' + JoinDate.getDate() : JoinDate.getDate();
      const JoinMonth = tabMonth[JoinDate.getMonth()];
      const JoinYear = JoinDate.getFullYear();
      const JoinFullDate = JoinDay + ' ' + JoinMonth + ' ' + JoinYear;
      const servEmbed = new Discord.RichEmbed()
        .setTitle('Information sur le serveur')
        .setColor('#f4ee42')
        .setThumbnail(servIcon)
        .addField('Nom du serveur', message.guild.name)
        .addField('Membres', numbers['members'])
        .addField('Utilisateurs', numbers['users'])
        .addField('Bots', numbers['bots'])
        .addField('Créé le', CreationFullDate)
        .addField('Vous avez rejoint le', JoinFullDate);

      return message.channel.send(servEmbed);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Server;
