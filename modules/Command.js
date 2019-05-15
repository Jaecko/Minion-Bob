class Command {
  constructor(
    client,
    {
      name = null,
      description = "No description detected.",
      category = "Utilisateur",
      usage = "No use detected.",
      enable = true,
      guildOnly = false,
      aliases = new Array(),
      permLevel = "Utilisateur"
    }
  ) {
    (this.client = client),
    (this.conf = { enable, guildOnly, aliases, permLevel });
    this.help = { name, description, category, usage };
  }
}

module.exports = Command;
