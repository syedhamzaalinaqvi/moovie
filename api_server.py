#!/usr/bin/env python3
"""
Minimal TMDB Proxy Server for H-TV
Simple proxy to keep API key secure while allowing frontend calls
"""

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# TMDB Configuration - Use embedded key if env var not available
TMDB_API_KEY = os.getenv('TMDB_API_KEY') or '46d13701165988b5bb5fb4d123c0447e'
TMDB_BASE_URL = "https://api.themoviedb.org/3"

@app.route('/')
def serve_index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('.', filename)

# API Routes that the frontend expects
@app.route('/api/trending')
def get_trending():
    """Get trending movies/TV shows"""
    try:
        url = f"{TMDB_BASE_URL}/trending/all/week"
        params = {
            'api_key': TMDB_API_KEY,
            'language': 'en-US'
        }
        
        print(f"🔍 Fetching trending content from: {url}")
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        print(f"TMDB API Error: {e}")
        return jsonify({'error': 'Failed to fetch trending data'}), 500

@app.route('/api/movie/<int:movie_id>')
def get_movie(movie_id):
    """Get movie details by ID"""
    try:
        # Fetch movie details, credits, and videos in parallel
        urls = [
            f"{TMDB_BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US",
            f"{TMDB_BASE_URL}/movie/{movie_id}/credits?api_key={TMDB_API_KEY}&language=en-US",
            f"{TMDB_BASE_URL}/movie/{movie_id}/videos?api_key={TMDB_API_KEY}&language=en-US"
        ]
        
        print(f"🔍 Fetching movie {movie_id} details")
        responses = [requests.get(url, timeout=10) for url in urls]
        
        # Check all responses
        for resp in responses:
            resp.raise_for_status()
        
        details, credits, videos = [resp.json() for resp in responses]
        
        # Combine all data
        combined_data = {
            'details': details,
            'credits': credits,
            'videos': videos
        }
        
        return jsonify(combined_data)
    except requests.exceptions.RequestException as e:
        print(f"TMDB API Error: {e}")
        return jsonify({'error': 'Failed to fetch movie data'}), 500

@app.route('/api/tv/<int:tv_id>')
def get_tv_show(tv_id):
    """Get TV show details by ID"""
    try:
        # Fetch TV details, credits, and videos in parallel
        urls = [
            f"{TMDB_BASE_URL}/tv/{tv_id}?api_key={TMDB_API_KEY}&language=en-US",
            f"{TMDB_BASE_URL}/tv/{tv_id}/credits?api_key={TMDB_API_KEY}&language=en-US",
            f"{TMDB_BASE_URL}/tv/{tv_id}/videos?api_key={TMDB_API_KEY}&language=en-US"
        ]
        
        print(f"🔍 Fetching TV show {tv_id} details")
        responses = [requests.get(url, timeout=10) for url in urls]
        
        # Check all responses
        for resp in responses:
            resp.raise_for_status()
        
        details, credits, videos = [resp.json() for resp in responses]
        
        # Combine all data
        combined_data = {
            'details': details,
            'credits': credits,
            'videos': videos
        }
        
        return jsonify(combined_data)
    except requests.exceptions.RequestException as e:
        print(f"TMDB API Error: {e}")
        return jsonify({'error': 'Failed to fetch TV data'}), 500

@app.route('/api/tmdb/<path:endpoint>')
def proxy_tmdb(endpoint):
    """General proxy for other TMDB API calls"""
    try:
        url = f"{TMDB_BASE_URL}/{endpoint}"
        
        # Get all query parameters from the frontend request
        params = dict(request.args)
        params['api_key'] = TMDB_API_KEY
        
        print(f"🔍 Proxying request to: {url}")
        print(f"🔍 With params: {params}")
        
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        print(f"🔍 TMDB Response keys: {data.keys()}")
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        print(f"TMDB API Error: {e}")
        return jsonify({'error': 'Failed to fetch data'}), 500


if __name__ == '__main__':
    print("H-TV API Server starting...")
    print(f"TMDB API Key loaded: {'✓' if TMDB_API_KEY else '✗'}")
    if TMDB_API_KEY == '46d13701165988b5bb5fb4d123c0447e':
        print("Using embedded API key (for development)")
    else:
        print("Using environment variable API key")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
