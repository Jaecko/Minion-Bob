/* eslint-disable */

const Command = require("../../modules/Command.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Montrer toutes les commandes disponibles.",
      usage: "help <commande>",
      aliases: ["h"]
    });
  }

  async run(message, args, level) {
    try {
      if (!args[0]) {
        const settings = message.settings;

        const myCommands = message.guild
          ? this.client.commands.filter(
              cmd => this.client.levelCache[cmd.conf.permLevel] <= level
            )
          : this.client.commands.filter(
              cmd =>
                this.levelCache[cmd.conf.permLevel] <= level &&
                cmd.conf.guildOnly !== true
            );

        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce(
          (long, str) => Math.max(long, str.length),
          0
        );
        let currentCat = "";
        let output = `= Liste des commandes =\n\nToutes les commandes commencent par ${
          this.client.config.defaultSettings.prefix
        }${this.client.config.defaultSettings.command}\n\n[Use ${
          this.client.config.defaultSettings.prefix
        }${
          this.client.config.defaultSettings.command
        } help <nom de la commande> pour plus de détails.]\n`;
        const sorted = myCommands.array().sort((p, c) => {
          p.help.category > c.help.category
            ? 1
            : p.help.name > c.help.name && p.help.category === c.help.category
            ? 1
            : -1;
        });
        sorted.forEach(c => {
          // const cat = c.help.category.toProperCase();
          const cat = c.help.category;
          if (currentCat !== cat) {
            output += `\u200b\n== ${cat} == \n`;
            currentCat = cat;
          }
          output += `${c.help.name}${" ".repeat(
            longest - c.help.name.length
          )} :: ${c.help.description}\n`;
        });
        message.channel.send(output, {
          code: "asciidoc",
          split: { char: "\u200b" }
        });
      } else {
        let command = args[0];
        if (this.client.commands.has(command)) {
          command = this.client.commands.get(command);
          if (level < this.client.levelCache[command.conf.permLevel]) return;
          message.channel.send(
            `= ${command.help.name} = \nDescription :: ${
              command.help.description
            }\nUtilisation :: ${
              command.help.usage
            }\nAlias       :: ${command.conf.aliases.join(", ")}`,
            { code: "asciidoc" }
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Help;
