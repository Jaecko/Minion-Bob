/* eslint-disable */
const Command = require('../../modules/Command.js');
const opn = require('opn');

class Google extends Command {
  constructor(client) {
    super(client, {
      name: 'google',
      description: 'Faire une recherche sur Google.',
      usage: 'google <recherche>'
    });
  }

  async run(message, args) {
    try {
      const lien = `https://www.google.com/#q=${args.join('%20')}`;
      message.delete(100);
      // opn(lien);
      const channel = this.client.channels.find(
        c => c.name == 'bob-links' && c.type == 'text'
      );
      await channel.send(
        `${message.author}, voici votre lien vers Google : ${lien}`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Google;
