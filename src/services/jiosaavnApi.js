import axios from 'axios';

const API_BASE_URL = '/api';

class JioSaavnApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
    });
  }

  // Search songs
  async searchSongs(query, limit = 20) {
    try {
      const response = await this.client.get('/search/songs', {
        params: {
          query: query.trim(),
          limit: Math.min(limit, 50),
        },
      });

      return (response.data.results || []).map(song => ({
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        year: song.year,
        playCount: song.playCount,
        ...song,
      }));
    } catch (error) {
      console.error('Error searching songs:', error);
      throw error;
    }
  }

  // Get trending songs
  async getTrendingSongs(language = 'english', limit = 50) {
    try {
      const response = await this.client.get('/modules', {
        params: { language: language },
      });

      const trendingSongs = response.data?.data?.trending?.songs;
      if (!trendingSongs) return [];

      return (trendingSongs || []).map(song => ({
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album?.name || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        playCount: song.playCount,
        ...song,
      }));
    } catch (error) {
      console.error('Error fetching trending songs:', error);
      throw error;
    }
  }

  // Get song details
  async getSongDetails(songId) {
    try {
      const response = await this.client.get(`/songs`, {
        params: { ids: songId },
      });
      const song = response.data;

      return {
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        lyrics: song.lyrics,
        ...song,
      };
    } catch (error) {
      console.error('Error fetching song details:', error);
      throw error;
    }
  }

  // Search artists
  async searchArtists(query, limit = 10) {
    try {
      const response = await this.client.get('/search/artists', {
        params: {
          query: query.trim(),
          limit: Math.min(limit, 50),
        },
      });

      return (response.data.results || []).map(artist => ({
        id: artist.id,
        name: artist.name,
        image: artist.image || [],
        songs: artist.songs || 0,
        followers: artist.followers,
        ...artist,
      }));
    } catch (error) {
      console.error('Error searching artists:', error);
      throw error;
    }
  }

  // Get artist details
  async getArtistDetails(artistId) {
    try {
      const response = await this.client.get(`/artists/${artistId}`);
      const artist = response.data;

      return {
        id: artist.id,
        name: artist.name,
        image: artist.image || [],
        topSongs: artist.topSongs || [],
        songs: artist.songs || 0,
        bio: artist.bio,
        followers: artist.followers,
        ...artist,
      };
    } catch (error) {
      console.error('Error fetching artist details:', error);
      throw error;
    }
  }

  // Get artist top songs
  async getArtistTopSongs(artistId, limit = 20) {
    try {
      const response = await this.client.get(`/artists/${artistId}/songs`, {
        params: { limit: Math.min(limit, 50) },
      });

      return (response.data.results || []).map(song => ({
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        ...song,
      }));
    } catch (error) {
      console.error('Error fetching artist top songs:', error);
      throw error;
    }
  }

  // Search albums
  async searchAlbums(query, limit = 10) {
    try {
      const response = await this.client.get('/search/albums', {
        params: {
          query: query.trim(),
          limit: Math.min(limit, 50),
        },
      });

      return (response.data.results || []).map(album => ({
        id: album.id,
        name: album.name,
        artist: album.artists?.[0]?.name || 'Unknown Artist',
        artists: album.artists || [],
        image: album.image || [],
        songs: album.songs || 0,
        year: album.year,
        ...album,
      }));
    } catch (error) {
      console.error('Error searching albums:', error);
      throw error;
    }
  }

  // Get album details
  async getAlbumDetails(albumId) {
    try {
      const response = await this.client.get(`/albums/${albumId}`);
      const album = response.data;

      return {
        id: album.id,
        name: album.name,
        artist: album.artists?.[0]?.name || 'Unknown Artist',
        artists: album.artists || [],
        image: album.image || [],
        songs: album.songs || [],
        year: album.year,
        label: album.label,
        ...album,
      };
    } catch (error) {
      console.error('Error fetching album details:', error);
      throw error;
    }
  }

  // Get album songs
  async getAlbumSongs(albumId, limit = 50) {
    try {
      const response = await this.client.get(`/albums/${albumId}/songs`, {
        params: { limit: Math.min(limit, 50) },
      });

      return (response.data.results || []).map(song => ({
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        ...song,
      }));
    } catch (error) {
      console.error('Error fetching album songs:', error);
      throw error;
    }
  }

  // Search playlists
  async searchPlaylists(query, limit = 10) {
    try {
      const response = await this.client.get('/search/playlists', {
        params: {
          query: query.trim(),
          limit: Math.min(limit, 50),
        },
      });

      return (response.data.results || []).map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        image: playlist.image || [],
        songs: playlist.songs || 0,
        followers: playlist.followers,
        ...playlist,
      }));
    } catch (error) {
      console.error('Error searching playlists:', error);
      return [];
    }
  }

  // Get playlist details
  async getPlaylistDetails(playlistId) {
    try {
      const response = await this.client.get(`/playlists/${playlistId}`);
      const playlist = response.data;

      return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        image: playlist.image || [],
        songs: playlist.songs || [],
        followers: playlist.followers,
        ...playlist,
      };
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      throw error;
    }
  }

  // Get playlist songs
  async getPlaylistSongs(playlistId, limit = 50) {
    try {
      const response = await this.client.get(`/playlists/${playlistId}/songs`, {
        params: { limit: Math.min(limit, 50) },
      });

      return (response.data.results || []).map(song => ({
        id: song.id,
        name: song.name || song.title || 'Unknown',
        artist: song.artists?.[0]?.name || 'Unknown Artist',
        artists: song.artists || [],
        album: song.album || 'Unknown Album',
        image: song.image || [],
        duration: song.duration || 0,
        url: song.downloadUrl?.[4]?.url || null,
        previewUrl: song.downloadUrl?.[0]?.url || null,
        explicit: song.explicit || false,
        ...song,
      }));
    } catch (error) {
      console.error('Error fetching playlist songs:', error);
      throw error;
    }
  }

  // Get new releases
  async getNewReleases(limit = 20) {
    try {
      const response = await this.client.get('/browse/new-releases', {
        params: { limit: Math.min(limit, 50) },
      });

      return (response.data.results || []).map(item => ({
        id: item.id,
        name: item.name,
        artist: item.artists?.[0]?.name || 'Unknown Artist',
        image: item.image || [],
        ...item,
      }));
    } catch (error) {
      console.error('Error fetching new releases:', error);
      return [];
    }
  }

  // Get charts
  async getCharts(language = 'english') {
    try {
      const response = await this.client.get('/modules', {
        params: { language: language },
      });

      const charts = response.data?.data?.charts;
      if (!charts) return [];

      return (charts || []).map(item => ({
        id: item.id,
        name: item.title || 'Unknown',
        type: item.type,
        image: item.image || [],
        count: item.count,
        ...item,
      }));
    } catch (error) {
      console.error('Error fetching charts:', error);
      return [];
    }
  }

  // Get recommendations
  async getRecommendations(seed = [], limit = 20) {
    try {
      // JioSaavn might not have direct recommendations endpoint
      // Fallback to trending songs
      return this.getTrendingSongs(limit);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }
}

export default new JioSaavnApiService();
