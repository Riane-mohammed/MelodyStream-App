import React, { useState, useEffect } from 'react';
import './LikedPlaylists.css'
import PlaylistCard from '../../../components/Cards/PlaylistCard/PlaylistCard';

const LikedPlaylists = () => {
    const userid = localStorage.getItem("userId");
    const [playlists, setPlaylists] = useState([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8081/LikedPlaylist/${userid}`)
            .then(response => response.json())
            .then(data => {
                setPlaylists(data)
                setLoadingPlaylists(false);
            })
            .catch(error => console.error('Error fetching data:', error));
            setLoadingPlaylists(false);
    }, []);

    return (
        <>{ !loadingPlaylists ? (
        <div className='AllPlaylists'>
            <h1 className='m-5 me-0'>Liked Playlists</h1>
            <div className='card-container'>
                {playlists.slice(0, 50).map(playlist => (
                    <div key={playlist.playlist_id}>
                        <PlaylistCard image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={playlist.username} playlistid={playlist.playlist_id} />
                    </div>
                ))}
            </div>
            <div className='bottomPage'></div>
        </div>
            ) : ''}</>
    );
}

export default LikedPlaylists