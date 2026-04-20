import express from "express";
const router = express.Router();
import { getAllTracks, getTrackById } from "../db/queries/tracks.js";

router.get("/", async (req, res, next) => {
  try {
    const tracks = await getAllTracks();
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const track = await getTrackById(req.params.id);
    if (!track) {
      return res.status(404).send("Track not found.");
    }
    res.send(track);
  } catch (err) {
    next(err);
  }
});

export default router;