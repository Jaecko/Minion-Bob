/* eslint-disable */
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    this.client.user.setActivity('Me want banana !');

    const channel = this.client.channels.find(
      c => c.name == 'bob-reboot' && c.type == 'text'
    );

    channel.send(`:gear: ${this.client.user.username} est redémarré !`);

    this.client.logger.log(`${this.client.user.username} run...`, 'ready');
  }
};
