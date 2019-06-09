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
      // message.channel
      //   .bulkDelete(
      //     (time.time() - 14 * 24 * 60 * 60) * 1000.0),
      //     clear
      //   )
      //   .then(msg => {
      //     message.channel
      //       .send(`J'ai supprimé ***${msg.size - 1} messages*** pour vous !`)
      //       .then(msg => msg.delete(5000));
      //   });

      message.channel
        .fetchMessages({
          limit: clear // Fetch last 50 messages.
        })
        .then(msgCollection => {
          // Resolve promise
          msgCollection
            .forEach(msg => {
              // forEach on message collection
              msg.delete(); // Delete each message
            })
            .then(
              message.channel
                .send(
                  `J'ai supprimé ***${msgCollection.size -
                    1} messages*** pour vous !`
                )
                .then(msg => msg.delete(5000))
            );
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Clear;
