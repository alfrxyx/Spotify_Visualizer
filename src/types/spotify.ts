export interface SpotifyTrack {
  track_name: string;
  'artist(s)_name': string;
  artist_count: number;
  released_year: number;
  released_month: number;
  released_day: number;
  in_spotify_playlists: number;
  in_spotify_charts: number;
  streams: number;
  in_apple_playlists: number;
  in_apple_charts: number;
  in_deezer_playlists: number;
  in_deezer_charts: number;
  in_shazam_charts: number;
  bpm: number;
  key: string;
  mode: string;
  'danceability_%': number;
  'valence_%': number;
  'energy_%': number;
  'acousticness_%': number;
  'instrumentalness_%': number;
  'liveness_%': number;
  'speechiness_%': number;
}

export interface ArtistStats {
  artist: string;
  totalStreams: number;
  trackCount: number;
  avgValence: number;
  avgEnergy: number;
  avgBpm: number;
}