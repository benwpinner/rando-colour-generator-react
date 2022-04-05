import { MainColour } from '../types';

/**
 * Retrieves likes from localStorage
 * @returns The likes retrieved from localStorage
 */
export const getLikesFromLocalStorage = (): MainColour[] => {
  const likes = localStorage.getItem('likes');

  return likes ? JSON.parse(likes) : [];
};

/**
 * Saves the likes data to localStorage
 * @param likes The user's likes data to be saved
 * @returns true if successful, false if an error is thrown
 */
export const setLikesInLocalStorage = (likes: MainColour[]): boolean => {
  try {
    localStorage.setItem('likes', JSON.stringify(likes));
    return true;
  } catch {
    return false;
  }
};
