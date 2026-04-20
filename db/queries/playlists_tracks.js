import db from "#db/client";

export async function createPlaylistTrack({ playlistId, trackId }) {
  const { rows } = await db.query(
    "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2) RETURNING *",
    [playlistId, trackId]
  );
  return rows[0];
}