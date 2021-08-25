/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(openmusicService, mailSender) {
    this._openmusicService = openmusicService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, credentialId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._openmusicService.getPlaylists(playlistId, credentialId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
