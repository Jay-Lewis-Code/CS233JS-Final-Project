/*
  Jason Lewis
  CS233JS W26 Final Project
  03/10/2026

  JS for the Home Page (index.html)
*/

import './general';

const STORAGE_KEY = 'events';

class EventDisplay {
  constructor() {
    this.events = this.loadEvents();
    this.displayEvents();
  }

  loadEvents() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  displayEvents() {
    const container = document.querySelector('.events-container');
    
    if (this.events.length === 0) {
      container.innerHTML = '<p>No events yet. Create one to get started!</p>';
      return; // Exit before creating modal
    }

    let eventsHtml = this.events.map(event => `
      <button type="button" class="list-group-item list-group-item-action p-3 border mb-3" data-bs-toggle="modal" data-bs-target="#eventModal" data-event-id="${event.id}">
        <div class="d-flex gap-3">
          <img src="${event.smallImageUrl}" alt="${event.title}" class="rounded" style="width: 120px; height: 120px; object-fit: cover;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${event.title}</h5>
            <p class="text-secondary mb-2">${event.description}</p>
            <p class="small text-muted mb-0"><strong>${event.time}</strong> • ${event.date}</p>
            <p class="small text-muted">${event.location}</p>
          </div>
        </div>
      </button>
    `).join('');

    container.innerHTML = eventsHtml;
    this.setupModal();
  }

  createModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      new bootstrap.Modal(modal).show();
    }
  }

  setupModal() {
    const eventButtons = document.querySelectorAll('[data-event-id]');
    eventButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const eventId = button.getAttribute('data-event-id');
        const event = this.events.find(e => e.id == eventId);
        
        if (event) {
          document.getElementById('modalTitle').textContent = event.title;
          document.getElementById('modalDescription').textContent = event.description;
          document.getElementById('modalTime').textContent = event.time;
          document.getElementById('modalDate').textContent = event.date;
          document.getElementById('modalLocation').textContent = event.location;
          document.getElementById('modalMap').src = event.modalImageUrl;
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new EventDisplay();
});