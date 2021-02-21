/*
 * Helper functions for converting the contents of localstorage to usable objects
 */
const historyKey = "conversionHistory";

export const getStoredConversionHistory = () => {
  const storedHistory = localStorage.getItem(historyKey);
  return storedHistory ? JSON.parse(storedHistory) : [];
}

export const setStoredConversionHistory = (history) => {
  localStorage.setItem(historyKey, JSON.stringify(history));
}