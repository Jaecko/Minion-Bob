/* eslint-disable */
const Command = require('../../modules/Command.js');
const math = require('mathjs');
class Rand extends Command {
  constructor(client) {
    super(client, {
      name: 'rand',
      description:
        'Générer un nombre aléatoire. Par défaut, min = 1 et max = 100.',
      usage: `rand <min - max>`
    });
  }

  run(message, args) {
    try {
      let min, max;

      if (args[0] && args[1]) {
        min = args[0];
        max = args[1];
      } else if (args[0] && !args[1]) {
        min = 1;
        max = args[0];
      } else {
        min = 1;
        max = 100;
      }

      // Vérifie que min et max soient bien des nombres
      if (!Number(min) || !Number(max))
        return message.reply(
          'votre minimum et votre maximum doivent être des nombres !'
        );

      // Vérifie que min est plus petit que max
      if (math.compare(min, max) == 1)
        return message.reply(
          'votre minimum doit être plus petit que votre maximum !'
        );

      min = Math.ceil(min);
      max = Math.floor(max);

      const number = Math.floor(Math.random() * (max - min)) + min;

      message.delete(1000);
      message.reply(`votre numéro (${min} - ${max}) est : ${number}`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Rand;
