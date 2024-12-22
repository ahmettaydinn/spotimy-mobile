import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSongLyrics = (artist, song) => {
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setLyrics(response.data.lyrics);
        setError(null);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Şarkı sözleri bulunamadı.");
        setLyrics("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [artist, song]);

  return { lyrics, error, isLoading };
};

export default useFetchSongLyrics;
