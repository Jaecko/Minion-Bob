/* eslint-disable */
const Command = require('../../modules/Command.js');
const opn = require('open');

class CanIUse extends Command {
  constructor(client) {
    super(client, {
      name: 'caniuse',
      description: 'Faire une recherche sur "Can I Use".',
      usage: 'caniuse <recherche>',
      aliases: ['sl']
    });
  }

  async run(message, args) {
    try {
      const lien = `https://caniuse.com/#search=${args.join('%20')}`;
      message.delete(100);
      // opn(lien);
      const channel = this.client.channels.find(
        c => c.name == 'bob-links' && c.type == 'text'
      );
      await channel.send(
        `${message.author}, voici votre lien vers Can I Use : ${lien}`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CanIUse;
