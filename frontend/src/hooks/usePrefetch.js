import { useEffect } from 'react';
import { getMedia, getMembers, getEvents, getSponsors } from '../services/api';

/**
 * Custom hook for prefetching critical data to improve perceived performance
 * This runs after the initial render to avoid blocking the first paint
 */
export const usePrefetch = () => {
  useEffect(() => {
    // Prefetch critical data after initial render
    const prefetchData = async () => {
      try {
        // Use Promise.allSettled to avoid blocking if one request fails
        await Promise.allSettled([
          getMedia('photo'),
          getMembers(true), // Featured members only
          getEvents(),
          getSponsors()
        ]);
      } catch (error) {
        console.error('Prefetch failed:', error);
      }
    };

    // Delay prefetch to prioritize initial render
    const timer = setTimeout(prefetchData, 2000);
    
    return () => clearTimeout(timer);
  }, []);
};

/**
 * Hook for prefetching specific data when needed
 */
export const usePrefetchOnDemand = () => {
  const prefetchMedia = async () => {
    try {
      await Promise.allSettled([
        getMedia('photo'),
        getMedia('video')
      ]);
    } catch (error) {
      console.error('Media prefetch failed:', error);
    }
  };

  const prefetchHighlights = async () => {
    try {
      // Prefetch highlights data
      await getEvents();
    } catch (error) {
      console.error('Highlights prefetch failed:', error);
    }
  };

  return { prefetchMedia, prefetchHighlights };
};
