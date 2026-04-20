import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist, getAllPlaylists } from "./queries/playlists.js";
import { createTrack, getAllTracks } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 20; i++) {
    const track = await createTrack({
      name: faker.music.songName(),
      
      duration_ms: faker.number.int({ min: 120000, max: 300000 }),
    });
  }

  for (let i = 0; i < 10; i++) {
    const playlist = await createPlaylist({
      name: faker.music.genre(),
      description: faker.lorem.sentence(),
    });
  }
  const allPlaylists = await getAllPlaylists();
  const allTracks = await getAllTracks();

  for (let i = 0; i < 15; i++) {
    const randomPlaylist = allPlaylists[Math.floor(Math.random() * allPlaylists.length)];
    const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];

    try {
      await createPlaylistTrack({
        playlistId: randomPlaylist.id,
        trackId: randomTrack.id,
      });
    } catch (err) {
      i--; 
    }
  }
}
