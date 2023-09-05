import React, { useState, useEffect } from 'react';
import './Popularplaylists.css'
import PlaylistCard from '../../../components/Cards/PlaylistCard/PlaylistCard';

const Popularplaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loadingplaylists, setLoadingplaylists] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/PopularPlaylists')
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingplaylists(false);
    }, []);

    return (
        <>
            {!loadingplaylists ? (
                <div className='PopularPlaylists'>
                    <h1 className='m-5 me-0'>Popular Playlists</h1>
                    <div className='card-container'>
                        {playlists.slice(0, 50).map(playlist => (
                            <div key={playlist.playlist_id}>
                                <PlaylistCard image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={playlist.username} playlistid={playlist.playlist_id} />
                            </div>
                        ))}
                    </div>
                    <div className='bottomPage'></div>
                </div>
            ) : ''}
        </>
    );
}

export default Popularplaylists