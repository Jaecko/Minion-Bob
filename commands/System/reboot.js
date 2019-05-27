const Command = require("../../modules/Command.js");

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: "reboot",
      description: "Éteindre et redémarrer le bot.",
      usage: "reboot",
      guildOnly: true,
      category: "Système",
      permLevel: "Bob",
      aliases: ["r"]
    });
  }

  async run(message) {
    try {
      message.delete(100);
      const channel = this.client.guilds
        .find(g => g.id == message.guild.id)
        .channels.find(c => c.name == "bob-reboot" && c.type == "text");
      await channel.send(
        `:gear: ${this.client.user.username} est occupé à redémarrer !`
      );

      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;
