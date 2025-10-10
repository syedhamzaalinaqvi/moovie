// TMDB API Configuration
const TMDB_API_KEY = "46d13701165988b5bb5fb4d123c0447e";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_BASE_URL = TMDB_BASE_URL;

<<<<<<< HEAD
// Global state object for managing application state
const state = {
    loadedMovies: [],
    filteredVideos: [],
    currentCategory: 'all',
    searchQuery: '',
    currentView: 'grid'
};

// Cache for TMDB API responses
const movieCache = new Map();

// DOM Elements manager
const elements = {
    videosGrid: null,
    categoryFilters: null,
    searchInput: null,
    searchBtn: null,
    videoModal: null,
    modalOverlay: null,
    modalClose: null,
    modalPlayer: null,
    modalTitle: null,
    modalDuration: null,
    modalViews: null,
    modalCategory: null,
    modalYear: null,
    modalStatus: null,
    modalRating: null,
    modalDescription: null,
    loginBtn: null,
    loginOverlay: null,
    loginModalClose: null,
    mobileMenuBtn: null,
    tmdbDetails: null,
    movieBudget: null,
    movieRevenue: null,
    movieDirector: null,
    movieGenres: null,
    trailerSection: null,
    trailerPlayer: null,
    castGrid: null
};

=======
// ===== FEATURED MOVIE CONFIGURATION =====
// Just change the TMDB ID below to feature any movie/series you want!

// Option 1: Use direct configuration
const FEATURED_MOVIE_CONFIG = {
   // tmdbId: 1061474,    // Superman (2025) - Change this ID to feature any movie you want!
    //type: "movie"       // "movie" or "tv"
tmdbId: 119051, type: "tv"  
};

// Option 2: Choose from pre-configured popular movies (uncomment one to use)
/*
const FEATURED_MOVIE_OPTIONS = {
    superman: { tmdbId: 1061474, type: "movie" },        // Superman (2025)
    venom: { tmdbId: 912649, type: "movie" },            // Venom: The Last Dance
    deadpool: { tmdbId: 533535, type: "movie" },         // Deadpool & Wolverine
    avatar: { tmdbId: 76600, type: "movie" },            // Avatar: The Way of Water
    batman: { tmdbId: 414906, type: "movie" },           // The Batman
    spiderman: { tmdbId: 634649, type: "movie" },        // Spider-Man: No Way Home
    wednesday: { tmdbId: 119051, type: "tv" },           // Wednesday (Netflix)
    stranger: { tmdbId: 66732, type: "tv" },             // Stranger Things
};

// To use pre-configured options, uncomment this line and comment the FEATURED_MOVIE_CONFIG above:
// const FEATURED_MOVIE_CONFIG = FEATURED_MOVIE_OPTIONS.superman;
*/

