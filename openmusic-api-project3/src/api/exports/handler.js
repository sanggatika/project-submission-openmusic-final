// Hendler Export Data Playlist
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(ProducerService, playlistsService, validator) {
    this._producerService = ProducerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportSongsPlaylistHandler = this.postExportSongsPlaylistHandler.bind(this);
  }

  async postExportSongsPlaylistHandler(request, h) {
    try {
      this._validator.validateExportSongsPayload(request.payload);

      // Mendaptkan nilai playlistId dan credentialId token
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      // Mengecek Akses Data Owner
      await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

      const message = {
        playlistId,
        credentialId,
        targetEmail: request.payload.targetEmail,
      };

      // Menjalankan Proses Producer Service
      await this._producerService.sendMessage('export:playlist', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ExportsHandler;
