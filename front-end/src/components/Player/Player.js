import React, { useState, useRef, useEffect } from 'react';
import './Player.css';
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';

const Player = (props) => {
    const userid = localStorage.getItem("userId");
    const { state } = useStateProvider();
    let { songid } = state;
    
    useEffect(() => {
        songid = state.songid;
    }, [state.songid]);

    const [song, setSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [loadingSongs, setLoadingSongs] = useState(true);
    const [userLikedSong, setUserLikedSong] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        if (songid) {
            axios.get(`http://localhost:8081/checkLikeStatusSong/${songid}/${userid}`)
                .then(response => {
                    setUserLikedSong(response.data.isLiked);
                })
                .catch(error => {
                    console.error('Error fetching like status:', error);
                });
        }
    }, [songid, userid]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        // Implement logic to play the next song.
    };

    const handleBack = () => {
        // Implement logic to play the previous song.
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
                const response = await axios.get(`http://localhost:8081/song/${songid}`);
                setSong(response.data);
                setLoadingSongs(false);
            } catch (error) {
                console.error('Error fetching song details:', error);
                setLoadingSongs(false);
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
    }, [songid, song.file]);

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const handleLikeClick = () => {
        if (userLikedSong) {
            // Unlike
            axios.delete(`http://localhost:8081/unLikeSong/${userid}/${songid}`)
                .then(response => {
                    setUserLikedSong(false);
                })
                .catch(error => {
                    console.error('Error unliking song:', error);
                });
        } else {
            // Like
            axios.post(`http://localhost:8081/likeSong`, {
                userId: userid,
                songId: songid
            })
                .then(response => {
                    setUserLikedSong(true);
                })
                .catch(error => {
                    console.error('Error liking song:', error);
                });
        }
    };

    return (
        <>{!loadingSongs ? (
            <div className="music-player rounded-bottom row">
                <img className='col-2' src={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} alt="Music cover" />
                <div className="music-infoPlayer col-2">
                    <p className="music-name">{song.title}</p>
                    <p className="artist">{song.username}</p>
                </div>
                {userLikedSong ? (
                    <i className='bx bxs-heart player-icon col-1 text-danger' onClick={handleLikeClick}></i>
                ) : (
                    <i className='bx bx-heart player-icon col-1' onClick={handleLikeClick}></i>
                )}
                <audio
                    ref={audioRef}
                    src={`http://localhost:8081/uploads/audios/${song.file}`}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleNext}
                />
                <div className='seek-cont col-5 d-flex flex-column justify-content-center align-items-center'>
                    <div className="controls">
                        <button onClick={handleBack}><i className='bx bx-skip-previous fs-2'></i></button>
                        <button onClick={handlePlayPause}><i className={`bx bx-${isPlaying ? 'pause' : 'play'} fs-2 `}></i></button>
                        <button onClick={handleNext}><i className='bx bx-skip-next fs-2' ></i></button>
                    </div>
                    <div className="seek-bar">
                        <input
                            type="range"
                            min={0}
                            max={audioRef.current && audioRef.current.duration}
                            value={currentTime}
                            onChange={handleSeek}
                        />
                    </div>
                </div>
                <div className="volume-bar col-2 d-flex">
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
        ) : ''}</>
    );
};

export default Player;
