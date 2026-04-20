import db from "#db/client";

export async function createPlaylist({ name, description }) {
  const { rows } = await db.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return rows[0];
}

export async function getAllPlaylists() {
  const { rows } = await db.query("SELECT * FROM playlists");
  return rows;
}

export async function getPlaylistById(id) {
  const { rows } = await db.query("SELECT * FROM playlists WHERE id = $1", [id]);
  return rows[0];
}

export async function createPlaylist({ name, description }) {
  const { rows } = await db.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return rows[0];
}

export async function getTracksByPlaylistId(id) {
  const { rows } = await db.query(
    `SELECT tracks.* FROM tracks
     JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
     WHERE playlists_tracks.playlist_id = $1`,
    [id]
  );
  return rows;
}