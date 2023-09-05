import React, { useState, useEffect } from 'react';
import './Song.css';
import MusicCard from '../../../components/Cards/MusicCard/MusicCard';

const AllSongs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/songs`)
            .then(response => response.json())
            .then(data => {
                setAllSongs(data);
                setDisplayedSongs(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredSongs = allSongs.filter(
            song => song.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedSongs(filteredSongs);
    };

    return (
        <div className='AllSongs'>
            <h1 className='m-5 me-0'>Songs</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='ms-3 ms-sm-5 '>
                    <li className="search-box">
                        <i className="bx bx-search icon"></i>
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </li>
                </div>
            </div>
            <div className='card-container'>
                {displayedSongs.slice(0, 50).map(song => (
                    <div key={song.song_id} className='m-2'>
                        <MusicCard image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} title={song.title} subtitle={song.username} songId={song.song_id} />
                    </div>
                ))}
            </div>
            <div className='bottomPage'></div>
        </div>
    );
};

export default AllSongs;
