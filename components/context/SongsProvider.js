import React, { createContext, useState, useEffect } from "react";
import database from "@react-native-firebase/database";

export const SongsContext = createContext();

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const reference = database().ref("/songs");
    const onValueChange = reference.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data) {
          const songArray = Object.values(data);
          setSongs(songArray);
        }
      }
    });

    return () => reference.off("value", onValueChange);
  }, []);

  return (
    <SongsContext.Provider value={{ songs }}>{children}</SongsContext.Provider>
  );
};
