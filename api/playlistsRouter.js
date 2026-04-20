import express from "express";

const router = express.Router();

import { 
  getAllPlaylists, 
  getPlaylistById, 
  createPlaylist, 
  getTracksByPlaylistId 
} from "../db/queries/playlists.js";

import { createPlaylistTrack } from "../db/queries/playlists_tracks.js";

router.get("/", async (req, res, next) => {
  try {
    const playlists = await getAllPlaylists();
    res.send(playlists);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const playlist = await createPlaylist({ name, description });
    res.status(201).send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const playlist = await getPlaylistById(req.params.id);
    if (!playlist) return res.status(404).send("Playlist not found.");
    res.send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tracks", async (req, res, next) => {
  try {
    const tracks = await getTracksByPlaylistId(req.params.id);
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/tracks", async (req, res, next) => {
  try {
    const { trackId } = req.body;
    const playlistId = req.params.id;
    const playlistTrack = await createPlaylistTrack({ playlistId, trackId });
    res.status(201).send(playlistTrack);
  } catch (err) {
    next(err);
  }
});

export default router;