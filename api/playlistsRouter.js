import express from "express";

const router = express.Router();

import { 
  getAllPlaylists, 
  getPlaylistById, 
  createPlaylist, 
  getTracksByPlaylistId 
} from "../db/queries/playlists.js";

import { createPlaylistTrack } from "../db/queries/playlists_tracks.js";
import { getTrackById } from "#db/queries/tracks";

router.get("/", async (req, res, next) => {
  try {
    const playlists = await getAllPlaylists();
    res.send(playlists);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if(!req.body){
    return res.status(400).send("Missing Data");
  }
  
    try {
    const { name, description } = req.body;
    if(!name || !description){
        return res.status(400).send("Name and Description are required");
    }
    const playlist = await createPlaylist({ name, description });
    res.status(201).send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
   const { id } = req.params;

  if(isNaN(id)){
    return res.status(400).send("ID must be a number.")
  }
  
    try {
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).send("Playlist not found.");
    res.send(playlist);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/tracks", async (req, res, next) => {
    
  try {
    const { id } = req.params;
    if(isNaN(id)){
        return res.status(400).send("Must be a number");
    }
    const playlist = await getPlaylistById(id);
    if(!playlist){
        return res.status(404).send("playlist not found");
    }
    const tracks = await getTracksByPlaylistId(id);
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/tracks", async (req, res, next) => {
  try {
    if (!req.body || req.body.trackId === undefined) {
      return res.status(400).send("trackId is required in the request body.");
    }
    const { trackId } = req.body;
    if(trackId === undefined){
        return res.status(404).send("No body recieved");
    }
    if (isNaN(trackId)) {
      return res.status(400).send("trackId must be a number.");
    }
    const track = await getTrackById(trackId);
    if (!track) {
      return res.status(400).send("Track not found.");
    }

    const playlistId = req.params.id;
    if (isNaN(playlistId)) {
      return res.status(400).send("Playlist ID must be a number.");
    }
    const playlist = await getPlaylistById(playlistId);
    if(!playlist){
        return res.status(404).send("Playlist not found");
    }
    const playlistTrack = await createPlaylistTrack({ playlistId, trackId });
    res.status(201).send(playlistTrack);
  } catch (err) {
    if(err.code === '23505'){
        return res.status(400).send("Track is already in this playlist");
    }
    next(err);
  }
});

export default router;