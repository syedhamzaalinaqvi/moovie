/**
 * Advanced HLS Video Player
 * Supports multiple HLS libraries with automatic fallback
 * Designed specifically for stubborn HLS/M3U8 streams
 */

class AdvancedHLSPlayer {
    constructor() {
        this.currentPlayer = 'hlsjs';
        this.players = {
            hlsjs: null,
            videojs: null,
            plyr: null,
            native: null
        };
        this.currentStream = '';
        this.debugLog = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDebugLogger();
        this.log('🎬 Advanced HLS Player initialized');
        
        // Auto-load the default stream
        setTimeout(() => {
            const defaultUrl = document.getElementById('stream-url').value;
            if (defaultUrl) {
                this.loadStream(defaultUrl);
            }
        }, 1000);
    }

    setupEventListeners() {
        // Load stream button
        document.getElementById('load-stream').addEventListener('click', () => {
            const url = document.getElementById('stream-url').value.trim();
            if (url) {
                this.loadStream(url);
            } else {
                this.log('❌ Please enter a stream URL', 'error');
            }
        });

        // Player selector radio buttons
        document.querySelectorAll('input[name="player"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.switchPlayer(e.target.value);
            });
        });

        // Test URL buttons
        document.querySelectorAll('.test-url-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.target.getAttribute('data-url');
                document.getElementById('stream-url').value = url;
                this.loadStream(url);
            });
        });

        // Clear debug button
        document.getElementById('clear-debug').addEventListener('click', () => {
            this.clearDebug();
        });

        // Enter key on URL input
        document.getElementById('stream-url').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const url = e.target.value.trim();
                if (url) {
                    this.loadStream(url);
                }
            }
        });
    }

    setupDebugLogger() {
        // Capture console errors and network issues
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.log(`Console Error: ${args.join(' ')}`, 'error');
            originalConsoleError.apply(console, args);
        };
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        
        this.debugLog.push({ timestamp, message, type });
        
        const debugElement = document.getElementById('debug-log');
        const logDiv = document.createElement('div');
        logDiv.className = `log-entry log-${type}`;
        logDiv.textContent = logEntry;
        debugElement.appendChild(logDiv);
        debugElement.scrollTop = debugElement.scrollHeight;

        console.log(logEntry);
    }

    clearDebug() {
        this.debugLog = [];
        document.getElementById('debug-log').innerHTML = '';
    }

    switchPlayer(playerType) {
        // Hide all player sections
        document.querySelectorAll('.player-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected player section
        document.getElementById(`${playerType}-section`).classList.add('active');

        // Stop current player
        this.stopAllPlayers();

        this.currentPlayer = playerType;
        this.log(`🔄 Switched to ${playerType} player`);

        // Reload current stream on new player
        if (this.currentStream) {
            setTimeout(() => {
                this.loadStream(this.currentStream);
            }, 500);
        }
    }

    stopAllPlayers() {
        // Stop HLS.js
        if (this.players.hlsjs) {
            this.players.hlsjs.destroy();
            this.players.hlsjs = null;
        }

        // Stop Video.js
        if (this.players.videojs) {
            this.players.videojs.dispose();
            this.players.videojs = null;
        }

        // Stop Plyr
        if (this.players.plyr) {
            this.players.plyr.destroy();
            this.players.plyr = null;
        }

        // Stop native player
        const nativePlayer = document.getElementById('native-player');
        if (nativePlayer) {
            nativePlayer.pause();
            nativePlayer.src = '';
            nativePlayer.load();
        }
    }

    async loadStream(url) {
        this.currentStream = url;
        this.log(`🔗 Loading stream: ${url}`);
        
        // Update status
        this.updateStatus('Loading...');

        try {
            // Test URL accessibility first
            await this.testStreamUrl(url);

            switch (this.currentPlayer) {
                case 'hlsjs':
                    await this.loadHLSJS(url);
                    break;
                case 'videojs':
                    await this.loadVideoJS(url);
                    break;
                case 'plyr':
                    await this.loadPlyr(url);
                    break;
                case 'native':
                    await this.loadNative(url);
                    break;
                default:
                    throw new Error('Unknown player type');
            }

        } catch (error) {
            this.log(`❌ Failed to load stream: ${error.message}`, 'error');
            this.updateStatus('Failed to load');
            
            // Try automatic fallback
            this.tryFallback(url);
        }
    }

    async testStreamUrl(url) {
        this.log('🔍 Testing stream accessibility...');
        
        try {
            // Use fetch with no-cors to test accessibility
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch(url, { 
                method: 'HEAD',
                mode: 'no-cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            this.log('✅ Stream URL is accessible');
            
        } catch (error) {
            this.log(`⚠️ Stream URL test warning: ${error.message}`, 'warning');
            // Don't throw error here, as no-cors might fail but stream could still work
        }
    }

    async loadHLSJS(url) {
        return new Promise((resolve, reject) => {
            if (!Hls.isSupported()) {
                reject(new Error('HLS.js is not supported in this browser'));
                return;
            }

            const video = document.getElementById('hlsjs-player');
            const hls = new Hls({
                debug: false,
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90,
                maxBufferLength: 30,
                maxMaxBufferLength: 600,
                maxBufferSize: 60 * 1000 * 1000,
                maxBufferHole: 0.5,
                highBufferWatchdogPeriod: 2,
                nudgeOffset: 0.1,
                nudgeMaxRetry: 3,
                maxLoadingDelay: 4,
                maxSeekHole: 2,
                seekHoleNudgeDuration: 0.1,
                maxFragLookUpTolerance: 0.25,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 10,
                liveDurationInfinity: false,
                liveBackBufferLength: 0,
                maxLiveSyncPlaybackRate: 1,
                manifestLoadingTimeOut: 10000,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 1000,
                levelLoadingTimeOut: 10000,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1000,
                fragLoadingTimeOut: 20000,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 1000,
                startFragPrefetch: true,
                testBandwidth: true,
                progressive: false,
                lowLatencyMode: true,
                fLoader: undefined,
                pLoader: undefined,
                xhrSetup: function(xhr, url) {
                    // Add custom headers for problematic streams
                    xhr.setRequestHeader('Accept', '*/*');
                    xhr.setRequestHeader('Accept-Encoding', 'identity;q=1, *;q=0');
                    xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
                    xhr.setRequestHeader('Sec-Fetch-Site', 'cross-site');
                }
            });

            // Event listeners
            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                this.log('📺 HLS.js: Media attached');
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.log('✅ HLS.js: Manifest parsed successfully');
                this.updateStatus('Ready');
                resolve();
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                this.log(`🔄 HLS.js: Quality switched to level ${data.level}`);
                this.updateQuality(`Level ${data.level}`);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            this.log('❌ HLS.js: Fatal network error', 'error');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            this.log('❌ HLS.js: Fatal media error, attempting recovery', 'error');
                            hls.recoverMediaError();
                            break;
                        default:
                            this.log(`❌ HLS.js: Fatal error: ${data.type} - ${data.details}`, 'error');
                            reject(new Error(`HLS.js fatal error: ${data.details}`));
                            break;
                    }
                } else {
                    this.log(`⚠️ HLS.js: Non-fatal error: ${data.details}`, 'warning');
                }
            });

            hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
                this.log(`📦 Fragment loaded: ${data.frag.sn}`);
            });

            // Load the stream
            try {
                hls.loadSource(url);
                hls.attachMedia(video);
                this.players.hlsjs = hls;
                
                // Add video event listeners
                video.addEventListener('loadstart', () => this.log('📹 Video: Load start'));
                video.addEventListener('loadedmetadata', () => this.log('📹 Video: Metadata loaded'));
                video.addEventListener('canplay', () => this.log('📹 Video: Can play'));
                video.addEventListener('playing', () => this.log('📹 Video: Playing'));
                video.addEventListener('error', (e) => {
                    this.log(`❌ Video error: ${e.target.error?.message || 'Unknown error'}`, 'error');
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    async loadVideoJS(url) {
        return new Promise((resolve, reject) => {
            try {
                const video = document.getElementById('videojs-player');
                
                // Dispose existing player
                if (this.players.videojs) {
                    this.players.videojs.dispose();
                }

                const player = videojs(video, {
                    fluid: true,
                    responsive: true,
                    html5: {
                        hls: {
                            enableLowInitialPlaylist: true,
                            smoothQualityChange: true,
                            overrideNative: true,
                            withCredentials: false
                        }
                    },
                    sources: [{
                        src: url,
                        type: 'application/x-mpegURL'
                    }]
                });

                player.ready(() => {
                    this.log('✅ Video.js: Player ready');
                    this.updateStatus('Ready');
                    resolve();
                });

                player.on('error', (error) => {
                    const err = player.error();
                    this.log(`❌ Video.js error: ${err?.message || 'Unknown error'}`, 'error');
                    reject(new Error(`Video.js error: ${err?.message || 'Unknown error'}`));
                });

                player.on('loadstart', () => this.log('📹 Video.js: Load start'));
                player.on('loadedmetadata', () => this.log('📹 Video.js: Metadata loaded'));
                player.on('canplay', () => this.log('📹 Video.js: Can play'));
                player.on('playing', () => this.log('📹 Video.js: Playing'));

                this.players.videojs = player;

            } catch (error) {
                reject(error);
            }
        });
    }

    async loadPlyr(url) {
        return new Promise((resolve, reject) => {
            try {
                const video = document.getElementById('plyr-player');
                
                // Dispose existing player
                if (this.players.plyr) {
                    this.players.plyr.destroy();
                }

                // Set source
                video.src = url;

                const player = new Plyr(video, {
                    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
                    settings: ['quality', 'speed', 'loop'],
                    quality: {
                        default: 'auto',
                        options: ['auto']
                    }
                });

                player.on('ready', () => {
                    this.log('✅ Plyr: Player ready');
                    this.updateStatus('Ready');
                    resolve();
                });

                player.on('error', (error) => {
                    this.log(`❌ Plyr error: ${error.detail?.message || 'Unknown error'}`, 'error');
                    reject(new Error(`Plyr error: ${error.detail?.message || 'Unknown error'}`));
                });

                player.on('loadstart', () => this.log('📹 Plyr: Load start'));
                player.on('loadedmetadata', () => this.log('📹 Plyr: Metadata loaded'));
                player.on('canplay', () => this.log('📹 Plyr: Can play'));
                player.on('playing', () => this.log('📹 Plyr: Playing'));

                this.players.plyr = player;

            } catch (error) {
                reject(error);
            }
        });
    }

    async loadNative(url) {
        return new Promise((resolve, reject) => {
            try {
                const video = document.getElementById('native-player');
                const sources = video.querySelectorAll('source');
                
                // Update source elements
                sources.forEach(source => {
                    source.src = url;
                });

                video.addEventListener('loadedmetadata', () => {
                    this.log('✅ Native: Metadata loaded');
                    this.updateStatus('Ready');
                    resolve();
                }, { once: true });

                video.addEventListener('error', (e) => {
                    const error = e.target.error;
                    let errorMessage = 'Unknown error';
                    
                    if (error) {
                        switch(error.code) {
                            case 1: errorMessage = 'Video loading aborted'; break;
                            case 2: errorMessage = 'Network error'; break;
                            case 3: errorMessage = 'Video decoding failed/corrupted'; break;
                            case 4: errorMessage = 'Video format not supported'; break;
                        }
                    }
                    
                    this.log(`❌ Native player error: ${errorMessage}`, 'error');
                    reject(new Error(`Native player error: ${errorMessage}`));
                }, { once: true });

                video.addEventListener('loadstart', () => this.log('📹 Native: Load start'));
                video.addEventListener('canplay', () => this.log('📹 Native: Can play'));
                video.addEventListener('playing', () => this.log('📹 Native: Playing'));

                // Try to load
                video.load();

            } catch (error) {
                reject(error);
            }
        });
    }

    tryFallback(url) {
        const fallbackOrder = ['hlsjs', 'videojs', 'plyr', 'native'];
        const currentIndex = fallbackOrder.indexOf(this.currentPlayer);
        
        if (currentIndex < fallbackOrder.length - 1) {
            const nextPlayer = fallbackOrder[currentIndex + 1];
            this.log(`🔄 Trying fallback to ${nextPlayer} player...`);
            
            // Switch to next player
            document.querySelector(`input[value="${nextPlayer}"]`).checked = true;
            this.switchPlayer(nextPlayer);
        } else {
            this.log('❌ All players failed. Stream may be incompatible.', 'error');
            this.updateStatus('All players failed');
        }
    }

    updateStatus(status) {
        const statusElement = document.getElementById(`${this.currentPlayer}-status`);
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    updateQuality(quality) {
        const qualityElement = document.getElementById(`${this.currentPlayer}-quality`);
        if (qualityElement) {
            qualityElement.textContent = quality;
        }
    }
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hlsPlayer = new AdvancedHLSPlayer();
});

// Add some global utilities for debugging
window.testStream = (url) => {
    document.getElementById('stream-url').value = url;
    window.hlsPlayer.loadStream(url);
};

window.switchToPlayer = (playerType) => {
    document.querySelector(`input[value="${playerType}"]`).checked = true;
    window.hlsPlayer.switchPlayer(playerType);
};
