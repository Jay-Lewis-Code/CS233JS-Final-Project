/*
  Jason Lewis
  CS233JS Final Project
  03/10/2026

  JS for the Cat Gallery Page

*/

import './general';

// Access the global variable
const apiKey = CAT_API_KEY;

/**
  Fetch breeds from TheCatAPI
    @param {number} limit - Number of breeds to fetch
    @returns {Promise<Array>} Array of breed objects
*/
async function fetchBreeds(limit = 3) {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds?limit=${limit}`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch breeds');
    return await response.json();
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return [];
  }
}

/**
  Fetch images for a specific breed
    @param {string} breedId - The breed ID to filter by
    @param {number} limit - Number of images to fetch
    @returns {Promise<Array>} Array of image objects
*/
async function fetchBreedImages(breedId, limit = 5) {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=${limit}`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch breed images');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching images for breed ${breedId}:`, error);
    return [];
  }
}

/**
  Creates carousel HTML for breed images
    @param {string} breedId - The breed of cat for this carousel
    @param {Array} images - Array of image objects
    @returns {string} HTML string for carousel
*/
function createCarousel(breedId, images) {
  if (images.length === 0) {
    return `<div class="bg-light d-flex align-items-center justify-content-center" style="height: 300px;">
              <p class="text-muted">No images available</p>
            </div>`;
  }

  // Create carousel items
  const carouselItems = images
    .map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image.url}" class="d-block w-100" alt="cat" style="height: 300px; object-fit: cover;">
      </div>
    `)
    .join('');

  return `
    <div id="carousel-${breedId}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${carouselItems}
      </div>
      ${images.length > 1 ? `
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${breedId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${breedId}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      ` : ''}
    </div>
  `;
}

/**
  Create breed information section
    @param {Object} breed - Breed object from API
    @returns {string} HTML string for breed info
*/
function createBreedInfo(breed) {
  return `
    <div class="card-body">
      <h5 class="card-title">${breed.name}</h5>
      <p class="card-text">${breed.description}</p>
      <hr>
      <small>
        ${breed.temperament ? `<p><strong>Temperament:</strong> ${breed.temperament}</p>` : ''}
        ${breed.origin ? `<p><strong>Origin:</strong> ${breed.origin}</p>` : ''}
        ${breed.life_span ? `<p><strong>Life Span:</strong> ${breed.life_span} years</p>` : ''}
        ${breed.weight ? `<p><strong>Weight:</strong> ${breed.weight.metric} kg</p>` : ''}
      </small>
      ${breed.wikipedia_url ? `
        <hr>
        <a href="${breed.wikipedia_url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">
          Learn More on Wikipedia
        </a>
      ` : ''}
    </div>
  `;
}

/**
  Create a complete breed card
    @param {Object} breed - Breed object from API
    @param {Array} images - Array of image objects for this breed
    @returns {string} HTML string for complete card
*/
function createBreedCard(breed, images) {
  const carousel = createCarousel(breed.id, images);
  const info = createBreedInfo(breed);

  return `
    <div class="col-12 col-md-4">
      <div class="card shadow h-100">
        ${carousel}
        ${info}
      </div>
    </div>
  `;
}

/**
  Render the entire gallery
*/
async function renderGallery() {
  const galleryContainer = document.getElementById('catGallery');
  
  if (!galleryContainer) {
    console.error('Gallery container not found');
    return;
  }

  // Show loading state
  galleryContainer.innerHTML = '<p class="text-center">Loading cat breeds...</p>';

  // Fetch breeds
  const breeds = await fetchBreeds(3);

  if (breeds.length === 0) {
    galleryContainer.innerHTML = '<p class="text-danger">Failed to load cat breeds</p>';
    return;
  }

  // Fetch images for each breed and create cards
  const cardsHTML = await Promise.all(
    breeds.map(async (breed) => {
      const images = await fetchBreedImages(breed.id, 5);
      return createBreedCard(breed, images);
    })
  ).then(cards => cards.join(''));

  // Render cards to DOM
  galleryContainer.innerHTML = cardsHTML;
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', renderGallery);