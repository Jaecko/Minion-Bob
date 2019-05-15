/* eslint-disable */
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;
    if (
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;

    // Paramètres
    const settings = this.client.getSettings(message.guild);
    message.settings = settings;

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.trim().split(/ +/g);

    if (args[0] !== `${settings.prefix}${settings.command}`) return;
    args.shift();

    let command = "";
    if (!args[0]) args[0] = "help";

    command = args.shift().toLowerCase();

    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    const level = this.client.permlevel(message);

    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    // Vérifie si l'utilisateur à le niveau de permission
    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        return message.channel
          .send(`Vous n'avez pas la permission d'utiliser cette commande. Votre niveau de permission est ${level} (${
          this.client.config.permLevel.find(l => l.level === level).name
        })
          Cette commande requière le niveau de permission : ${
            this.client.levelCache[cmd.conf.permLevel]
          } (${cmd.conf.permLevel})`);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    // message.flags = [];
    // while (args[0] && args[0][0] === "-") {
    //   message.flags.push(args.shift().slice(1));
    // }

    // Lancement de la commande
    this.client.logger.log(
      `[${this.client.config.permLevels.find(l => l.level === level).name}]${
        message.author.username
      }(ID:${message.author.id}) lance la commande ${cmd.help.name}`
    );
    cmd.run(message, args, level);
  }
};
