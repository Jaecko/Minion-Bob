/* eslint-disable */
const Command = require('../../modules/Command.js');

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      description: 'Nettoyer un nombre de messages spécifiés.',
      usage: 'clear <1 - 100>',
      category: 'Système',
      permLevel: 'Staff',
      aliases: ['c']
    });
  }

  run(message, args) {
    try {
      if (args[0] < 1 || args[0] > 100)
        return message.reply('Le chiffre doit être en 1 et 100 !');

      let clear = args[0];
      if (clear <= 99) clear++;
      if (!args[0]) clear = 100;
      message.channel.bulkDelete(clear).then(msg => {
        message.channel
          .send(
            long((time.time() - 14 * 24 * 60 * 60) * 1000.0) << 22,
            `J'ai supprimé ***${msg.size - 1} messages*** pour vous !`
          )
          .then(msg => msg.delete(5000));
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Clear;