>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
// Simplified Video Data - Only tmdbId and embedCode needed
const videoData = [
    {
        id: 1,
        tmdbId: 1061474, // Superman 
        type: "movie",
<<<<<<< HEAD
        title: "Superman (2025)",
        download: "https://example.com/download/superman-2025", // Replace with actual download link
        embedCode: '<iframe src="https://mivalyo.com/embed/euzlk6l3jb90" frameborder="0" allowfullscreen></iframe>',
        //duration: "2h 30m",
        //views: "1.2M views",
        //category: "Action",
       // description: "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent."
=======
        download: "https://linkmake.in/view/yz4V4eXOnt",
        embedCode: `<IFRAME SRC="https://mivalyo.com/embed/euzlk6l3jb90" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
    },
    {
        id: 2,
        tmdbId: 1510251, //Murderbaad
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt37392885" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 3,
        tmdbId: 575265, // mission imposible 2025
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt9603208" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 4,
        tmdbId: 911430, // F1
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt16311594" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 5,
        tmdbId: 1241894, // Woodwalker 2024
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt30398905" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 6,
        tmdbId: 110492, // Peacemaker
        type: "tv",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt13146488" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 7,
        tmdbId: 1254624, // Night Always Comes
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt31567422" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 8,
        tmdbId: 227114, // Butterfly
        type: "tv",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt26672404" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 9,
        tmdbId: 1071585, // Megan 2.0
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt26342662" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 10,
        tmdbId: 1234821, //Jurassic world rebirth
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt31036941" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 11,
        tmdbId: 119051, //Wednesday
        type: "tv",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt13443470" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 12,
        tmdbId: 1148817, //Vena: Before 7 Days
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt28857853" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 13,
        tmdbId: 1106289, //Pickup 2025
        type: "movie",
        download: "#", // Add your download link here
        embedCode: `<iframe src="https://fuhho374key.com/play/tt30445556" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    
<<<<<<< HEAD
    {
        id: 14,
        tmdbId: 1035259, //Nakedgun 2025
        type: "movie",
        download: "https://example.com/download/superman-2025", // Replace with actual download link
        embedCode: `<IFRAME SRC="https://bingezove.com/embed/8mbjj9vs59hl" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
    },
=======

// DUBLICAT MOVIES ..............
  {
        id: 1,
        tmdbId: 1061474, // Superman 
        type: "movie",
        download: "https://example.com/download/superman",
        embedCode: `<IFRAME SRC="https://mivalyo.com/embed/euzlk6l3jb90" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
    },
    {
        id: 2,
        tmdbId: 1510251, //Murderbaad
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt37392885" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 3,
        tmdbId: 575265, // mission imposible 2025
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt9603208" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 4,
        tmdbId: 911430, // F1
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt16311594" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 5,
        tmdbId: 1241894, // Woodwalker 2024
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt30398905" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 6,
        tmdbId: 110492, // Peacemaker
        type: "tv",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt13146488" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 7,
        tmdbId: 1254624, // Night Always Comes
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt31567422" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 8,
        tmdbId: 227114, // Butterfly
        type: "tv",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt26672404" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 9,
        tmdbId: 1071585, // Megan 2.0
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt26342662" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 10,
        tmdbId: 1234821, //Jurassic world rebirth
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt31036941" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 11,
        tmdbId: 119051, //Wednesday
        type: "tv",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt13443470" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 12,
        tmdbId: 1148817, //Vena: Before 7 Days
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt28857853" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
    {
        id: 13,
        tmdbId: 1106289, //Pickup 2025
        type: "movie",
        embedCode: `<iframe src="https://fuhho374key.com/play/tt30445556" width="610" height="370" frameborder="0" allowfullscreen="allowfullscreen"></iframe>`,
    },
   




>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
];

// Cache for movie data to avoid repeated API calls
const movieCache = new Map();

// TMDB API Functions - Hybrid approach (backend or CORS proxy)
async function fetchTMDBData(tmdbId, type) {
    const cacheKey = `${type}_${tmdbId}`;
    if (movieCache.has(cacheKey)) {
        console.log('Using cached data for:', cacheKey);
        return movieCache.get(cacheKey);
    }
    
    try {
        // Fetch all required data in parallel
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
            fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`),
            fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
            fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
        ]);
        
        if (!detailsResponse.ok || !creditsResponse.ok || !videosResponse.ok) {
            throw new Error('Failed to fetch data from TMDB');
        }
        
        const details = await detailsResponse.json();
        const credits = await creditsResponse.json();
        const videos = await videosResponse.json();
        
        // Get director and writer from credits
        const director = credits.crew?.find(person => 
            person.job === 'Director' || person.department === 'Directing'
        )?.name || 'N/A';
        
        const writer = credits.crew?.find(person => 
            person.job === 'Writer' || person.department === 'Writing'
        )?.name || 'N/A';
        
        // Get main cast (first 5)
        const cast = credits.cast?.slice(0, 5).map(actor => actor.name) || [];
        
        // Find the first official trailer
        const trailer = videos.results?.find(video => 
            video.type === 'Trailer' && 
            video.site === 'YouTube' &&
            (video.official || video.name.toLowerCase().includes('trailer'))
        );
        
        // Format runtime
        const runtime = details.runtime || details.episode_run_time?.[0] || 0;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        const formattedRuntime = runtime > 0 ? `${hours}h ${minutes}m` : 'N/A';
        
        // Format the data
        const movieData = {
            id: details.id,
            title: details.title || details.name,
            original_title: details.original_title || details.original_name,
            overview: details.overview,
            release_date: details.release_date || details.first_air_date,
            release_year: new Date(details.release_date || details.first_air_date || '').getFullYear() || 'N/A',
            poster_path: details.poster_path ? `${TMDB_IMAGE_BASE_URL}${details.poster_path}` : null,
            backdrop_path: details.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${details.backdrop_path}` : null,
            vote_average: details.vote_average ? details.vote_average.toFixed(1) : 'N/A',
            vote_count: details.vote_count ? details.vote_count.toLocaleString() : '0',
            genres: details.genres?.map(g => g.name) || [],
            runtime: formattedRuntime,
            status: details.status,
            tagline: details.tagline,
            director: director,
            writer: writer,
            cast: cast,
            trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
            trailer_name: trailer?.name || 'Official Trailer',
            homepage: details.homepage,
            imdb_id: details.imdb_id,
            original_language: details.original_language
        };
        
        // Cache the result
        movieCache.set(cacheKey, movieData);
        return movieData;
        
    } catch (error) {
        console.error('Error fetching TMDB data:', error);
        return null;
    }

    try {
        const endpoint = type === "movie" ? "movie" : "tv";
        console.log(`Fetching TMDB data for ${endpoint} ID:`, tmdbId);

        // Fetch both movie details and videos in parallel
        const urls = [
            `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`,
            `${TMDB_BASE_URL}/${endpoint}/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=en-US`,
            `${TMDB_BASE_URL}/${endpoint}/${tmdbId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        ];

        console.log('API URLs:', urls);

        // Add error handling for each fetch
        const fetchWithTimeout = (url, options = {}) => {
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Request timeout')), 10000)
                )
            ]);
        };

        const [detailsResponse, creditsResponse, videosResponse] = await Promise.allSettled([
            fetchWithTimeout(urls[0]),
            fetchWithTimeout(urls[1]),
            fetchWithTimeout(urls[2])
        ]);

        // Process responses
        const processResponse = (response) => {
            if (response.status === 'fulfilled' && response.value.ok) {
                return response.value.json();
            }
            console.warn('Failed to fetch data:', response.reason || response.value?.statusText);
            return null;
        };

        const [details, credits, videos] = await Promise.all([
            processResponse(detailsResponse),
            processResponse(creditsResponse),
            processResponse(videosResponse)
        ]);

        if (!details) {
            throw new Error('Failed to fetch required movie details');
        }

        // Format the data to match our expected structure with enhanced data
        const formattedData = {
            id: details.id,
            title: details.title || details.name || 'Unknown Title',
            overview: details.overview || 'No description available',
            description: details.overview || 'No description available',
            release_date: details.release_date || details.first_air_date || '',
            release_year: (details.release_date || details.first_air_date)?.substring(0, 4) || 'Unknown',
            vote_average: details.vote_average || 0,
            rating: details.vote_average ? details.vote_average.toFixed(1) : 'N/A',
            runtime: details.runtime || null,
            number_of_seasons: details.number_of_seasons || null,
            genres: details.genres || [],
            production_countries: details.production_countries || [],
            spoken_languages: details.spoken_languages || [],
            original_language: details.original_language || '',
            poster_path: details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : null,
            backdrop_path: details.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
                : null,
            status: details.status || 'Unknown',
            tagline: details.tagline || '',
            homepage: details.homepage || '',
            budget: details.budget || 0,
            revenue: details.revenue || 0,
            production_companies: details.production_companies || [],
            directors: [],
            writers: [],
            creators: details.created_by?.map((c) => c.name) || [],
            cast: [],
            trailer: null,
        };

        // Extract crew information from credits if available
        if (credits?.crew) {
            formattedData.directors = credits.crew
                .filter((p) => p.job === 'Director')
                .map((p) => p.name)
                .filter(Boolean);
                
            formattedData.writers = credits.crew
                .filter((p) => ['Writer', 'Screenplay', 'Story'].includes(p.job))
                .map((p) => p.name)
                .filter(Boolean);
        }

        // Extract cast information (top 12 for better display)
        if (credits?.cast) {
            console.log('Processing cast data:', credits.cast.length, 'members found');
            formattedData.cast = credits.cast
                .slice(0, 12)
                .map((actor) => {
                    const profileUrl = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : null;
                    console.log('Cast member:', actor.name, 'Profile path:', actor.profile_path, 'Full URL:', profileUrl);
                    return {
                        name: actor.name || 'Unknown',
                        character: actor.character || 'N/A',
                        profile_path: profileUrl,
                    };
                });
        }

        // Find trailer (prioritize official trailers)
        if (videos?.results) {
            console.log('Video results found:', videos.results.length, 'for', details.title || details.name);
            
            // Only include YouTube trailers and teasers
            const trailers = videos.results.filter(v => {
                return v.site === 'YouTube' && v.key && ['Trailer', 'Teaser'].includes(v.type);
            });
            
            console.log('Filtered trailers:', trailers.length);
            
            if (trailers.length > 0) {
                // First try to find an official trailer
                let trailer = trailers.find(v => 
                    v.name.toLowerCase().includes('official trailer')
                ) || trailers.find(v =>
                    v.name.toLowerCase().includes('trailer') || 
                    v.name.toLowerCase().includes('official teaser')
                ) || trailers[0]; // Fallback to first trailer
                
                if (trailer) {
                    console.log('Selected trailer:', trailer.name, trailer.key);
                    formattedData.trailer = `https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`;
                }
            }
        }

        console.log('Formatted TMDB data:', formattedData);
        
        // Cache the result
        movieCache.set(cacheKey, formattedData);
        return formattedData;
    } catch (error) {
        console.error('Error in fetchTMDBData:', error);
        return null;
    }
}

async function fetchTrendingContent() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching trending data:", error);
        return [];
    }
}

function formatMoney(amount) {
    if (amount >= 1000000000) {
        return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}K`;
    } else {
        return amount > 0 ? `$${amount}` : "Not disclosed";
    }
}

function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Live TV Data
const liveTvChannels = [
    
    {
        id: "tv1",
<<<<<<< HEAD
        name: "A Sports",
        channel: "Sports",
        thumbnail: "https://yt3.googleusercontent.com/7ko4g0YM7E49IIbhfMhYJOWGTCIAuASHcPXRsBPWMOiBIuM0tBHe2Z9OVkzO1vVSxGSDZ1f1Sg=s900-c-k-c0x00ffffff-no-rj",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Flive.streamly.com.co%3A8081%2Fpk-Asports%2Findex.m3u8" width="800px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
    },
    {
        id: "tv2",
        name: "Sports",
        channel: "Ten Sports",
        thumbnail: "https://yt3.googleusercontent.com/__RrXmYkqMZ3RSnZGl3SPijP6NBFETSNwiannZ5WjQMU0nhne3ET9N35YZGY2xde2AEYB4gF=s900-c-k-c0x00ffffff-no-rj",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Flive.streamly.com.co%3A8081%2Fpk-tensports%2Findex.m3u8" width="800px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
=======
        name: "Asia Cup Live",
        channel: "Sports",
        thumbnail: "https://d3pt6y87jk0q7u.cloudfront.net/cpanel/client_14/2025/images/actual_0Hf5WBiD4q1756899512.jpg",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Fmuc200.myluck1.top%3A8088%2Flive%2Fwebcrichindi%2Fplaylist.m3u8%3Fid%3D119771%26pk%3Dbf1df8f935edbacdb236923c0f6bc9aa35c88232b92b8a6bfad9a1b28897d184a3eef35ea575d84b1e9040edb9cb1c2f6562a6dfee21816d5c130924a580b55b" width="600px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
    },
    {
        id: "tv2",
        name: "Asia Cup Myco ",
        channel: "Sports",
        thumbnail: "https://d3pt6y87jk0q7u.cloudfront.net/cpanel/client_14/2025/images/actual_0Hf5WBiD4q1756899512.jpg",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Fml-pull-rtmp-pk1.myco.io%2FAsiaCupMain%2Fhls%2Findex.m3u8&title=Asia%20Cup%202025" width="800px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
    },
    {
        id: "tv3",
        name: "ARY NEWS",
        channel: "News",
        thumbnail: "https://canvas.tamashaweb.com/jazzlive/uploads/channels/1707716722.webp?id=20240917093633",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Fcdn24lhr.tamashaweb.com%3A8087%2Fjazzauth%2FARYnews-abr%2Fplaylist.m3u8%3FwmsAuthSign%3Dc2VydmVyX3RpbWU9OS85LzIwMjUgMTE6NTY6MTAgQU0maGFzaF92YWx1ZT1oVGRRSkRyTWZXNWppZTdGREtpT0xRPT0mdmFsaWRtaW51dGVzPTYw%3A8087%2Fjazzauth%2FARYnews-abr%2Fplaylist.m3u8&title=ARY%20NEWS" width="800px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
    },
    {
        id: "tv4",
        name: "8XM HD",
        channel: "Music",
        thumbnail: "https://canvas.tamashaweb.com/jazzlive/uploads/channels/logo/8xm-live.webp?id=80",
        embedCode: `<iframe src="https://bradm.ax/build/202410/09/10dddbda311d7cd7ad4cb3ee7ffaaa441bf5a620/index.html?mediaUrl=https%3A%2F%2Fcdn21lhr.tamashaweb.com%3A8087%2Fjazzauth%2F8xm-abr%2Fplaylist.m3u8%3FwmsAuthSign%3Dc2VydmVyX3RpbWU9OS85LzIwMjUgMTI6MzQ6MjMgUE0maGFzaF92YWx1ZT1XajJJMVkyRzFheFdnUDdTOHFRWkdRPT0mdmFsaWRtaW51dGVzPTYw%3A8087%2Fjazzauth%2F8xm-abr%2Fplaylist.m3u8&title=8XM" width="800px" height="400px" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
    },
    {
        id: "tv5",
        name: "Comedy Central",
        channel: "Comedy HD",
        thumbnail: "https://img.youtube.com/vi/DLzxrzFCyOs/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/DLzxrzFCyOs" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: "tv6",
        name: "Discovery Science",
        channel: "Discovery HD",
        thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/PkZNo7MFNFg" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
];

// Global state variables
const appState = {
    loadedMovies: [],
    filteredVideos: [],
    currentCategory: 'all',
    searchQuery: '',
    currentView: 'grid'
};

<<<<<<< HEAD
// Initialize DOM elements after document is loaded
let videosGrid, categoryFilters, searchInput, searchBtn, videoModal, 
    modalOverlay, modalClose, modalPlayer, modalTitle, modalDuration,
    modalViews, modalCategory, modalYear, modalStatus, modalRating, modalDescription,
    tmdbDetails, movieBudget, movieRevenue, movieDirector, movieGenres,
    trailerSection, trailerPlayer, castGrid;
=======
// Load more functionality variables
let displayedMovies = 16; // Show 16 movies initially
const moviesPerLoad = 16; // Load 16 more movies when "Load More" is clicked

// Page memory functionality
const PAGE_MEMORY_KEY = 'htv-page-state';
let pageMemory = {
    displayedMovies: 16,
    scrollPosition: 0,
    currentCategory: 'all',
    searchQuery: ''
};

// DOM Elements
const videosGrid = document.getElementById("videosGrid");
const categoryFilters = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const videoModal = document.getElementById("videoModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalPlayer = document.getElementById("modalPlayer");
const modalTitle = document.getElementById("modalTitle");
const modalDuration = document.getElementById("modalDuration");
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
const modalViews = document.getElementById("modalViews");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const loginOverlay = document.getElementById("loginOverlay");
const loginModalClose = document.getElementById("loginModalClose");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const viewBtns = document.querySelectorAll(".view-btn");

<<<<<<< HEAD
// Initialize variables
let loadedMovies = [];
let filteredVideos = [];
const videosGrid = document.getElementById('videosGrid');
const categoryFilters = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const loginBtn = document.getElementById('loginBtn');
const loginOverlay = document.getElementById('loginOverlay');
const loginModalClose = document.getElementById('loginModalClose');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Initialize the application
document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("Starting application initialization...");
        
        // Initialize DOM elements
        elements.init();
        
        // Initialize with static data first
        state.loadedMovies = [...videoData];
        state.filteredVideos = [...videoData];
        
        // Initial render with static data
        renderVideos();
        console.log("Initial render completed with static data");
        
        // Setup all event listeners
        setupEventListeners();
        console.log("Event listeners set up");
        
        // Load all dynamic content
        await Promise.all([
            loadMoviesWithTMDBData(),
            loadLiveTvSlider(),
            loadTrendingSlider()
        ]);
        
        console.log("H-TV Video Streaming Platform initialized successfully!");
    } catch (error) {
        console.error("Error during initialization:", error);
    }
=======
// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");

// Load Featured Movie
async function loadFeaturedMovie() {
    console.log('Loading featured movie with TMDB ID:', FEATURED_MOVIE_CONFIG.tmdbId);
    
    try {
        // Fetch TMDB data for featured movie
        const movieData = await fetchTMDBData(FEATURED_MOVIE_CONFIG.tmdbId, FEATURED_MOVIE_CONFIG.type);
        
        if (movieData) {
            // Update featured section with dynamic data
            const featuredTitle = document.querySelector('.featured-title');
            const featuredDescription = document.querySelector('.featured-description');
            const featuredDuration = document.querySelector('.duration');
            const featuredViews = document.querySelector('.views');
            const featuredCategory = document.querySelector('.category');
            const featuredPlayer = document.getElementById('featuredPlayer');
            const watchNowBtn = document.querySelectorAll('.featured-section .login-btn')[0];
            
            // Update content
            if (featuredTitle) {
                featuredTitle.textContent = `${movieData.title} (${movieData.release_year})`;
            }
            
            if (featuredDescription) {
                featuredDescription.textContent = movieData.overview || movieData.description;
            }
            
            if (featuredDuration && movieData.runtime) {
                const hours = Math.floor(movieData.runtime / 60);
                const minutes = movieData.runtime % 60;
                featuredDuration.textContent = `${hours}h ${minutes}m`;
            } else if (featuredDuration && movieData.number_of_seasons) {
                featuredDuration.textContent = `${movieData.number_of_seasons} Season${movieData.number_of_seasons > 1 ? 's' : ''}`;
            }
            
            if (featuredViews) {
                featuredViews.textContent = `⭐ ${movieData.rating} TMDB`;
            }
            
            if (featuredCategory && movieData.genres && movieData.genres.length > 0) {
                featuredCategory.textContent = movieData.genres[0].name;
            }
            
            // Update trailer if available
            if (featuredPlayer && movieData.trailer) {
                // Extract video ID from trailer URL
                let videoId = null;
                if (movieData.trailer.includes('youtube.com/embed/')) {
                    videoId = movieData.trailer.split('/embed/')[1]?.split('?')[0];
                } else if (movieData.trailer.includes('youtube.com/watch')) {
                    videoId = new URL(movieData.trailer).searchParams.get('v');
                } else if (movieData.trailer.includes('youtu.be/')) {
                    videoId = movieData.trailer.split('youtu.be/')[1]?.split('?')[0];
                }
                
                if (videoId) {
                    featuredPlayer.src = `https://www.youtube.com/embed/${videoId}?si=qm5j12OBg51YoIMN&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
                }
            }
            
            // Make Watch Now button clickable
            if (watchNowBtn) {
                watchNowBtn.onclick = () => {
                    // Create featured movie object for modal
                    const featuredMovieForModal = {
                        id: `featured_${FEATURED_MOVIE_CONFIG.tmdbId}`,
                        tmdbId: FEATURED_MOVIE_CONFIG.tmdbId,
                        type: FEATURED_MOVIE_CONFIG.type,
                        title: movieData.title,
                        description: movieData.overview || movieData.description,
                        views: `⭐ ${movieData.rating}`,
                        duration: movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m` : 'N/A',
                        category: movieData.genres?.[0]?.name?.toLowerCase() || 'unknown',
                        tmdbData: movieData,
                        embedCode: movieData.trailer 
                            ? `<iframe src="${movieData.trailer}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`
                            : '<div style="text-align: center; padding: 50px; color: var(--text-secondary);">Trailer not available for this content</div>',
                    };
                    
                    openVideoModal(featuredMovieForModal);
                };
            }
            
            console.log('Featured movie loaded successfully:', movieData.title);
        } else {
            console.error('Failed to load featured movie data');
        }
    } catch (error) {
        console.error('Error loading featured movie:', error);
    }
}

