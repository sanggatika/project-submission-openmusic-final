/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
 
class OpenmusicService {
  constructor() {
    this._pool = new Pool();
  }

  // Function Menampilkan dan Mendapatkan Playlists Sesuai Dengan Owner dan Collaborations
  async getPlaylists(playlistId, credentialId) {
    // Pengguna hanya bisa mengekspor playlist yang menjadi haknya sebagai pemilik atau kolaborator playlist
    const query = {
      text: `SELECT playlists.id as id,playlists.name as name,users.username as username FROM playlists      
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      JOIN users on playlists.owner=users.id
      WHERE playlists.id = $1 AND playlists.owner = $2 OR collaborations.user_id = $2`,
      values: [playlistId, credentialId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = OpenmusicService;
