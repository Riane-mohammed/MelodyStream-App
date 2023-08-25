import React, { useState, useRef, useEffect } from 'react';
import './Player.css';
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';

const Player = (props) => {
    const { state } = useStateProvider();
    const { songid } = state;
    const [song, setSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(new Audio());

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
    };

    const handleBack = () => {
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };


    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    useEffect(() => {
        async function fetchSong() {
            try {
                const response = await axios.get(`http://localhost:8081/songs/${songid}`);
                setSong(response.data);
            } catch (error) {
                console.error('Error fetching song details:', error);
            }
        }

        if (song.file) {
            setIsPlaying(true);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = `http://localhost:8081/uploads/audios/${song.file}`;
            
            audioRef.current.addEventListener('canplaythrough', () => {
                if (isPlaying) {
                    audioRef.current.play();
                }
            });
        }


        fetchSong();
    }, [songid]);

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div className="music-player rounded-bottom">
        <img src={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} alt="Music cover" />
        <div className="music-infoPlayer">
            <p className="music-name">{song.title}</p>
            <p className="artist">{song.username}</p>
        </div>
        <audio
            ref={audioRef}
            src={`http://localhost:8081/uploads/audios/${song.file}`}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleNext}
        />
        <div className="controls">
            <button onClick={handleBack}><i className='bx bx-skip-previous fs-2'></i></button>
            <button onClick={handlePlayPause}><i className={`bx bx-${isPlaying ? 'pause' : 'play'} fs-2 `}></i></button>
            <button onClick={handleNext}><i className='bx bx-skip-next fs-2' ></i></button>
            </div>
            <div className='empty'></div>
        <div className="seek-bar">
            <input
            type="range"
            min={0}
            max={audioRef.current && audioRef.current.duration}
            value={currentTime}
            onChange={handleSeek}
            />
            </div>
            <div className='empty'></div>
            <div className="volume-bar d-flex">
                <i className='bx bx-volume-full fs-4' ></i>
            <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            />
        </div>
        </div>
    );
};

export default Player;