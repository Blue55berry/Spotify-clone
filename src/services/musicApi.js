import axios from 'axios';

// Using JioSaavn API (Free music API)
const API_BASE_URL = '';

// Alternative: You can also use Spotify Web API if you have credentials
// const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

class MusicApiService {
  // Search songs
  async searchSongs(query, limit = 20) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/songs`, {
        params: {
          query: query,
          limit: limit
        }
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error searching songs:', error);
      throw error;
    }
  }

  // Get trending songs
  async getTrendingSongs() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs/trending`, {
        params: { limit: 50 }
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching trending songs:', error);
      throw error;
    }
  }

  // Get song details
  async getSongDetails(songId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/songs/${songId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching song details:', error);
      throw error;
    }
  }

  // Search artists
  async searchArtists(query, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/artists`, {
        params: {
          query: query,
          limit: limit
        }
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error searching artists:', error);
      throw error;
    }
  }

  // Get artist details and songs
  async getArtistDetails(artistId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/artists/${artistId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching artist details:', error);
      throw error;
    }
  }

  // Search albums
  async searchAlbums(query, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/albums`, {
        params: {
          query: query,
          limit: limit
        }
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error searching albums:', error);
      throw error;
    }
  }

  // Get album details
  async getAlbumDetails(albumId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/albums/${albumId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching album details:', error);
      throw error;
    }
  }

  // Get playlists (if available)
  async getPlaylists(query, limit = 10) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/playlists`, {
        params: {
          query: query,
          limit: limit
        }
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }
}

export default new MusicApiService();
