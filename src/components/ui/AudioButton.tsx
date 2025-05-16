import { useState, useRef } from 'react';

interface AudioButtonProps {
  audioUrl: string;
}

const AudioButton = ({ audioUrl }: AudioButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-500 transition-colors"
      aria-label={isPlaying ? 'Pausar pronunciación' : 'Reproducir pronunciación'}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 3.5L12.5 8L3.5 12.5V3.5Z" fill="currentColor" />
      </svg>
    </button>
  );
};

export default AudioButton;