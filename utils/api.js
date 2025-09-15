import { apiQueue } from './apiQueue';

const CACHE = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 минут

export const fetchWithCache = async (url, priority = false) => {
  const now = Date.now();
  const cached = CACHE.get(url);
  
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  return apiQueue.add(async () => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      CACHE.set(url, { data, timestamp: now });
      
      return data;
    } catch (error) {
      if (cached) {
        return cached.data; // Возвращаем устаревшие данные при ошибке
      }
      throw error;
    }
  }, priority);
};