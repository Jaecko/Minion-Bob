/* eslint-disable */
const Command = require("../../modules/Command.js");
const opn = require("open");

class SeekLogo extends Command {
  constructor(client) {
    super(client, {
      name: "seeklogo",
      description: "Faire une recherche sur SeekLogo.",
      usage: "seeklogo <recherche>",
      aliases: ["sl"]
    });
  }

  async run(message, args) {
    try {
      const lien = `https://seeklogo.com/search?q=${args.join("%20")}`;
      message.delete(100);
      // opn(lien);
      const channel = this.client.channels.find(
        c => c.name == "bob-links" && c.type == "text"
      );
      await channel.send(
        `${message.author}, voici votre lien vers SeekLogo : ${lien}`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SeekLogo;
