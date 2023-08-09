import React, { useState, useRef } from 'react';
import music from '../../assets/audios/1.mp3'
import image from '../../assets/images/music-covers/1.jpg';
import './Player.css'

const Player = () => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleBack = () => {
    };

    const handleNext = () => {
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

    return (
        <div className="music-player rounded-bottom">
        <img src={image} alt="Music cover" />
        <div className="music-infoPlayer">
            <p className="music-name">On my way</p>
            <p className="artist">Alan walker</p>
        </div>
        <audio
            ref={audioRef}
            src={music}
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
