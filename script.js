// TMDB API Configuration
const TMDB_API_KEY = "46d13701165988b5bb5fb4d123c0447e";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_BASE_URL = TMDB_BASE_URL;

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

// Simplified Video Data - Only tmdbId and embedCode needed
const videoData = [
    {
        id: 1,
        tmdbId: 1061474, // Superman 
        type: "movie",
        title: "Superman (2025)",
        download: "https://example.com/download/superman-2025", // Replace with actual download link
        embedCode: '<iframe src="https://mivalyo.com/embed/euzlk6l3jb90" frameborder="0" allowfullscreen></iframe>',
        //duration: "2h 30m",
        //views: "1.2M views",
        //category: "Action",
       // description: "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent."
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
    
    {
        id: 14,
        tmdbId: 1035259, //Nakedgun 2025
        type: "movie",
        download: "https://example.com/download/superman-2025", // Replace with actual download link
        embedCode: `<IFRAME SRC="https://bingezove.com/embed/8mbjj9vs59hl" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>`,
    },
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

        // Format the data to match our expected structure
        const formattedData = {
            id: details.id,
            title: details.title || details.name || 'Unknown Title',
            description: details.overview || 'No description available',
            release_date: details.release_date || details.first_air_date || '',
            release_year: (details.release_date || details.first_air_date)?.substring(0, 4) || 'Unknown',
            rating: details.vote_average ? details.vote_average.toFixed(1) : 'N/A',
            runtime: details.runtime 
                ? `${details.runtime} minutes` 
                : details.number_of_seasons 
                    ? `${details.number_of_seasons} season${details.number_of_seasons > 1 ? 's' : ''}` 
                    : 'Unknown',
            genres: details.genres?.map((g) => g.name) || [],
            poster_path: details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : null,
            backdrop_path: details.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
                : null,
            status: details.status || 'Unknown',
            tagline: details.tagline || '',
            homepage: details.homepage || '',
            budget: details.budget ? formatMoney(details.budget) : 'Not disclosed',
            revenue: details.revenue ? formatMoney(details.revenue) : 'Not disclosed',
            countries: details.production_countries?.map((c) => c.name) || [],
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
            formattedData.cast = credits.cast
                .slice(0, 12)
                .map((actor) => ({
                    name: actor.name || 'Unknown',
                    character: actor.character || 'N/A',
                    profile_path: actor.profile_path
                        ? `https://image.tmdb.org/t/w200${actor.profile_path}`
                        : null,
                }));
        }

        // Find trailer (prioritize official trailers)
        if (videos?.results) {
            const trailers = videos.results.filter(
                (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.key
            );
            
            if (trailers.length > 0) {
                // First try to find an official trailer
                let trailer = trailers.find(v => 
                    v.name.toLowerCase().includes('official trailer') ||
                    v.name.toLowerCase().includes('official teaser')
                ) || trailers[0]; // Fallback to first trailer
                
                if (trailer) {
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
    },
    {
        id: "tv3",
        name: "Music Hits",
        channel: "MTV Live",
        thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/9bZkp7q19f0" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: "tv4",
        name: "Comedy Central",
        channel: "Comedy HD",
        thumbnail: "https://img.youtube.com/vi/DLzxrzFCyOs/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/DLzxrzFCyOs" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: "tv5",
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

// Initialize DOM elements after document is loaded
let videosGrid, categoryFilters, searchInput, searchBtn, videoModal, 
    modalOverlay, modalClose, modalPlayer, modalTitle, modalDuration,
    modalViews, modalCategory, modalYear, modalStatus, modalRating, modalDescription,
    tmdbDetails, movieBudget, movieRevenue, movieDirector, movieGenres,
    trailerSection, trailerPlayer, castGrid;
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
    const updatedMovies = [];

    for (const video of videoData) {
        try {
            const tmdbData = await fetchTMDBData(video.tmdbId, video.type);
            if (tmdbData) {
                const movieWithData = {
                    ...video,
                    title: tmdbData.title,
                    duration: tmdbData.runtime,
                    views: `${tmdbData.rating}★ TMDB`,
                    category: tmdbData.genres[0]?.toLowerCase() || "drama",
                    thumbnail: tmdbData.poster_path,
                    description: tmdbData.description,
                    tmdbData: tmdbData,
                };
                updatedMovies.push(movieWithData);
            } else {
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
        }
    }

    // Update loadedMovies and filteredVideos
    loadedMovies = updatedMovies.length > 0 ? updatedMovies : [...videoData];
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
            handleSearch();
        }
    });
    searchInput.addEventListener("input", handleSearch);

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
}

// Render Videos
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

// Create Video Card
function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";
    
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
        </div>
        <div class="video-info">
            <h3 class="video-title" title="${title}">${title}</h3>
            <div class="video-meta">
                ${year ? `<span class="video-year">${year}</span>` : ''}
                ${rating ? `<span class="video-rating">⭐ ${rating}</span>` : ''}
                ${category ? `<span class="video-category">${category}</span>` : ''}
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
function filterVideos() {
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

    renderVideos();
}

// Open Video Modal
async function openVideoModal(video) {
    console.log('Opening video modal for:', video);
    
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

    try {
        // Try to get TMDB data if not already available
        let movieData = video.tmdbData;
        
        // If no TMDB data but we have a TMDB ID, try to fetch it
        if ((!movieData || Object.keys(movieData).length === 0) && video.tmdbId) {
            console.log('Fetching TMDB data for ID:', video.tmdbId, 'Type:', video.type);
            movieData = await fetchTMDBData(video.tmdbId, video.type || 'movie');
            // Store the fetched data for future use
            video.tmdbData = movieData;
        }

        // Update the video object with the latest data
        if (movieData) {
            console.log('TMDB Data loaded:', movieData);
            
            // Update video properties with TMDB data
            video.title = movieData.title || video.title;
            video.duration = movieData.runtime || video.duration;
            video.views = `⭐ ${movieData.rating || 'N/A'}`;
            video.category = (movieData.genres && movieData.genres[0]?.toLowerCase()) || video.category || 'drama';
            video.description = movieData.overview || movieData.description || video.description;
            
            // Set the embed code if we have a trailer
            if (movieData.trailer && !video.embedCode) {
                video.embedCode = `
                    <div class="aspect-ratio" style="padding-bottom: 56.25%;">
                        <iframe 
                            src="${movieData.trailer}"
                            title="${movieData.title || video.title} Trailer"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>`;
            }
            
            // Fallback if no trailer
            if (!video.embedCode) {
                video.embedCode = `
                    <div style="text-align: center; padding: 50px; color: var(--text-secondary);">
                        <p>No trailer available for this content</p>
                    </div>`;
            }
        } else {
            console.warn('No TMDB data available for video:', video);
            if (!video.embedCode) {
                video.embedCode = `
                    <div style="text-align: center; padding: 50px; color: var(--text-secondary);">
                        <p>No preview available</p>
                    </div>`;
            }
        }
        
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
        }
        
    } catch (error) {
        console.error('Error in openVideoModal:', error);
        
        // Show error message to user
        modalVideo.innerHTML = `
            <div style="text-align: center; padding: 50px; color: var(--error-color);">
                <p>Failed to load content. Please try again later.</p>
                <button onclick="openVideoModal(${JSON.stringify(video).replace(/"/g, '&quot;')})" 
                        style="margin-top: 15px; padding: 8px 16px; background: var(--primary-color); border: none; border-radius: 4px; color: white; cursor: pointer;">
                    Retry
                </button>
            </div>`;
            
        // Fallback to basic video data
        modalTitle.textContent = video.title || "";
        modalDuration.textContent = video.duration || "Unknown";
        modalViews.textContent = video.views || "";
        modalCategory.textContent = video.category || "";
        modalDescription.textContent = video.description || "";
    }

    // Show the modal
    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Display TMDB Details
function displayTMDBDetails(movieData, type) {
    console.log('Displaying TMDB details for:', movieData.title || 'Unknown');
    
    const tmdbDetails = document.getElementById("tmdbDetails");
    if (!tmdbDetails) {
        console.error('TMDB details container not found');
        return;
    }
    
    try {
        // Create safe strings to prevent XSS
        const safeTitle = movieData.title ? movieData.title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : 'Unknown Title';
        const safeReleaseYear = movieData.release_year ? movieData.release_year : '';
        const safeDescription = movieData.overview ? movieData.overview.replace(/[\"\']/g, '') : 'No description available';
        
        // Create cast section
        let castHTML = createCastSection(movieData);
        
        // Create trailer section
        let trailerHTML = createTrailerSection(movieData);
        
        // Create movie stats
        let statsHTML = createMovieStats(movieData, type);
        
        // Combine all sections
        const htmlContent = `
            <div class="movie-info-header">
                <h2>${safeTitle} <span class="release-year">(${safeReleaseYear})</span></h2>
                <p class="movie-description">${safeDescription}</p>
            </div>
            ${statsHTML}
            ${castHTML}
            ${trailerHTML}
            ${movieData.tagline ? `<div class="movie-tagline"><em>"${movieData.tagline}"</em></div>` : ''}
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
            const profileImage = actor.profile_path 
                ? `https://image.tmdb.org/t/w200${actor.profile_path}`
                : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OL0E8L3RleHQ+PC9zdmc+';
            
            return `
                <div class="cast-member">
                    <div class="cast-photo-container">
                        <img 
                            class="cast-photo" 
                            src="${profileImage}" 
                            alt="${safeName}"
                            onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OL0E8L3RleHQ+PC9zdmc+';"
                            loading="lazy"
                            title="${safeName} as ${safeCharacter}">
                    </div>
                    <div class="cast-info">
                        <div class="cast-name" title="${safeName}">${safeName}</div>
                        <div class="cast-character" title="${safeCharacter}">${safeCharacter}</div>
                    </div>
                </div>`;
        });
    
    if (castItems.length === 0) {
        console.log('No valid cast members to display');
        return '';
    }
    
    return `
        <div class="cast-section">
            <h3 class="section-title">🎭 Cast & Characters</h3>
            <div class="cast-grid">
                ${castItems.join('')}
            </div>
        </div>`;
}

// Helper function to create movie stats section
function createMovieStats(movieData, type) {
    const stats = [];
    
    // Runtime
    if (movieData.runtime) {
        const hours = Math.floor(movieData.runtime / 60);
        const minutes = movieData.runtime % 60;
        stats.push(`<div class="stat-item"><span class="stat-label">⏱️ Runtime:</span> ${hours}h ${minutes}m</div>`);
    }
    
    // Rating
    if (movieData.vote_average) {
        stats.push(`<div class="stat-item"><span class="stat-label">⭐ Rating:</span> ${movieData.vote_average.toFixed(1)}/10</div>`);
    }
    
    // Status
    if (movieData.status) {
        stats.push(`<div class="stat-item"><span class="stat-label">📊 Status:</span> ${movieData.status}</div>`);
    }
    
    // Release Date
    if (movieData.release_date) {
        const releaseDate = new Date(movieData.release_date);
        stats.push(`<div class="stat-item"><span class="stat-label">📅 Release Date:</span> ${releaseDate.toLocaleDateString()}</div>`);
    }
    
    // Genres
    if (movieData.genres && movieData.genres.length > 0) {
        const genres = movieData.genres.map(g => g.name).join(', ');
        stats.push(`<div class="stat-item"><span class="stat-label">🎭 Genres:</span> ${genres}</div>`);
    }
    
    // Budget (for movies)
    if (type === 'movie' && movieData.budget && movieData.budget > 0) {
        stats.push(`<div class="stat-item"><span class="stat-label">💰 Budget:</span> $${movieData.budget.toLocaleString()}</div>`);
    }
    
    // Revenue (for movies)
    if (type === 'movie' && movieData.revenue && movieData.revenue > 0) {
        stats.push(`<div class="stat-item"><span class="stat-label">💵 Revenue:</span> $${movieData.revenue.toLocaleString()}</div>`);
    }
    
    // Production Companies
    if (movieData.production_companies && movieData.production_companies.length > 0) {
        const companies = movieData.production_companies.map(c => c.name).join(', ');
        stats.push(`<div class="stat-item"><span class="stat-label">🏢 Production:</span> ${companies}</div>`);
    }
    
    if (stats.length === 0) {
        return '';
    }
    
    return `
        <div class="movie-stats">
            <h3 class="section-title">📊 Details</h3>
            <div class="stats-grid">
                ${stats.join('')}
            </div>
        </div>`;
}

// Helper function to create trailer section
function createTrailerSection(movieData) {
    if (!movieData.trailer) {
        console.log('No trailer available');
        return '';
    }
    
    try {
        // Extract video ID from YouTube URL
        const videoId = movieData.trailer.includes('youtube.com') 
            ? new URL(movieData.trailer).searchParams.get('v')
            : movieData.trailer.split('/').pop();
            
        if (!videoId) {
            console.error('Could not extract video ID from trailer URL:', movieData.trailer);
            return '';
        }
        
        // Create safe title for the trailer note
        const safeTitle = movieData.title ? movieData.title.replace(/"/g, '&quot;').replace(/'/g, '&apos;') : 'this content';
        const safeReleaseYear = movieData.release_date ? new Date(movieData.release_date).getFullYear() : '';
        
        return `
            <div class="trailer-section">
                <h3 class="section-title">🎬 Trailer</h3>
                <div class="video-container">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/${videoId}" 
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
    const target = e.target.getAttribute("href");

    // Close mobile menu
    navMenu.classList.remove("active");

    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");

    // Scroll to section
    if (target && target.startsWith("#")) {
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
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
function downloadMovie(title, year, movieId) {
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
