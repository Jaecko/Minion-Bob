/* eslint-disable */
const Command = require('../../modules/Command.js');
const open = require('open');
// const start = require('open');
// const xdg-open = require('open');

class Open extends Command {
  constructor(client) {
    super(client, {
      name: 'open',
      description: "Ouvre le lien, le fichier ou l'exécutable demandé.",
      usage: 'open <lien>'
    });
  }
  async run(message, args) {
    try {
      const lien = `${args.join('%20')}`;
      message.delete(100);
      // if (process.platform === 'darwin') {
      //   open(lien);
      // } else if (process.platform === 'win32' || process.platform === 'win64') {
      //   start(lien, { app: 'google chrome' });
      // } else {
      //   xdg - open(lien, { app: 'google chrome' });
      // }
      // message.author.send(`Vous venez d'ouvrir : ${lien}`);
      // .then(() => message.author.send(`Vous venez d'ouvrir : ${lien}`))
      // .catch(
      //   message.author.send(
      //     `Le lien "${lien}" n'est pas ouvrable sur internet !`
      //   )
      // );

      const channel = this.client.channels.find(
        c => c.name == 'bob-links' && c.type == 'text'
      );
      await channel.send(`${message.author}, voici votre lien : ${lien}`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Open;
