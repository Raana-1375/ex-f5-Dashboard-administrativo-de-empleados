// api.js

export const fetchData = async (url) => {
  console.log("Loading..."); // Visual feedback for the user

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null to prevent the application from crashing
  }
};