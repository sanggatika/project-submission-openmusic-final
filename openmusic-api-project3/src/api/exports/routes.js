// Routes Export
const routes = (handler) => [
  // URL Export
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportSongsPlaylistHandler,
    // Authentivication songsapp_jwt
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