// Page memory functions
function savePageState() {
    pageMemory.displayedMovies = displayedMovies;
    pageMemory.scrollPosition = window.scrollY;
    pageMemory.currentCategory = currentCategory;
    pageMemory.searchQuery = searchQuery;
    
    try {
        localStorage.setItem(PAGE_MEMORY_KEY, JSON.stringify(pageMemory));
        console.log('Page state saved:', pageMemory);
    } catch (error) {
        console.warn('Could not save page state:', error);
    }
}

function loadPageState() {
    try {
        const saved = localStorage.getItem(PAGE_MEMORY_KEY);
        if (saved) {
            pageMemory = JSON.parse(saved);
            displayedMovies = pageMemory.displayedMovies || 16;
            currentCategory = pageMemory.currentCategory || 'all';
            searchQuery = pageMemory.searchQuery || '';
            
            console.log('Page state loaded:', pageMemory);
            return true;
        }
    } catch (error) {
        console.warn('Could not load page state:', error);
    }
    return false;
}

function clearPageState() {
    try {
        localStorage.removeItem(PAGE_MEMORY_KEY);
        console.log('Page state cleared');
    } catch (error) {
        console.warn('Could not clear page state:', error);
    }
}

function restorePageState() {
    console.log('Restoring page state...');
    
    // Restore search input
    if (searchInput && pageMemory.searchQuery) {
        searchInput.value = pageMemory.searchQuery;
        console.log('Restored search query:', pageMemory.searchQuery);
    }
    
    // Restore active category filter
    if (pageMemory.currentCategory !== 'all') {
        const categoryBtn = document.querySelector(`[data-category="${pageMemory.currentCategory}"]`);
        if (categoryBtn) {
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            categoryBtn.classList.add('active');
            console.log('Restored category filter:', pageMemory.currentCategory);
        }
    }
    
    // Apply filters and render with restored movie count
    filterVideos(true); // Pass true to indicate we're restoring state
    
    // Restore scroll position after a delay to ensure content is loaded
    setTimeout(() => {
        if (pageMemory.scrollPosition > 0) {
            window.scrollTo({
                top: pageMemory.scrollPosition,
                behavior: 'smooth'
            });
            console.log('Restored scroll position:', pageMemory.scrollPosition);
        }
    }, 500);
}

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM Content Loaded - Starting H-TV initialization...');
    
    // Load previous page state
    const hasState = loadPageState();
    
    // Show loading indicator
    if (videosGrid) {
        videosGrid.innerHTML = '<div style="text-align: center; padding: 60px; color: var(--text-secondary);"><h3>Loading movies...</h3><p>Fetching data from TMDB...</p></div>';
    }
    
    // Initialize app
    setTimeout(async () => {
        try {
            await loadFeaturedMovie();      // Load featured movie first
            await loadMoviesWithTMDBData(); // Then load other movies
            setupEventListeners();
            loadLiveTvSlider();
            loadTrendingSlider();
            
            // Restore page state if available
            if (hasState) {
                restorePageState();
            }
            
            console.log('H-TV initialization complete!');
        } catch (error) {
            console.error('Error during initialization:', error);
            if (videosGrid) {
                videosGrid.innerHTML = '<div style="text-align: center; padding: 60px; color: red;"><h3>Loading Error</h3><p>Please refresh the page to try again.</p></div>';
            }
        }
    }, 100);
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
});

