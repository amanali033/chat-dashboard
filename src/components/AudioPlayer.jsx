import { useState, useRef, useEffect } from "react";
import { PlayArrow, Pause } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const AudioPlayer = ({ src, index, playingIndex, setPlayingIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const rangeRef = useRef(null); // Ref for the range input

  useEffect(() => {
    const audio = audioRef.current;
    const updateMetadata = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      updateProgressBar(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", updateMetadata);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    if (playingIndex !== index) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [playingIndex, index]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
        updateProgressBar(audioRef.current.currentTime);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value); // Ensure it's a number
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const updateProgressBar = (time) => {
    if (rangeRef.current) {
      const progress = (time / duration) * 100 || 0;
      rangeRef.current.style.background = `linear-gradient(to right, #146ef5 ${progress}%, #d3d3d3 ${progress}%)`;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "white",
        padding: "0.20rem 1.5rem 0.20rem 0.75rem",
        border: "1px solid #ced3da",
        borderRadius: "30px",
        width: "fit-content",
      }}
    >
      <IconButton onClick={togglePlay}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>

      <input
        type="range"
        ref={rangeRef}
        min="0"
        max={duration || 1}
        value={currentTime}
        onChange={handleSeek}
        className="progress-bar"
      />

      <span
        style={{
          minWidth: "31.5px",
          textAlign: "right",
        }}
      >
        {formatTime(currentTime)}
      </span>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
