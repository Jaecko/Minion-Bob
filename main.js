/*  https://discordapp.com/oauth2/authorize?client_id=575248511457820673&scope=bot */

/* eslint-disable */
const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");
require("dotenv").config();

class Bob extends Client {
  constructor(options) {
    super(options);

    this.config = require("./config.js");

    this.commands = new Collection();
    this.aliases = new Collection();

    this.settings = new Enmap({
      name: "settings",
      cloneLevel: "deep",
      fetchAll: false,
      autoFetch: true
    });

    this.logger = require("./modules/Logger");
    this.wait = require("util").promisify(setTimeout);
  }

  // permissions
  permlevel(message) {
    let permlvl = 0;

    const permOrder = this.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.logger.log(`[COMMAND] ${props.help.name} charged !`, "log");
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Impossible de charger la commande ${commandName}: ${e}`;
    }
  }

  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.command.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command)
      return `La command ${commandName} ne semble pas exister. Essayez à nouveau.`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[
      require.resolve(`${commandPath}${path.sep}${commandName}.js`)
    ];
    return false;
  }

  getSettings(guild) {
    const defaults = this.config.defaultSettings || {};
    const guildData = this.settings.get(guild.id) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  }
}

const client = new Bob();
console.log(client.config.permLevels.map(p => `${p.level}: ${p.name}`));

// Fonction d'initialisation
const init = async () => {
  // Récupération des commandes
  klaw("./commands").on("data", item => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.loadCommand(
      cmdFile.dir,
      `${cmdFile.name}${cmdFile.ext}`
    );
    if (response) client.logger.error(response);
  });

  // Récupération des événements
  const evtFiles = await readdir("./events");
  // client.logger.log(`Chargement de ${evtFiles.length} événements.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`[EVENT] ${eventName} charged !`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(process.env.CLIENT_TOKEN);
};

init();
