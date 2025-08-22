# replit.md

## Overview

H-TV is a premium video streaming web application built as a modern, responsive single-page application. The project provides a Netflix-like interface for video content discovery and playback, featuring categories like educational, gaming, music, sports, and comedy content. The application uses YouTube embeds for video playback and focuses on delivering a sleek, dark-themed user experience with gradient accents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML5, CSS3, and JavaScript without frameworks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts
- **Component-based Structure**: Modular JavaScript approach with separate concerns for video data, UI interactions, and navigation
- **CSS Custom Properties**: Centralized theming system using CSS variables for consistent styling

### UI/UX Design Patterns
- **Dark Theme**: Primary dark color scheme with purple-pink gradient accents
- **Sticky Navigation**: Fixed header with backdrop blur effect for modern aesthetics
- **Card-based Layout**: Video content displayed in responsive card grids
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features

### Data Management
- **Mock Data Structure**: Videos stored as JavaScript objects with properties including ID, title, duration, views, category, thumbnails, and embed URLs
- **Client-side Filtering**: Category and search filtering implemented in JavaScript
- **No Backend**: Currently operates as a static frontend application with hardcoded video data

### Video Integration
- **YouTube Embeds**: Uses YouTube's embed API for video playback
- **Thumbnail Integration**: Leverages YouTube thumbnail API for video previews
- **No Custom Video Hosting**: Relies entirely on YouTube infrastructure for media delivery

## External Dependencies

### Media Services
- **YouTube**: Primary video hosting and playback service
  - Embed API for video players
  - Thumbnail API for video previews
  - No authentication required for public videos

### Assets and Resources
- **External Thumbnails**: YouTube thumbnail URLs for video preview images
- **SVG Icons**: Inline SVG icons for search and navigation elements
- **Web Fonts**: System fonts (Arial) with fallbacks for cross-platform compatibility

### Browser APIs
- **CSS Custom Properties**: For theming and responsive design
- **Flexbox/Grid**: For layout management
- **DOM Manipulation**: Vanilla JavaScript for interactive features
- **Local Storage**: Potential for user preferences (implementation not visible in current code)

Note: The application currently has no server-side components, database connections, or external API integrations beyond YouTube embeds. All functionality is client-side with static data.