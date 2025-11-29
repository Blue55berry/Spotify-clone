from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SAAVN_API_URL = "https://saavn.sumit.co"

@app.route('/api/modules')
def get_modules():
    language = request.args.get('language', 'english,hindi')
    try:
        response = requests.get(f"{SAAVN_API_URL}/modules", params={'language': language})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search/songs')
def search_songs():
    query = request.args.get('query')
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/search/songs", params={'query': query, 'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/songs')
def get_song_details():
    ids = request.args.get('ids')
    try:
        response = requests.get(f"{SAAVN_API_URL}/songs", params={'id': ids})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search/artists')
def search_artists():
    query = request.args.get('query')
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/search/artists", params={'query': query, 'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/artists/<artist_id>')
def get_artist_details(artist_id):
    try:
        response = requests.get(f"{SAAVN_API_URL}/artists/{artist_id}")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
        
@app.route('/api/artists/<artist_id>/songs')
def get_artist_top_songs(artist_id):
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/artists/{artist_id}/songs", params={'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search/albums')
def search_albums():
    query = request.args.get('query')
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/search/albums", params={'query': query, 'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/albums/<album_id>')
def get_album_details(album_id):
    try:
        response = requests.get(f"{SAAVN_API_URL}/albums/{album_id}")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
        
@app_route('/api/albums/<album_id>/songs')
def get_album_songs(album_id):
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/albums/{album_id}/songs", params={'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search/playlists')
def search_playlists():
    query = request.args.get('query')
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/search/playlists", params={'query': query, 'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/playlists/<playlist_id>')
def get_playlist_details(playlist_id):
    try:
        response = requests.get(f"{SAAVN_API_URL}/playlists/{playlist_id}")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/playlists/<playlist_id>/songs')
def get_playlist_songs(playlist_id):
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/playlists/{playlist_id}/songs", params={'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/browse/new-releases')
def get_new_releases():
    limit = request.args.get('limit', 50)
    try:
        response = requests.get(f"{SAAVN_API_URL}/browse/new-releases", params={'limit': limit})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
