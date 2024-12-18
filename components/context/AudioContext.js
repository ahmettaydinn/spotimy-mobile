import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react"
import { Audio } from "expo-av"

const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState(null)
  const [currentSongUrl, setCurrentSongUrl] = useState(null)
  const [currentArtist, setCurrentArtist] = useState("")
  const [currentSong, setCurrentSong] = useState("")
  const [currentSongDuration, setCurrentSongDuration] = useState(0)
  const [currentCountdown, setCurrentCountdown] = useState("00:00")

  const audioRef = useRef(new Audio.Sound()) 

  const togglePlay = async (songUrl, artist, song, duration) => {
    if (audioRef.current) {
      if (currentSongUrl !== songUrl) {
        try {
          const { sound } = await Audio.Sound.createAsync({ uri: songUrl })
          setCurrentSound(sound)
          setCurrentSongUrl(songUrl)
          setCurrentArtist(artist)
          setCurrentSong(song)
          setCurrentSongDuration(duration)
          setIsPlaying(true)
          await sound.playAsync()
        } catch (error) {
          console.error("Error loading the audio:", error)
        }
      } else {
        try {
          if (isPlaying) {
            await currentSound.pauseAsync()
            setIsPlaying(false)
          } else {
            await currentSound.playAsync()
            setIsPlaying(true)
          }
          setIsPlaying(!isPlaying)
        } catch (error) {
          console.error("Error toggling audio:", error)
        }
      }
    }
  }

  useEffect(() => {
    let interval
    if (isPlaying && audioRef.current) {
      interval = setInterval(() => {
        const remainingTime =
          audioRef.current.duration - audioRef.current.currentTime
        setCurrentCountdown(formatTime(remainingTime))
      }, 1000)
    } else if (!isPlaying && interval) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentSongUrl])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        currentSongUrl,
        currentArtist,
        currentSong,
        currentSongDuration,
        currentCountdown,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  return useContext(AudioContext)
}
