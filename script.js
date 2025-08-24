// TMDB API Configuration - Works both with backend and pure frontend
const TMDB_API_KEY = "46d13701165988b5bb5fb4d123c0447e";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Auto-detect if backend is available, fallback to CORS proxy
const API_BASE_URL = window.location.origin.includes("replit")
    ? window.location.origin + "/api/tmdb"
    : "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3";

// Simplified Video Data - Only tmdbId and embedCode needed
const videoData = [
    {
        id: 1,
        tmdbId: 299534, // Avengers: Endgame
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/TcMBFSGVi1c" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 2,
        tmdbId: 66732, // Stranger Things
        type: "tv",
        embedCode: `<iframe src="https://www.youtube.com/embed/StTqXEQ2l-Y" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 3,
        tmdbId: 1061474, // Spider-Man: No Way Home
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/9bZkp7q19f0" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 4,
        tmdbId: 1151334, // Latest movie you added
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/kJQP7kiw5Fk" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 5,
        tmdbId: 550, // Fight Club
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/DLzxrzFCyOs" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 6,
        tmdbId: 27205, // Inception
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/fJ9rUzIMcZQ" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 7,
        tmdbId: 155, // The Dark Knight
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/PkZNo7MFNFg" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 8,
        tmdbId: 680, // Pulp Fiction
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/Ks-_Mh1QhMc" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 9,
        tmdbId: 238, // The Godfather
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/jgpJVI3tDbY" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: 10,
        tmdbId: 1061474,
        type: "movie",
        embedCode: `<iframe src="https://www.youtube.com/embed/XBhY347jmgI" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
];

// Cache for movie data to avoid repeated API calls
const movieCache = new Map();

// TMDB API Functions - Hybrid approach (backend or CORS proxy)
async function fetchTMDBData(tmdbId, type) {
    const cacheKey = `${type}_${tmdbId}`;
    if (movieCache.has(cacheKey)) {
        return movieCache.get(cacheKey);
    }

    try {
        const endpoint = type === "movie" ? "movie" : "tv";

        // Try backend first, fallback to direct API with CORS proxy
        let response;
        if (API_BASE_URL.includes("replit")) {
            // Use existing backend
            response = await fetch(
                `${API_BASE_URL}/${endpoint}/${tmdbId}?append_to_response=credits,videos,release_dates`,
            );
        } else {
            // Use CORS proxy for static hosting
            const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,release_dates`;
            response = await fetch(
                `${API_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,release_dates`,
            );
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Format the data to match our expected structure
        const formattedData = {
            id: data.id,
            title: data.title || data.name,
            description: data.overview,
            release_date: data.release_date || data.first_air_date,
            release_year:
                (data.release_date || data.first_air_date)?.substring(0, 4) ||
                "Unknown",
            rating: data.vote_average ? data.vote_average.toFixed(1) : null,
            runtime: data.runtime
                ? `${data.runtime} minutes`
                : data.number_of_seasons
                  ? `${data.number_of_seasons} seasons`
                  : "Unknown",
            genres: data.genres?.map((g) => g.name) || [],
            poster_path: data.poster_path
                ? `${TMDB_IMAGE_BASE_URL}${data.poster_path}`
                : null,
            backdrop_path: data.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
                : null,
            status: data.status || "Unknown",
            tagline: data.tagline || "",
            homepage: data.homepage || "",
            budget: data.budget ? formatMoney(data.budget) : "Not disclosed",
            revenue: data.revenue ? formatMoney(data.revenue) : "Not disclosed",
            countries: data.production_countries?.map((c) => c.name) || [],
            directors: [],
            writers: [],
            creators: data.created_by?.map((c) => c.name) || [],
            cast: [],
            trailer: null,
        };

        // Extract crew information
        if (data.credits?.crew) {
            formattedData.directors = data.credits.crew
                .filter((p) => p.job === "Director")
                .map((p) => p.name);
            formattedData.writers = data.credits.crew
                .filter((p) =>
                    ["Writer", "Screenplay", "Story"].includes(p.job),
                )
                .map((p) => p.name);
        }

        // Extract cast information (top 12 for better display)
        if (data.credits?.cast) {
            formattedData.cast = data.credits.cast
                .slice(0, 12)
                .map((actor) => ({
                    name: actor.name,
                    character: actor.character,
                    profile_path: actor.profile_path
                        ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
                        : null,
                }));
        }

        // Find trailer (prioritize official trailers)
        if (data.videos?.results) {
            const trailers = data.videos.results.filter(
                (v) => v.type === "Trailer" && v.site === "YouTube",
            );
            const officialTrailer =
                trailers.find((v) =>
                    v.name.toLowerCase().includes("official"),
                ) || trailers[0];
            if (officialTrailer) {
                formattedData.trailer = `https://www.youtube.com/embed/${officialTrailer.key}`;
            }
        }

        // Cache the result
        movieCache.set(cacheKey, formattedData);
        return formattedData;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return null;
    }
}

async function fetchTrendingContent() {
    try {
        let response;
        if (API_BASE_URL.includes("replit")) {
            // Use existing backend
            response = await fetch(`${API_BASE_URL}/trending/all/week`);
        } else {
            // Use CORS proxy for static hosting
            response = await fetch(
                `${API_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`,
            );
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.results?.slice(0, 20) || [];
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
        name: "News 24/7",
        channel: "CNN Live",
        thumbnail: "https://img.youtube.com/vi/W1NTtBs8M2Q/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/W1NTtBs8M2Q" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
    },
    {
        id: "tv2",
        name: "Sports Central",
        channel: "ESPN HD",
        thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
        embedCode: `<iframe src="https://www.youtube.com/embed/kJQP7kiw5Fk" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
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

// Global variables for loaded movies
let loadedMovies = [];
let currentCategory = "all";
let searchQuery = "";
let filteredVideos = [];
let currentView = "grid";

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

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    loadMoviesWithTMDBData();
    setupEventListeners();
    loadLiveTvSlider();
    loadTrendingSlider();
});

// Load movies with TMDB data
async function loadMoviesWithTMDBData() {
    loadedMovies = [];

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
                loadedMovies.push(movieWithData);
            } else {
                // Fallback if TMDB data fails
                loadedMovies.push({
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
    loginForm.addEventListener("submit", handleLogin);
}

// Render Videos
function renderVideos() {
    videosGrid.innerHTML = "";

    if (filteredVideos.length === 0) {
        videosGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <h3>No videos found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    filteredVideos.forEach((video) => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

// Create Video Card
function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            <div class="video-duration">${video.duration}</div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <div class="video-meta">
                <span class="video-views">${video.views}</span>
                <span class="video-category">${video.category}</span>
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
    // Clear previous content and add the complete iframe
    modalPlayer.style.display = "none";
    const modalVideo = document.querySelector(".modal-video");
    modalVideo.innerHTML = video.embedCode;

    // Use TMDB data if available
    const movieData = video.tmdbData;
    if (movieData) {
        modalTitle.textContent = movieData.title;
        modalDuration.textContent = movieData.runtime;
        modalViews.textContent = `⭐ ${movieData.rating}`;
        modalCategory.textContent = movieData.genres.join(", ");
        modalDescription.textContent = movieData.description;

        // Update basic meta info
        const modalYear = document.getElementById("modalYear");
        const modalStatus = document.getElementById("modalStatus");
        const modalRating = document.getElementById("modalRating");

        modalYear.textContent = movieData.release_year || "Unknown";
        modalStatus.textContent = movieData.status || "";
        modalRating.textContent = movieData.rating
            ? `⭐ ${movieData.rating}`
            : "";

        displayTMDBDetails(movieData, video.type);
    } else {
        modalTitle.textContent = video.title;
        modalDuration.textContent = video.duration;
        modalViews.textContent = video.views;
        modalCategory.textContent = video.category;
        modalDescription.textContent = video.description;
    }

    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Display TMDB Details
function displayTMDBDetails(movieData, type) {
    const tmdbDetails = document.getElementById("tmdbDetails");
    tmdbDetails.innerHTML = `
        <div class="movie-info-header">
            <div class="download-section">
                <button class="download-btn" onclick="downloadMovie('${movieData.title}', '${movieData.release_year}', '${movieData.id}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Movie
                </button>
            </div>
        </div>

        <div class="movie-stats">
            <div class="stat-item">
                <label>Release Year:</label>
                <span>${movieData.release_year || "Unknown"}</span>
            </div>
            <div class="stat-item">
                <label>Runtime:</label>
                <span>${movieData.runtime || "Unknown"}</span>
            </div>
            <div class="stat-item">
                <label>Budget:</label>
                <span>${movieData.budget || "Not disclosed"}</span>
            </div>
            <div class="stat-item">
                <label>Revenue:</label>
                <span>${movieData.revenue || "Not disclosed"}</span>
            </div>
            <div class="stat-item">
                <label>Director:</label>
                <span>${movieData.directors?.join(", ") || movieData.creators?.join(", ") || "Unknown"}</span>
            </div>
            <div class="stat-item">
                <label>Writers:</label>
                <span>${movieData.writers?.join(", ") || "Unknown"}</span>
            </div>
            <div class="stat-item">
                <label>Countries:</label>
                <span>${movieData.countries?.join(", ") || "Unknown"}</span>
            </div>
            <div class="stat-item">
                <label>Genres:</label>
                <span>${movieData.genres?.join(", ") || "Unknown"}</span>
            </div>
        </div>
        
        ${
            movieData.cast && movieData.cast.length > 0
                ? `
        <div class="cast-section">
            <h4>🎭 Cast & Characters</h4>
            <div class="cast-grid">
                ${movieData.cast
                    .map(
                        (actor) => `
                    <div class="cast-member">
                        <img 
                            class="cast-photo" 
                            src="${actor.profile_path || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMzMzMiLz4KPHR0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OL0E8L3RleHQ+Cjwvc3ZnPg=="}" 
                            alt="${actor.name}"
                            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMzMzMiLz4KPHR0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OL0E8L3RleHQ+Cjwvc3ZnPg=='"
                        >
                        <div class="cast-name">${actor.name}</div>
                        <div class="cast-character">${actor.character}</div>
                    </div>
                `,
                    )
                    .join("")}
            </div>
        </div>
        `
                : ""
        }
        
        ${
            movieData.trailer
                ? `
        <div class="trailer-section">
            <h4>🎬 Official Trailer</h4>
            <div class="trailer-player">
                <iframe 
                    src="${movieData.trailer}" 
                    width="100%" 
                    height="315"
                    frameborder="0" 
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
        </div>
        `
                : ""
        }
        
        ${
            movieData.tagline
                ? `
        <div class="movie-tagline">
            <em>"${movieData.tagline}"</em>
        </div>
        `
                : ""
        }
    `;
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

            trendingCard.addEventListener("click", () => {
                // Create a temporary video object for trending content
                const trendingVideo = {
                    id: `trending_${item.id}`,
                    tmdbId: item.id,
                    type: item.media_type,
                    embedCode:
                        '<div style="text-align: center; padding: 50px; color: var(--text-secondary);">Trailer not available for trending content</div>',
                };
                openVideoModal(trendingVideo);
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

console.log("H-TV Video Streaming Platform initialized successfully!");
