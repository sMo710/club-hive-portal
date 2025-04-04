
// Simple API service for ClubHive frontend
import { toast } from 'sonner';

const API_URL = 'http://localhost:3001/api';

// Helper function for fetch requests
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    toast.error(error.message || 'Failed to complete request');
    throw error;
  }
};

// Auth services
export const authService = {
  login: async (email, password) => {
    return fetchWithErrorHandling(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (name, email, password, role) => {
    return fetchWithErrorHandling(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
  },
};

// Clubs services
export const clubsService = {
  getAll: async () => {
    return fetchWithErrorHandling(`${API_URL}/clubs`);
  },
  
  getById: async (id) => {
    return fetchWithErrorHandling(`${API_URL}/clubs/${id}`);
  },
  
  create: async (clubData) => {
    return fetchWithErrorHandling(`${API_URL}/clubs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clubData),
    });
  },
};

// Events services
export const eventsService = {
  getAll: async () => {
    return fetchWithErrorHandling(`${API_URL}/events`);
  },
  
  getById: async (id) => {
    return fetchWithErrorHandling(`${API_URL}/events/${id}`);
  },
  
  create: async (eventData) => {
    return fetchWithErrorHandling(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
  },
  
  register: async (eventId, userId, answers) => {
    return fetchWithErrorHandling(`${API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    });
  },
  
  getRegistrations: async (eventId) => {
    return fetchWithErrorHandling(`${API_URL}/events/${eventId}/registrations`);
  },
};
