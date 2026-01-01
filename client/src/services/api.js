// API service for travel website
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000/api/travel' : 'http://localhost:5000/api/travel';

// Places
export const getPlaces = async () => {
  const response = await fetch(`${API_BASE_URL}/places`);
  if (!response.ok) throw new Error('Failed to fetch places');
  return response.json();
};

export const getPlaceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/places/${id}`);
  if (!response.ok) throw new Error('Failed to fetch place');
  return response.json();
};

// Accommodations
export const getAccommodations = async () => {
  const response = await fetch(`${API_BASE_URL}/accommodations`);
  if (!response.ok) throw new Error('Failed to fetch accommodations');
  return response.json();
};

// Restaurants
export const getRestaurants = async () => {
  const response = await fetch(`${API_BASE_URL}/restaurants`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
};

// Weather
export const getWeather = async (location) => {
  const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(location)}`);
  if (!response.ok) throw new Error('Failed to fetch weather');
  return response.json();
};

// Culture
export const getCulture = async () => {
  const response = await fetch(`${API_BASE_URL}/culture`);
  if (!response.ok) throw new Error('Failed to fetch culture');
  return response.json();
};

// Packing List
export const getPackingList = async () => {
  const response = await fetch(`${API_BASE_URL}/packing`);
  if (!response.ok) throw new Error('Failed to fetch packing list');
  return response.json();
};

export const addPackingItem = async (item) => {
  const response = await fetch(`${API_BASE_URL}/packing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item })
  });
  if (!response.ok) throw new Error('Failed to add packing item');
  return response.json();
};

// Chatbot
export const sendChatMessage = async (message) => {
  const response = await fetch(`${API_BASE_URL}/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
};

// --- URL Shortener API ---
const SHORTENER_BASE = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

export const shortenUrl = async (longUrl) => {
  const response = await fetch(`${SHORTENER_BASE}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ longUrl })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to shorten URL');
  }
  return response.json();
};

export const getUrlStats = async (shortKey) => {
  const response = await fetch(`${SHORTENER_BASE}/${encodeURIComponent(shortKey)}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};
