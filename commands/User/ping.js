const Command = require("../../modules/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      handlebar: "<1 - 100>",
      description: "Montrer la latence du bot.",
      usage: "ping"
    });
  }

  async run(message) {
    try {
      const msg = await message.channel.send("Ping !");
      msg.edit(
        `Pong !\nLatence bot : ${msg.createdTimestamp -
          message.createdTimestamp}ms.\nAPI: ${Math.round(this.client.ping)}ms.`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;
