/* eslint-disable */
const Command = require('../../modules/Command.js');

class Code extends Command {
  constructor(client) {
    super(client, {
      name: 'code',
      description: "Créer le markdown d'envoie de code autatiquement.",
      usage: 'code <langage> <code>'
    });
  }

  run(message, args) {
    try {
      let language = args[0].toUpperCase();
      args.shift();
      let code = args.join(' ');

      // Check if language exist. If not, concat language and code and language egal Markdown
      if (
        language != 'HTML' &&
        language != 'CSS' &&
        language != 'JS' &&
        language != 'NODE' &&
        language != 'PHP' &&
        language != 'RUBY' &&
        language != 'PYTHON' &&
        language != 'C' &&
        language != 'C#' &&
        language != 'C++' &&
        language != 'SQL'
      ) {
        code = language + code;
        language = 'Markdown';
      }

      message.delete(100);
      message.reply('votre code :');
      message.channel.send('```' + language + '\n' + code + '```');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Code;
