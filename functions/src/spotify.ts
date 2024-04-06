const Spotify = require("node-spotify-api");

// Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual credentials
const spotify = new Spotify({
  id: "eb0593fe0b664e90a240a4f8dfd7c4a2",
  secret: "95e797b1eb1942aa81a3edb8b0e578ea",
});

export async function getSuggestions(
  searchQuery = "genre:jazz energy:low acousticness:high",
) {
  // Search for tracks based on the query
  const response = await spotify
    .search({ type: "track", query: searchQuery, limit: 10 })
    .catch(() => {
      console.error("Error occurred:");
    });
  const tracks = response.tracks.items;
  tracks.forEach((track: any) => {
    console.log(`Track: ${track.name}`);
    console.log(
      `Artists: ${track.artists.map((artist: any) => artist.name).join(", ")}`,
    );
    console.log(`URL: ${track.external_urls.spotify}`);
    console.log();
  });
}
