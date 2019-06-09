/* eslint-disable */
const Discord = require('discord.js');

const category_name = 'Bot';
const channelToCreate = ['bot-reports', 'bot-keygen'];

module.exports.run = async (bot, message, args) => {
  const permission = [
    {
      id: message.guild.id,
      denied: ['READ_MESSAGES']
    }
  ];

  bot.user
    .setActivity(`Initialisation de ${bot.user.username}`)
    .catch(console.error);

  let checkCategory = message.guild.channels.find(
    c => c.name == `${category_name}` && c.type == 'category'
  );

  if (!checkCategory) {
    // Create category for bot
    message.guild
      .createChannel(`${category_name}`, `category`, permission)
      .then(() => {
        message.channel.send(`Catégorie "${category_name}" créée...`);
      });
  }

  // Create the channels for bot
  channelToCreate.forEach(element => {
    let checkChannel = message.guild.channels.find(
      c => c.name == `${element}` && c.type == 'text'
    );
    if (!checkChannel) {
      message.guild
        .createChannel(`${element}`, 'text', permission)
        .then(channel => {
          let category = message.guild.channels.find(
            c => c.name == `${category_name}` && c.type == 'category'
          );
          channel.setParent(category.id);

          message.channel.send(`Catégorie "${element}" créé...`);
        })
        .catch(console.error);
    }
  });

  message.channel.send(`Initialisation de ${bot.user.username} finie !`);

  // if (!category) throw new Error('Category channel does not exist');
};

module.exports.help = {
  name: 'init',
  handlebar: '',
  description: `Initialize the bot.`
};
