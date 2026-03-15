/*
  Jason Lewis
  CS233JS W26 Final Project
  03/10/2026

  JS for the create event form
*/

import './general';

const STORAGE_KEY = 'events';

class EventManager {
  // Array of event objects
  events;

  constructor() {
    // Load events from localStorage or start with empty array
    const saved = localStorage.getItem(STORAGE_KEY);
    this.events = saved ? JSON.parse(saved) : [];

    // Bind methods
    this.addEvent = this.addEvent.bind(this);

    // Attach form submit handler
    document.querySelector('#createEventForm').onsubmit = this.addEvent;
  }

  // Adds a new event from form submission
  addEvent(event) {
    event.preventDefault();

    // Get form values
    const eventTitle = document.getElementById('eventTitle').value.trim();
    const largeImageUrl = document.getElementById('largeImageUrl').value.trim();
    const smallImageUrl = document.getElementById('smallImageUrl').value.trim();
    const modalImageUrl = document.getElementById('modalImageUrl').value.trim();
    const eventLocation = document.getElementById('eventLocation').value.trim();
    const eventDate = document.getElementById('eventDate').value.trim();
    const eventTime = document.getElementById('eventTime').value.trim();
    const eventDescription = document.getElementById('eventDescription').value.trim();

    // Create event object
    const newEvent = {
      id: Date.now(), // Simple unique ID
      title: eventTitle,
      largeImageUrl: largeImageUrl,
      smallImageUrl: smallImageUrl,
      modalImageUrl: modalImageUrl,
      location: eventLocation,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
    };

    // Add to array and save
    this.events.push(newEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events));

    // Clear form and show success
    document.querySelector('#createEventForm').reset();
    alert('Event created successfully!');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const eventManager = new EventManager();
});