// Core rendering functions
function renderVideos() {
    if (!elements.videosGrid) return;
    
    elements.videosGrid.innerHTML = "";

    if (state.filteredVideos.length === 0) {
        elements.videosGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <h3>No videos found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    state.filteredVideos.forEach((video) => {
        const videoCard = createVideoCard(video);
        elements.videosGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const tmdbData = video.tmdbData || {};
    const thumbnail = tmdbData.poster_path || 'path_to_default_image.jpg';
    const title = tmdbData.title || video.title;
    const rating = tmdbData.vote_average || 'N/A';

    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${thumbnail}" alt="${title}" loading="lazy">
            <div class="video-rating">⭐ ${rating}</div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${title}</h3>
        </div>
    `;

    card.addEventListener('click', () => openVideoModal(video));
    return card;
}

function handleSearch() {
    if (!elements.searchInput) return;
    state.searchQuery = elements.searchInput.value.toLowerCase().trim();
    filterVideos();
}

function filterVideos() {
    state.filteredVideos = state.loadedMovies.filter((video) => {
        const matchesCategory =
            state.currentCategory === "all" || 
            (video.tmdbData?.genres || []).map(g => g.toLowerCase()).includes(state.currentCategory);
            
        const matchesSearch =
            !state.searchQuery ||
            video.title.toLowerCase().includes(state.searchQuery) ||
            (video.description || '').toLowerCase().includes(state.searchQuery);

        return matchesCategory && matchesSearch;
    });

    renderVideos();
}

// Load movies with TMDB data
async function loadMoviesWithTMDBData() {
<<<<<<< HEAD
    const updatedMovies = [];
=======
    console.log('Starting to load movies with TMDB data...');
    loadedMovies = [];
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37

    for (const video of videoData) {
        try {
            console.log(`Loading movie ${video.id} - TMDB ID: ${video.tmdbId}`);
            const tmdbData = await fetchTMDBData(video.tmdbId, video.type);
            if (tmdbData) {
                const movieWithData = {
                    ...video,
                    title: tmdbData.title,
                    duration: tmdbData.runtime ? `${Math.floor(tmdbData.runtime / 60)}h ${tmdbData.runtime % 60}m` : 
                             tmdbData.number_of_seasons ? `${tmdbData.number_of_seasons} seasons` : "Unknown",
                    views: `${tmdbData.rating}⭐`,
                    category: (tmdbData.genres && tmdbData.genres.length > 0) ? tmdbData.genres[0].name.toLowerCase() : "drama",
                    thumbnail: tmdbData.poster_path,
                    description: tmdbData.overview || tmdbData.description,
                    tmdbData: tmdbData,
                };
<<<<<<< HEAD
                updatedMovies.push(movieWithData);
=======
                loadedMovies.push(movieWithData);
                console.log(`Successfully loaded: ${tmdbData.title}`);
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
            } else {
                console.warn(`No TMDB data for movie ${video.id}, using fallback`);
                // Fallback if TMDB data fails
                updatedMovies.push({
                    ...video,
                    title: `Movie ${video.id}`,
                    duration: "Unknown",
                    views: "Loading...",
                    category: "unknown",
                    thumbnail:
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==",
                    description: "Failed to load movie details",
                });
            }
        } catch (error) {
            console.error(`Error loading movie ${video.id}:`, error);
            // Add fallback movie anyway
            loadedMovies.push({
                ...video,
                title: `Movie ${video.id}`,
                duration: "Unknown",
                views: "Error",
                category: "unknown",
                thumbnail:
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==",
                description: "Failed to load movie details",
            });
        }
    }

<<<<<<< HEAD
    // Update loadedMovies and filteredVideos
    loadedMovies = updatedMovies.length > 0 ? updatedMovies : [...videoData];
=======
    console.log(`Loaded ${loadedMovies.length} movies total`);
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
    filteredVideos = [...loadedMovies];
    renderVideos();
}

// Setup Event Listeners
function setupEventListeners() {
    // Category filters
    categoryFilters.forEach((btn) => {
        btn.addEventListener("click", handleCategoryFilter);
    });

    // Search functionality
    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent page scroll on Enter
            handleSearch();
        }
        // Prevent page scrolling on any key press in search
        e.stopPropagation();
    });
    searchInput.addEventListener("input", function(e) {
        e.stopPropagation(); // Prevent bubbling that might cause scrolling
        handleSearch();
    });
    
    // Prevent search input from causing page scroll
    searchInput.addEventListener("focus", function(e) {
        e.stopPropagation();
    });
    searchInput.addEventListener("blur", function(e) {
        e.stopPropagation();
    });

    // Modal functionality
    modalOverlay.addEventListener("click", closeVideoModal);
    modalClose.addEventListener("click", closeVideoModal);

    // Login modal
    loginBtn.addEventListener("click", openLoginModal);
    loginOverlay.addEventListener("click", closeLoginModal);
    loginModalClose.addEventListener("click", closeLoginModal);

    // Mobile menu
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);

    // Navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", handleNavigation);
    });

    // View toggle buttons
    viewBtns.forEach((btn) => {
        btn.addEventListener("click", handleViewToggle);
    });

    // Close modal on escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeVideoModal();
            closeLoginModal();
        }
    });

    // Login form submission
    const loginForm = document.querySelector(".login-form form");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
    
    // Slider navigation for Trending and Live TV
    setupSliders();
    
    // Scroll to top button functionality
    setupScrollToTop();
    
    // Page state saving on scroll (throttled)
    let scrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            savePageState();
        }, 500); // Save state 500ms after user stops scrolling
    });
    
    // Save state when user navigates away
    window.addEventListener('beforeunload', () => {
        savePageState();
    });
}

// Render Videos
function renderVideos() {
<<<<<<< HEAD
    if (!elements.videosGrid) return;
    
    elements.videosGrid.innerHTML = "";

    if (state.filteredVideos.length === 0) {
        elements.videosGrid.innerHTML = `
=======
    console.log('Rendering videos...', filteredVideos.length, 'videos to render');
    
    if (!videosGrid) {
        console.error('videosGrid element not found!');
        return;
    }
    
    videosGrid.innerHTML = "";

    if (filteredVideos.length === 0) {
        console.log('No videos to display');
        videosGrid.innerHTML = `
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <h3>No videos found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

<<<<<<< HEAD
    state.filteredVideos.forEach((video) => {
        const videoCard = createVideoCard(video);
        elements.videosGrid.appendChild(videoCard);
=======
    // Show only the number of movies specified by displayedMovies
    const moviesToShow = filteredVideos.slice(0, displayedMovies);
    
    moviesToShow.forEach((video, index) => {
        try {
            console.log(`Rendering video ${index + 1}: ${video.title}`);
            const videoCard = createVideoCard(video);
            videosGrid.appendChild(videoCard);
        } catch (error) {
            console.error(`Error rendering video ${index + 1}:`, error, video);
        }
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
    });
    
    // Add Load More button if there are more movies to show
    if (displayedMovies < filteredVideos.length) {
        const loadMoreContainer = document.createElement("div");
        loadMoreContainer.className = "load-more-container";
        
        const loadMoreBtn = document.createElement("button");
        loadMoreBtn.className = "load-more-btn";
        loadMoreBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="12" cy="21" r="3"></circle>
                <circle cx="12" cy="3" r="3"></circle>
            </svg>
            <span>Load More Movies (${filteredVideos.length - displayedMovies} remaining)</span>
        `;
        
        loadMoreBtn.onclick = () => {
            // Add loading state
            loadMoreBtn.classList.add('loading');
            loadMoreBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <circle cx="12" cy="21" r="3"></circle>
                    <circle cx="12" cy="3" r="3"></circle>
                </svg>
                <span>Loading more movies...</span>
            `;
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                displayedMovies += moviesPerLoad;
                renderVideos();
                
                // Save page state after loading more
                savePageState();
                
                // Smooth scroll to the newly loaded content
                setTimeout(() => {
                    const newlyLoadedCards = videosGrid.querySelectorAll('.video-card');
                    if (newlyLoadedCards.length > displayedMovies - moviesPerLoad) {
                        const targetCard = newlyLoadedCards[displayedMovies - moviesPerLoad];
                        if (targetCard) {
                            targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }, 100);
            }, 500); // Small delay to show loading state
        };
        
        loadMoreContainer.appendChild(loadMoreBtn);
        videosGrid.appendChild(loadMoreContainer);
    }
    
    console.log(`Finished rendering videos - Showing ${moviesToShow.length} of ${filteredVideos.length} movies`);
}

// Create Video Card
function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";
    
<<<<<<< HEAD
    // Get TMDB data if available
    const tmdbData = video.tmdbData || {};
    const thumbnail = tmdbData.poster_path || video.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    const title = tmdbData.title || video.title || 'Untitled';
    const year = tmdbData.release_year || new Date(video.release_date || '').getFullYear() || '';
    const rating = tmdbData.vote_average ? `${tmdbData.vote_average.toFixed(1)}` : 'N/A';
    const runtime = tmdbData.runtime || '';
    const category = (tmdbData.genres && tmdbData.genres[0]) || video.category || '';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${thumbnail}" alt="${title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            ${runtime ? `<div class="video-duration">${runtime}</div>` : ''}
            ${rating ? `<div class="video-rating">${rating}</div>` : ''}
=======
    // Normalize category name for CSS class (remove special characters and spaces)
    const categoryClass = video.category ? video.category.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : 'unknown';
    
    // Debug: Log category information
    console.log(`Creating card for: ${video.title}, Category: ${video.category}, CSS Class: ${categoryClass}`);
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            <div class="video-duration">${video.duration}</div>
            <span class="video-category ${categoryClass}">${video.category}</span>
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
        </div>
        <div class="video-info">
            <h3 class="video-title" title="${title}">${title}</h3>
            <div class="video-meta">
<<<<<<< HEAD
                ${year ? `<span class="video-year">${year}</span>` : ''}
                ${rating ? `<span class="video-rating">⭐ ${rating}</span>` : ''}
                ${category ? `<span class="video-category">${category}</span>` : ''}
=======
                <span class="video-views">${video.views}</span>
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
            </div>
        </div>
    `;

    card.addEventListener("click", () => openVideoModal(video));
    return card;
}

// Handle Category Filter
function handleCategoryFilter(e) {
    const selectedCategory = e.target.dataset.category;

    // Update active filter button
    categoryFilters.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    currentCategory = selectedCategory;
    filterVideos();
}

// Handle Search
function handleSearch() {
    searchQuery = searchInput.value.toLowerCase().trim();
    filterVideos();
}

// Filter Videos
function filterVideos(isRestoringState = false) {
    filteredVideos = loadedMovies.filter((video) => {
        const matchesCategory =
            currentCategory === "all" || video.category === currentCategory;
        const matchesSearch =
            searchQuery === "" ||
            video.title.toLowerCase().includes(searchQuery) ||
            video.description.toLowerCase().includes(searchQuery) ||
            video.category.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    // Only reset displayed movies count when not restoring state
    if (!isRestoringState) {
        displayedMovies = 16;
        savePageState(); // Save state when user actively filters
    }
    
    renderVideos();
}

// Open Video Modal
async function openVideoModal(video) {
    if (!video) {
        console.error('No video data provided');
        return;
    }

    console.log('Opening video modal for:', video);
    
<<<<<<< HEAD
    const modalVideo = document.querySelector(".modal-video");
    const modalPlayer = document.getElementById('modalPlayer');
    const modalInfo = document.querySelector(".modal-info");
    
    // Set a loading state
    modalVideo.innerHTML = `
        <div class="loading-container" style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <div class="spinner"></div>
            <p>Loading content...</p>
        </div>`;
        
    // Ensure modal is visible
    document.getElementById('videoModal').classList.add('active');
=======
    // Get all modal elements
    const modalElements = {
        video: document.querySelector(".modal-video"),
        title: document.getElementById("modalTitle"),
        duration: document.getElementById("modalDuration"),
        views: document.getElementById("modalViews"),
        category: document.getElementById("modalCategory"),
        description: document.getElementById("modalDescription"),
        year: document.getElementById("modalYear"),
        status: document.getElementById("modalStatus"),
        rating: document.getElementById("modalRating")
    };
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37

    try {
        // Set up iframe sizing handler
        const setupIframeStyles = () => {
            const iframes = modalElements.video.getElementsByTagName('iframe');
            for (let iframe of iframes) {
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
            }
        };

        // Add the video with proper responsive container (removed old download button)
        modalElements.video.innerHTML = `
            <div class="modal-content-wrapper">
                <div class="video-container" style="position: relative; width: 100%; padding-bottom: 56.25%; margin-bottom: 15px; background: #000;">
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                        ${video.embedCode}
                    </div>
                </div>
            </div>
        `;

        // Set up iframe styles after a small delay
        setTimeout(setupIframeStyles, 100);

        // Try to get TMDB data if not already available
        let movieData = video.tmdbData;
        
        if ((!movieData || Object.keys(movieData).length === 0) && video.tmdbId) {
            console.log('Fetching TMDB data for ID:', video.tmdbId, 'Type:', video.type);
            movieData = await fetchTMDBData(video.tmdbId, video.type || 'movie');
            video.tmdbData = movieData;
        }

        if (movieData) {
            // Update video properties
            video.title = movieData.title || video.title;
            video.duration = movieData.runtime || video.duration;
            video.views = `⭐ ${movieData.rating || 'N/A'}`;
            video.category = (movieData.genres && movieData.genres.length > 0 && movieData.genres[0].name) 
                           ? movieData.genres[0].name.toLowerCase() 
                           : video.category || 'drama';
            video.description = movieData.overview || movieData.description || video.description;

            // Update meta information
            if (modalElements.year) modalElements.year.textContent = movieData.release_year || "Unknown";
            if (modalElements.status) modalElements.status.textContent = movieData.status || "";
            if (modalElements.rating) modalElements.rating.textContent = movieData.rating ? `⭐ ${movieData.rating}` : "";

            // Display TMDB details
            displayTMDBDetails(movieData, video.type || 'movie', video);
        }
<<<<<<< HEAD
        
        // Update modal content with the embed code
        if (video.embedCode) {
            // Check if it's an iframe
            if (video.embedCode.includes('<iframe')) {
                // Extract src from embedCode
                const srcMatch = video.embedCode.match(/src=["'](.*?)["']/);
                if (srcMatch && srcMatch[1]) {
                    modalPlayer.src = srcMatch[1];
                    modalPlayer.style.display = 'block';
                    modalVideo.innerHTML = '';
                    modalVideo.appendChild(modalPlayer);
                } else {
                    // If we can't extract src, use the full embed code
                    modalVideo.innerHTML = video.embedCode;
                }
            } else {
                // If it's not an iframe, use the full embed code
                modalVideo.innerHTML = video.embedCode;
            }
        }

        // Create action buttons container
        const actionButtons = document.createElement('div');
        actionButtons.className = 'modal-actions';
        
        // Add Watch Now button
        const watchNowBtn = document.createElement('button');
        watchNowBtn.className = 'action-btn watch-now';
        watchNowBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Watch Now
        `;
        watchNowBtn.onclick = () => {
            document.querySelector('.modal-video iframe')?.scrollIntoView({ behavior: 'smooth' });
        };
        
        // Add Download button if download link exists
        if (video.download && video.download !== '#') {
            const downloadBtn = document.createElement('a');
            downloadBtn.href = video.download;
            downloadBtn.className = 'action-btn download';
            downloadBtn.download = video.title ? `${video.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4` : 'download';
            downloadBtn.target = '_blank';
            downloadBtn.rel = 'noopener noreferrer';
            downloadBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
            `;
            actionButtons.prepend(downloadBtn); // Add download button first
        }
        
        actionButtons.appendChild(watchNowBtn);
        
        // Clear previous action buttons if any
        const existingActions = modalInfo.querySelector('.modal-actions');
        if (existingActions) {
            existingActions.remove();
        }
        
        // Get all modal elements
        const modalTitle = document.getElementById('modalTitle');
        const modalYear = document.getElementById('modalYear');
        const modalStatus = document.getElementById('modalStatus');
        const modalRating = document.getElementById('modalRating');
        const modalRuntime = document.getElementById('modalRuntime');
        const modalDirector = document.getElementById('movieDirector');
        const modalWriter = document.getElementById('movieWriter');
        const modalGenres = document.getElementById('movieGenres');
        const modalDescription = document.getElementById('modalDescription');
        const modalCast = document.getElementById('castGrid');
        
        // Insert action buttons after the title if it exists
        if (modalTitle && modalTitle.parentNode) {
            modalTitle.parentNode.insertBefore(actionButtons, modalTitle.nextSibling);
        }
        
        // Update modal UI with video data
        if (modalTitle) modalTitle.textContent = movieData.title || video.title || "";
        if (modalYear) modalYear.textContent = movieData.release_year || new Date(video.release_date || '').getFullYear() || "N/A";
        if (modalStatus) modalStatus.textContent = movieData.status || "";
        if (modalRating) modalRating.textContent = movieData.vote_average ? `⭐ ${movieData.vote_average}` : "N/A";
        
        // Format and display runtime
        if (modalRuntime) {
            const runtime = movieData.runtime || (video.duration ? parseInt(video.duration) : 0);
            if (runtime > 0) {
                const hours = Math.floor(runtime / 60);
                const minutes = runtime % 60;
                modalRuntime.textContent = `${hours}h ${minutes}m`;
            } else {
                modalRuntime.textContent = "N/A";
            }
        }
        if (modalDirector) modalDirector.textContent = movieData.director || "N/A";
        if (modalWriter) modalWriter.textContent = movieData.writer || "N/A";
        if (modalGenres) modalGenres.textContent = movieData.genres?.join(', ') || "N/A";
        if (modalDescription) modalDescription.textContent = movieData.overview || video.description || "No description available.";
        
        // Update cast
        if (modalCast && movieData.cast) {
            modalCast.innerHTML = movieData.cast.map(actor => `
                <div class="cast-member">
                    <div class="cast-photo"></div>
                    <div class="cast-name">${actor}</div>
                </div>
            `).join('');
        }

        // Display the TMDB details section with trailer
        displayTMDBDetails(movieData, video.type || 'movie');
        
        // Show trailer section if available
        if (movieData.trailer) {
            const trailerSection = document.getElementById("trailerSection");
            const trailerPlayer = document.getElementById("trailerPlayer");
            if (trailerSection && trailerPlayer) {
                trailerSection.style.display = 'block';
                trailerPlayer.innerHTML = `
                    <iframe 
                        src="${movieData.trailer}" 
                        title="${movieData.trailer_name}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>`;
            }
        } else {
            // Hide or clear TMDB details section if no data
            const tmdbDetails = document.getElementById("tmdbDetails");
            if (tmdbDetails) tmdbDetails.innerHTML = '';
=======

        // Clear the basic modal info since we'll show detailed TMDB info instead
        modalElements.title.textContent = "";
        modalElements.duration.textContent = "";
        modalElements.views.textContent = "";
        modalElements.category.textContent = "";
        modalElements.description.textContent = "";

        // Add video container iframe styles if not already added
        if (!document.getElementById('video-container-styles')) {
            const style = document.createElement('style');
            style.id = 'video-container-styles';
            style.textContent = `
                .video-container iframe {
                    border: none;
                    border-radius: 8px;
                }
            `;
            document.head.appendChild(style);
>>>>>>> 97f8b0ea88b1ee3b866c6d672323b0335a112a37
        }

        // Show modal
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }

    } catch (error) {
        console.error('Error in openVideoModal:', error);
        if (modalElements?.video) {
            modalElements.video.innerHTML = `
                <div style="text-align: center; padding: 50px; color: var(--error-color);">
                    <p>Failed to load content. Please try again later.</p>
                    <button onclick="openVideoModal(${JSON.stringify(video).replace(/"/g, '&quot;')})" 
                            style="margin-top: 15px; padding: 8px 16px; background: var(--primary-color); border: none; border-radius: 4px; color: white; cursor: pointer;">
                        Retry
                    </button>
                </div>`;
        }
    }
}
// Display TMDB details
function displayTMDBDetails(movieData, type, video) {
    console.log('Displaying TMDB details for:', movieData.title || 'Unknown');
    console.log('Trailer available:', movieData.trailer ? 'Yes' : 'No');
    
    const tmdbDetails = document.getElementById("tmdbDetails");
    if (!tmdbDetails) {
        console.error('TMDB details container not found');
        return;
    }
    
    // Make sure the details section is visible
    tmdbDetails.style.display = "block";
    
    try {
        // Create safe strings to prevent XSS
        const safeTitle = movieData.title ? movieData.title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : 'Unknown Title';
        const safeReleaseYear = movieData.release_year ? movieData.release_year : '';
        const safeDescription = movieData.overview ? movieData.overview.replace(/[\"\']/g, '') : 'No description available';
        
        // Create new responsive download button if download link exists
        const downloadButton = video && video.download ? `
            <div class="download-section">
                <button onclick="handleDownload('${safeTitle}', '${safeReleaseYear}', '${video.download}')" 
                        class="new-download-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Download ${movieData.title || 'Movie'}</span>
                </button>
            </div>` : '';
        
        // Create compact movie info
        let compactInfoHTML = createCompactMovieInfo(movieData, type);
        
        // Create cast section
        let castHTML = createCastSection(movieData);
        
        // Create trailer section
        let trailerHTML = createTrailerSection(movieData);
        
        // Combine all sections with new layout
        const htmlContent = `
            <div class="modern-movie-header">
                <h2 class="movie-title">${safeTitle} <span class="year-badge">${safeReleaseYear}</span></h2>
                ${movieData.tagline ? `<p class="movie-tagline">${movieData.tagline}</p>` : ''}
                <p class="movie-description">${safeDescription}</p>
            </div>
            ${downloadButton}
            ${compactInfoHTML}
            ${castHTML}
            ${trailerHTML}
        `;
        
        tmdbDetails.innerHTML = htmlContent;
        
    } catch (error) {
        console.error('Error displaying TMDB details:', error);
        tmdbDetails.innerHTML = '<div class="error-message">Error loading details. Please try again later.</div>';
    }
}

// Helper function to create cast section
function createCastSection(movieData) {
    if (!movieData.cast || !Array.isArray(movieData.cast)) {
        console.log('No cast information available');
        return '';
    }
    
    const castItems = movieData.cast
        .filter(actor => actor && (actor.name || actor.character))
        .slice(0, 12) // Limit to first 12 cast members
        .map(actor => {
            const safeName = actor.name ? actor.name.replace(/[\"\']/g, '') : 'Unknown';
            const safeCharacter = actor.character ? actor.character.replace(/[\"\']/g, '') : 'N/A';
            // Use the profile path already processed from TMDB data
            const profileImage = actor.profile_path || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiMzMzMiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjQ1IiByPSIyMCIgZmlsbD0iIzY2NiIvPjxlbGxpcHNlIGN4PSI2MCIgY3k9IjEwMCIgcng9IjMwIiByeT0iMjUiIGZpbGw9IiM2NjYiLz48L3N2Zz4=';
            console.log('Cast member image for', safeName + ':', profileImage);
            
            return `
                <div class="compact-cast-member">
                    <img 
                        class="compact-cast-photo" 
                        src="${profileImage}" 
                        alt="${safeName}"
                        onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMjIiIHI9IjEwIiBmaWxsPSIjNjY2Ii8+PGVsbGlwc2UgY3g9IjMwIiBjeT0iNDgiIHJ4PSIxNSIgcnk9IjEyIiBmaWxsPSIjNjY2Ii8+PC9zdmc+';"
                        loading="lazy"
                        title="${safeName} as ${safeCharacter}">
                    <div class="compact-cast-info">
                        <div class="compact-cast-name">${safeName}</div>
                        <div class="compact-cast-character">${safeCharacter}</div>
                    </div>
                </div>`;
        });
    
    if (castItems.length === 0) {
        console.log('No valid cast members to display');
        return '';
    }
    
    return `
        <div class="compact-cast-section">
            <h3 class="section-title">🎭 Cast</h3>
            <div class="compact-cast-grid">
                ${castItems.join('')}
            </div>
        </div>`;
}

// Helper function to create compact movie info section
function createCompactMovieInfo(movieData, type) {
    // Create compact movie details
    const primaryInfo = [];
    const secondaryInfo = [];
    
    // Primary info (always show)
    if (movieData.vote_average) {
        primaryInfo.push(`<div class="info-chip"><span class="chip-icon">⭐</span>${movieData.vote_average.toFixed(1)}</div>`);
    }
    
    if (movieData.release_date) {
        const year = movieData.release_date.substring(0, 4);
        primaryInfo.push(`<div class="info-chip"><span class="chip-icon">📅</span>${year}</div>`);
    }
    
    if (movieData.runtime) {
        const hours = Math.floor(movieData.runtime / 60);
        const minutes = movieData.runtime % 60;
        primaryInfo.push(`<div class="info-chip"><span class="chip-icon">⏱️</span>${hours}h ${minutes}m</div>`);
    } else if (movieData.number_of_seasons) {
        primaryInfo.push(`<div class="info-chip"><span class="chip-icon">📺</span>${movieData.number_of_seasons} Season${movieData.number_of_seasons > 1 ? 's' : ''}</div>`);
    }
    
    if (movieData.status && movieData.status !== 'Released') {
        primaryInfo.push(`<div class="info-chip status-chip"><span class="chip-icon">📊</span>${movieData.status}</div>`);
    }
    
    // Secondary info (additional details)
    if (movieData.genres && movieData.genres.length > 0) {
        const genres = movieData.genres.slice(0, 3).map(g => g.name).join(', ');
        secondaryInfo.push(`<div class="info-detail"><strong>Genre:</strong> ${genres}</div>`);
    }
    
    if (movieData.production_countries && movieData.production_countries.length > 0) {
        const countries = movieData.production_countries.slice(0, 2).map(c => c.name).join(', ');
        secondaryInfo.push(`<div class="info-detail"><strong>Country:</strong> ${countries}</div>`);
    }
    
    if (movieData.original_language) {
        const languageNames = {
            'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
            'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese',
            'hi': 'Hindi', 'ar': 'Arabic', 'ru': 'Russian', 'pt': 'Portuguese'
        };
        const lang = languageNames[movieData.original_language] || movieData.original_language.toUpperCase();
        secondaryInfo.push(`<div class="info-detail"><strong>Language:</strong> ${lang}</div>`);
    }
    
    if (movieData.directors && movieData.directors.length > 0) {
        const directors = movieData.directors.slice(0, 2).join(', ');
        secondaryInfo.push(`<div class="info-detail"><strong>Director:</strong> ${directors}</div>`);
    }
    
    if (movieData.writers && movieData.writers.length > 0) {
        const writers = movieData.writers.slice(0, 2).join(', ');
        secondaryInfo.push(`<div class="info-detail"><strong>Writer:</strong> ${writers}</div>`);
    }
    
    // Budget & Revenue (only for movies with significant amounts)
    if (type === 'movie' && movieData.budget > 100000) {
        secondaryInfo.push(`<div class="info-detail"><strong>Budget:</strong> ${formatMoney(movieData.budget)}</div>`);
    }
    
    if (type === 'movie' && movieData.revenue > 100000) {
        secondaryInfo.push(`<div class="info-detail"><strong>Box Office:</strong> ${formatMoney(movieData.revenue)}</div>`);
    }
    
    return `
        <div class="compact-movie-info">
            <div class="primary-info">
                ${primaryInfo.join('')}
            </div>
            <div class="secondary-info">
                ${secondaryInfo.join('')}
            </div>
        </div>
    `;
}

// Helper function to create trailer section
function createTrailerSection(movieData) {
    if (!movieData.trailer) {
        console.log('No trailer available for:', movieData.title || 'Unknown movie');
        return '';
    }
    
    try {
        console.log('Creating trailer section for:', movieData.title, '- Trailer URL:', movieData.trailer);
        
        // Extract video ID from YouTube URL - handles multiple URL formats
        let videoId = null;
        
        if (movieData.trailer.includes('youtube.com/embed/')) {
            // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
            videoId = movieData.trailer.split('/embed/')[1]?.split('?')[0];
        } else if (movieData.trailer.includes('youtube.com/watch')) {
            // Handle watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
            videoId = new URL(movieData.trailer).searchParams.get('v');
        } else if (movieData.trailer.includes('youtu.be/')) {
            // Handle short URLs: https://youtu.be/VIDEO_ID
            videoId = movieData.trailer.split('youtu.be/')[1]?.split('?')[0];
        } else if (movieData.trailer.match(/^[\w-]{11}$/)) {
            // Handle case where it's just the video ID
            videoId = movieData.trailer;
        }
            
        if (!videoId) {
            console.error('Could not extract video ID from trailer URL:', movieData.trailer);
            return '';
        }
        
        console.log('Extracted video ID:', videoId);
        
        // Create safe title for the trailer note
        const safeTitle = movieData.title ? movieData.title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : 'this content';
        const safeReleaseYear = movieData.release_date ? new Date(movieData.release_date).getFullYear() : '';
        
        return `
            <div class="trailer-section">
                <h3 class="section-title">🎬 Official Trailer</h3>
                <div class="video-container">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        loading="lazy"
                        allowfullscreen>
                    </iframe>
                </div>
                <p class="trailer-note">Watch the official trailer for ${safeTitle}${safeReleaseYear ? ` (${safeReleaseYear})` : ''}</p>
            </div>`;
    } catch (error) {
        console.error('Error creating trailer section:', error);
        return '';
    }
}

// Close Video Modal
function closeVideoModal() {
    videoModal.classList.remove("active");
    // Clear the iframe content
    const modalVideo = document.querySelector(".modal-video");
    modalVideo.innerHTML =
        '<iframe id="modalPlayer" frameborder="0" allowfullscreen style="display: none;"></iframe>';
    document.body.style.overflow = "auto";
}

// Open Login Modal
function openLoginModal() {
    loginModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Close Login Modal
function closeLoginModal() {
    loginModal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = e.target.querySelector(".login-submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading"></div>';

    // Simulate login process
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;

        // Show success message
        const notification = document.createElement("div");
        notification.className = "download-notification show";
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Welcome back! Login successful.</span>
            </div>
        `;
        document.body.appendChild(notification);

        // Close modal
        closeLoginModal();

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }, 2000);
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    navMenu.classList.toggle("active");
}

// Handle Navigation
function handleNavigation(e) {
    e.preventDefault();
    const sectionName = e.target.getAttribute("data-section");
    console.log('Navigation clicked:', sectionName);

    // Close mobile menu
    navMenu.classList.remove("active");

    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");

    // Navigate to section using the section ID
    if (sectionName) {
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Special actions for specific sections
            switch(sectionName) {
                case 'search':
                    // Focus on search input when navigating to search
                    setTimeout(() => {
                        const searchInput = document.getElementById('searchInput');
                        if (searchInput) {
                            searchInput.focus();
                        }
                    }, 800);
                    break;
                    
                case 'categories':
                    // Could add special category actions here if needed
                    break;
                    
                case 'popular':
                    // Could add popular filtering here if needed
                    break;
            }
        } else {
            console.log('Section not found:', sectionName);
        }
    }
}

// Handle View Toggle
function handleViewToggle(e) {
    const view = e.target.dataset.view;
    currentView = view;

    // Update active button
    viewBtns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    // Update grid layout
    if (view === "list") {
        videosGrid.classList.add("list-view");
    } else {
        videosGrid.classList.remove("list-view");
    }
}

// Download Movie Function
function handleDownload(title, year, downloadUrl) {
    console.log('Download initiated:', { title, year, downloadUrl });
    
    // Create download link
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${title} (${year})`.trim();  // Suggested filename
    a.target = '_blank';  // Open in new tab if direct download not possible
    
    // Show download notification
    const notification = document.createElement("div");
    notification.className = "download-notification show";
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download started: ${title} (${year})</span>
        </div>
    `;
    document.body.appendChild(notification);

    // Trigger download
    a.click();

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load Live TV Slider
async function loadLiveTvSlider() {
    const liveTvGrid = document.querySelector(".live-tv-grid");
    if (!liveTvGrid) return;

    liveTvGrid.innerHTML = "";

    liveTvChannels.forEach((channel) => {
        const channelCard = document.createElement("div");
        channelCard.className = "live-tv-card";
        channelCard.innerHTML = `
            <div class="live-tv-thumbnail">
                <img src="${channel.thumbnail}" alt="${channel.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxpdmUgVFY8L3RleHQ+PC9zdmc+'">
                <div class="live-indicator">
                    <span class="live-dot"></span>
                    LIVE
                </div>
            </div>
            <div class="live-tv-info">
                <h3>${channel.name}</h3>
                <p>${channel.channel}</p>
            </div>
        `;

        channelCard.addEventListener("click", () => openLiveTvModal(channel));
        liveTvGrid.appendChild(channelCard);
    });
}

// Load Trending Slider
async function loadTrendingSlider() {
    const trendingGrid = document.querySelector(".trending-grid");
    if (!trendingGrid) return;

    trendingGrid.innerHTML =
        '<div style="text-align: center; color: var(--text-secondary);">Loading trending content...</div>';

    try {
        const trendingContent = await fetchTrendingContent();
        trendingGrid.innerHTML = "";

        trendingContent.slice(0, 10).forEach((item) => {
            const trendingCard = document.createElement("div");
            trendingCard.className = "trending-card";
            trendingCard.innerHTML = `
                <div class="trending-thumbnail">
                    <img src="${item.poster_path ? TMDB_IMAGE_BASE_URL + item.poster_path : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="}" alt="${item.title || item.name}">
                    <div class="trending-rank">#${trendingContent.indexOf(item) + 1}</div>
                </div>
                <div class="trending-info">
                    <h3>${item.title || item.name}</h3>
                    <p>⭐ ${item.vote_average.toFixed(1)}</p>
                </div>
            `;

            trendingCard.addEventListener("click", async () => {
                try {
                    // Fetch TMDB data for the trending item
                    const tmdbData = await fetchTMDBData(item.id, item.media_type);
                    
                    // Create a video object with the fetched data
                    const trendingVideo = {
                        id: `trending_${item.id}`,
                        tmdbId: item.id,
                        type: item.media_type,
                        title: item.title || item.name,
                        description: item.overview || 'No description available',
                        views: item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : 'N/A',
                        duration: item.runtime ? `${item.runtime} min` : 'N/A',
                        category: item.genre_ids ? item.genre_ids[0]?.toString() : 'unknown',
                        tmdbData: tmdbData, // Include the full TMDB data
                        embedCode: tmdbData?.trailer 
                            ? `<iframe src="${tmdbData.trailer}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`
                            : '<div style="text-align: center; padding: 50px; color: var(--text-secondary);">Trailer not available for this content</div>',
                    };
                    
                    openVideoModal(trendingVideo);
                } catch (error) {
                    console.error('Error loading trending content:', error);
                    // Fallback to basic info if TMDB fetch fails
                    const trendingVideo = {
                        id: `trending_${item.id}`,
                        tmdbId: item.id,
                        type: item.media_type,
                        title: item.title || item.name,
                        description: item.overview || 'No description available',
                        views: item.vote_average ? `⭐ ${item.vote_average.toFixed(1)}` : 'N/A',
                        duration: item.runtime ? `${item.runtime} min` : 'N/A',
                        category: item.genre_ids ? item.genre_ids[0]?.toString() : 'unknown',
                        embedCode: '<div style="text-align: center; padding: 50px; color: var(--text-secondary);">Failed to load content details. Please try again later.</div>',
                    };
                    openVideoModal(trendingVideo);
                }
            });

            trendingGrid.appendChild(trendingCard);
        });
    } catch (error) {
        console.error("Error loading trending content:", error);
        trendingGrid.innerHTML =
            '<div style="text-align: center; color: var(--text-secondary);">Failed to load trending content</div>';
    }
}

// Open Live TV Modal
function openLiveTvModal(channel) {
    const modalVideo = document.querySelector(".modal-video");
    modalVideo.innerHTML = channel.embedCode;

    modalTitle.textContent = channel.name;
    modalDuration.textContent = "LIVE";
    modalViews.textContent = "Live TV";
    modalCategory.textContent = channel.channel;
    modalDescription.textContent = `Watch ${channel.name} live streaming 24/7.`;

    // Hide TMDB details for live TV
    const tmdbDetails = document.getElementById("tmdbDetails");
    tmdbDetails.style.display = "none";

    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Initialize application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setupSliders();
    loadMovies(); // Load initial movies
    loadLiveTvSlider(); // Load live TV channels
    loadTrendingSlider(); // Load trending content
    setupEventListeners(); // Setup all event listeners
    console.log("H-TV Video Streaming Platform initialized successfully!");
});

// Slider functionality
function setupSliders() {
    // Live TV Slider
    const liveTvGrid = document.querySelector('.live-tv-grid');
    const liveTvNext = document.getElementById('liveTvNext');
    const liveTvPrev = document.getElementById('liveTvPrev');
    
    if (liveTvNext && liveTvPrev && liveTvGrid) {
        liveTvNext.addEventListener('click', () => {
            liveTvGrid.scrollBy({
                left: 300, // Adjust this value based on your card width + margin
                behavior: 'smooth'
            });
        });
        
        liveTvPrev.addEventListener('click', () => {
            liveTvGrid.scrollBy({
                left: -300, // Adjust this value based on your card width + margin
                behavior: 'smooth'
            });
        });
    }
    
    // Trending Slider
    const trendingGrid = document.querySelector('.trending-grid');
    const trendingNext = document.getElementById('trendingNext');
    const trendingPrev = document.getElementById('trendingPrev');
    
    if (trendingNext && trendingPrev && trendingGrid) {
        trendingNext.addEventListener('click', () => {
            trendingGrid.scrollBy({
                left: 300, // Adjust this value based on your card width + margin
                behavior: 'smooth'
            });
        });
        
        trendingPrev.addEventListener('click', () => {
            trendingGrid.scrollBy({
                left: -300, // Adjust this value based on your card width + margin
                behavior: 'smooth'
            });
        });
    }
}

// Scroll to Top functionality
function setupScrollToTop() {
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
