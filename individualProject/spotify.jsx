const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "4dc1a554759b469cba35a471202abcbe";
const redirectUri = "http://localhost:5173/home";
const scopes = ["user-library-read", "playlist-read-private"].join(" ");

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=code&show_dialog=true`;
