import React, { useState, useEffect } from 'react';
import './Playlists.css';
import PlaylistCard from '../../../components/Cards/PlaylistCard/PlaylistCard';

const Playlists = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
    const options = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
        { value: '4', label: 'Four' },
        { value: '5', label: 'Five' }
    ];

    useEffect(() => {
        fetch('http://localhost:8081/playlists')
            .then(response => response.json())
            .then(data => {
                setPlaylists(data)
                setDisplayedPlaylists(data)
                setLoadingPlaylists(false);
            })
            .catch(error => console.error('Error fetching data:', error));
            setLoadingPlaylists(false);
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredPlaylists = playlists.filter(
            playlist => playlist.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedPlaylists(filteredPlaylists);
    };

    return (
        <div className='AllPlaylists'>
            <h1 className='m-5 me-0'>Playlists</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='ms-3 ms-sm-5'>
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
                {displayedPlaylists.slice(0, 50).map(playlist => (
                    <div key={playlist.playlist_id}>
                        <PlaylistCard image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={playlist.username} playlistid={playlist.playlist_id} />
                    </div>
                ))}
            </div>
            <div className='bottomPage'></div>
        </div>
    );
}

export default Playlists;
