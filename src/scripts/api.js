// src/scripts/api.js

export const fetchData = async (url, options = {}) => {
  console.log("Loading..."); 

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch error:", error);
    return null; 
  }
};