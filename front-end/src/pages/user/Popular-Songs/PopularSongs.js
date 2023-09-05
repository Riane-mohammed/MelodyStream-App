import React, { useState, useEffect } from 'react';
import './PopularSongs.css'
import MusicCard from '../../../components/Cards/MusicCard/MusicCard';

const PopularSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loadingsongs, setLoadingsongs] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/PopularSongs')
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingsongs(false);
    }, []);

    console.log(songs)

    return (
        <>
            {!loadingsongs ? (
                <div className='PolpularSongs'>
                    <h1 className='m-5 me-0'>Popular Songs</h1>
                    <div className='card-container'>
                        {songs.slice(0, 50).map(song => (
                            <div key={song.song_id} className='m-2'>
                                <MusicCard image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} title={song.title} subtitle={song.username} songId={song.song_id} />
                            </div>
                        ))}
                    </div>
                    <div className='bottomPage'></div>
                </div>
            ) : ''}
        </>
    );
}

export default PopularSongs