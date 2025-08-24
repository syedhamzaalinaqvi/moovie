#!/usr/bin/env python3
"""
TMDB API Server for H-TV
Secure backend service that fetches movie data from TMDB API
"""

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import json

app = Flask(__name__)
CORS(app)

# TMDB Configuration
TMDB_API_KEY = os.getenv('TMDB_API_KEY')
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

def fetch_tmdb_data(endpoint):
    """Fetch data from TMDB API with error handling"""
    try:
        url = f"{TMDB_BASE_URL}/{endpoint}"
        params = {'api_key': TMDB_API_KEY}
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"TMDB API Error: {e}")
        return None

@app.route('/')
def serve_index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('.', filename)

@app.route('/api/movie/<int:movie_id>')
def get_movie_details(movie_id):
    """Get complete movie details including cast and crew"""
    try:
        # Fetch movie details with additional data
        movie_data = fetch_tmdb_data(f"movie/{movie_id}?append_to_response=credits,videos,release_dates")
        
        if not movie_data:
            return jsonify({'error': 'Movie not found'}), 404
        
        # Extract director and writers
        crew = movie_data.get('credits', {}).get('crew', [])
        directors = [person['name'] for person in crew if person['job'] == 'Director']
        writers = [person['name'] for person in crew if person['job'] in ['Writer', 'Screenplay', 'Story']]
        
        # Extract main cast (top 10)
        cast = movie_data.get('credits', {}).get('cast', [])[:10]
        cast_list = []
        for actor in cast:
            cast_list.append({
                'name': actor['name'],
                'character': actor['character'],
                'profile_path': f"{TMDB_IMAGE_BASE_URL}{actor['profile_path']}" if actor['profile_path'] else None
            })
        
        # Find trailer
        videos = movie_data.get('videos', {}).get('results', [])
        trailer = None
        for video in videos:
            if video['type'] == 'Trailer' and video['site'] == 'YouTube':
                trailer = f"https://www.youtube.com/embed/{video['key']}"
                break
        
        # Get production countries
        countries = [country['name'] for country in movie_data.get('production_countries', [])]
        
        # Format budget and revenue
        budget = movie_data.get('budget', 0)
        revenue = movie_data.get('revenue', 0)
        
        def format_money(amount):
            if amount >= 1000000000:
                return f"${amount/1000000000:.1f}B"
            elif amount >= 1000000:
                return f"${amount/1000000:.1f}M"
            elif amount >= 1000:
                return f"${amount/1000:.1f}K"
            else:
                return f"${amount}" if amount > 0 else "Not disclosed"
        
        # Compile response
        response_data = {
            'id': movie_data['id'],
            'title': movie_data['title'],
            'description': movie_data['overview'],
            'release_date': movie_data['release_date'],
            'release_year': movie_data['release_date'][:4] if movie_data['release_date'] else 'Unknown',
            'rating': round(movie_data['vote_average'], 1),
            'runtime': f"{movie_data['runtime']} minutes" if movie_data['runtime'] else 'Unknown',
            'budget': format_money(budget),
            'revenue': format_money(revenue),
            'directors': directors,
            'writers': writers,
            'countries': countries,
            'genres': [genre['name'] for genre in movie_data.get('genres', [])],
            'poster_path': f"{TMDB_IMAGE_BASE_URL}{movie_data['poster_path']}" if movie_data['poster_path'] else None,
            'backdrop_path': f"https://image.tmdb.org/t/p/w1280{movie_data['backdrop_path']}" if movie_data['backdrop_path'] else None,
            'cast': cast_list,
            'trailer': trailer,
            'status': movie_data.get('status', 'Unknown'),
            'tagline': movie_data.get('tagline', ''),
            'homepage': movie_data.get('homepage', '')
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        print(f"Error processing movie {movie_id}: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/tv/<int:tv_id>')
def get_tv_details(tv_id):
    """Get complete TV series details"""
    try:
        tv_data = fetch_tmdb_data(f"tv/{tv_id}?append_to_response=credits,videos")
        
        if not tv_data:
            return jsonify({'error': 'TV series not found'}), 404
        
        # Extract creators and writers
        crew = tv_data.get('credits', {}).get('crew', [])
        creators = [creator['name'] for creator in tv_data.get('created_by', [])]
        writers = [person['name'] for person in crew if person['job'] in ['Writer', 'Executive Producer']]
        
        # Extract main cast
        cast = tv_data.get('credits', {}).get('cast', [])[:10]
        cast_list = []
        for actor in cast:
            cast_list.append({
                'name': actor['name'],
                'character': actor['character'],
                'profile_path': f"{TMDB_IMAGE_BASE_URL}{actor['profile_path']}" if actor['profile_path'] else None
            })
        
        # Find trailer
        videos = tv_data.get('videos', {}).get('results', [])
        trailer = None
        for video in videos:
            if video['type'] == 'Trailer' and video['site'] == 'YouTube':
                trailer = f"https://www.youtube.com/embed/{video['key']}"
                break
        
        # Get production countries
        countries = [country['name'] for country in tv_data.get('production_countries', [])]
        
        response_data = {
            'id': tv_data['id'],
            'title': tv_data['name'],
            'description': tv_data['overview'],
            'first_air_date': tv_data['first_air_date'],
            'release_year': tv_data['first_air_date'][:4] if tv_data['first_air_date'] else 'Unknown',
            'rating': round(tv_data['vote_average'], 1),
            'seasons': tv_data['number_of_seasons'],
            'episodes': tv_data['number_of_episodes'],
            'creators': creators,
            'writers': writers,
            'countries': countries,
            'genres': [genre['name'] for genre in tv_data.get('genres', [])],
            'poster_path': f"{TMDB_IMAGE_BASE_URL}{tv_data['poster_path']}" if tv_data['poster_path'] else None,
            'backdrop_path': f"https://image.tmdb.org/t/p/w1280{tv_data['backdrop_path']}" if tv_data['backdrop_path'] else None,
            'cast': cast_list,
            'trailer': trailer,
            'status': tv_data.get('status', 'Unknown'),
            'tagline': tv_data.get('tagline', ''),
            'homepage': tv_data.get('homepage', '')
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        print(f"Error processing TV series {tv_id}: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/trending')
def get_trending():
    """Get trending movies and TV shows"""
    try:
        trending_data = fetch_tmdb_data("trending/all/week")
        if trending_data:
            return jsonify(trending_data['results'][:20])
        return jsonify([])
    except Exception as e:
        print(f"Error fetching trending: {e}")
        return jsonify([])

if __name__ == '__main__':
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY environment variable not set!")
        exit(1)
    
    print("H-TV API Server starting...")
    print(f"TMDB API Key loaded: {'✓' if TMDB_API_KEY else '✗'}")
    app.run(host='0.0.0.0', port=5000, debug=False)