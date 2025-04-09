
// Simple API service for ClubHive frontend
import { toast } from 'sonner';

// Set the API_URL based on the environment
// In development, use localhost, in production use the server URL
const API_URL = import.meta.env.PROD 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:3001/api';

// Helper function for fetch requests
const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // Handle API not available (likely backend not running)
    if (!response.ok && response.status === 404) {
      throw new Error('API not available. Make sure the backend server is running.');
    }
    
    // Handle network errors
    if (!response.ok && !response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Network error. Could not connect to server.');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    // Special handling for when the API is not available (likely backend not running)
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.error('API Connection Error:', error);
      toast.error('Cannot connect to server. Please ensure the backend is running at ' + API_URL);
    } else {
      toast.error(error.message || 'Failed to complete request');
    }
    throw error;
  }
};

// Fallback to mock auth if API is unavailable
const mockAuth = async (email, password) => {
  console.log('Using mock authentication as fallback');
  const mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Student User',
      email: 'student@example.com',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
  ];

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  const user = mockUsers.find(u => u.email === email && password === 'password123');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  return { user };
};

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      return await fetchWithErrorHandling(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      // If API call fails, try mock auth as fallback
      if (error.message.includes('Cannot connect to server') || 
          error.message.includes('Failed to fetch') || 
          error.message.includes('NetworkError')) {
        return mockAuth(email, password);
      }
      throw error;
    }
  },
  
  register: async (name, email, password, role) => {
    try {
      return await fetchWithErrorHandling(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
    } catch (error) {
      // If API call fails during registration, we don't have a fallback
      // since registration requires storing data
      throw error;
    }
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
