# Board Game Cats
Jason Lewis
CS233JS W26 Final Project

Requirements:
- [X] Include at least one AJAX request (call a web API).
- [X] JS technologies introduced in the course such as: Local Storage
- [X] Have a professional-looking UI: Used Bootstrap
- [X] Production code should be bundled using Webpack.

A board game meetup website that helps users discover local board game events and select companion cat breeds to bring along!

## TODO Project Backlog:

- [ ] Create single event page that dynamically loads each event
- [ ] Signup form for each event with selecting cat breed (showcased from gallery)

## Project Overview

This application features:
- **Home Page**: Browse and search board game meetup events
- **Cat Gallery**: Explore different cat breeds sourced from TheCatAPI
- **Event Creation**: Create new board game meetup events with details, location, and timing
- **Responsive Design**: Mobile-friendly interface built with Bootstrap 5

## Getting Started

### Scripts
Start the development server with hot reload:
    - npm run watch

Build for production:
    - npm run build

## Environment Variables
This project uses webpack with dotenv support. Create the following files in your project root:
.env - Local development environment variables  
.env.production - Production environment variables  

# Required Variables:
CAT_API_KEY=your_api_key_here

Webpack automatically loads these files based on the current environment.
# Dependencies
Production
bootstrap (^5.3.8) - Frontend framework for responsive design
bootstrap-icons (^1.13.1) - Icon library

Development
webpack (^5.105.4) - Module bundler
webpack-cli (^7.0.0) - Command line interface for webpack
webpack-dev-server (^5.2.3) - Development server with hot reload
html-webpack-plugin (^5.6.6) - Generates HTML files
copy-webpack-plugin (^14.0.0) - Copies files during build
css-loader (^7.1.4) - CSS module support
style-loader (^4.0.0) - Injects CSS into DOM
mini-css-extract-plugin (^2.10.1) - Extracts CSS into separate files
dotenv (^17.3.1) - Loads environment variables from .env files

# Project Structure
src/
├── index.html                 # Home page
├── catGallery.html           # Cat breed gallery
├── createEvent.html          # Event creation form
├── event.html                # Single event details page
├── css/
│   └── styles.css            # Global styles
├── js/
│   ├── home.js              # Home page logic
│   ├── catGallery.js        # Cat gallery logic
│   ├── createEvent.js       # Event creation logic
│   ├── event.js             # Single event page logic
│   ├── navbar.js            # Navigation component
│   ├── general.js           # Global utilities
│   └── services/
│       └── formValidation/
│           └── validateEvent.js  # Form validation
├── assets/
│   └── images/
│       └── thumb-images/
└── data/   

# API Integration:
API Integration
TheCatAPI - Provides cat breed information and images
    - Requires API key in .env or .env.production
    - Used for fetching breed data and carousel images

# Development Notes
Hot reload is enabled during development with npm run watch
All CSS and JS is bundled by webpack
Bootstrap 5 utilities are used for responsive design and components