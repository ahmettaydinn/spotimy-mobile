import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetchSongs = (url) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(url);
        setSongs(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          console.error("No response:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchSongs();
  }, []);

  return songs;
};

export default useFetchSongs;
