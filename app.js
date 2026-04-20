import express from "express";
import tracksRouter from './api/tracksRouter';
import playListRouter from './api/playlistsRouter';

const app = express();

app.use(express.json());

app.use('/tracks', tracksRouter);

app.use('/playlists', playListRouter);

app.use((request, response, next) => {
  response.status(500).send("Sorry! Something went wrong");
});

export default app;
