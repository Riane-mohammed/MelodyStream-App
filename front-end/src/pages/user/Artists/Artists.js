import React, { useState, useEffect } from 'react';
import './Artists.css';
import ArtistCard from '../../../components/Cards/ArtistCard/ArtistCard';

const Artists = () => {
    const userid = localStorage.getItem("userId");
    const [searchQuery, setSearchQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [displayedArtists, setDisplayedArtists] = useState([]);
    const [loadingartists, setLoadingartists] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8081/Artists/${userid}`)
            .then(response => response.json())
            .then(data => {
                setArtists(data);
                setDisplayedArtists(data);
                setLoadingartists(false);
            })
            .catch(error => console.error('Error fetching data:', error));
        setLoadingartists(false);
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredArtists = artists.filter(
            artist => artist.username.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedArtists(filteredArtists);
    };

    return (
        <div className='AllArtists'>
            <h1 className='m-5 me-0'>Artists</h1>
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
                {displayedArtists.map(artist => (
                    <div key={artist.id}>
                        <ArtistCard image={`http://localhost:8081/uploads/images/Profiles/${artist.profileImage}`} title={artist.username} artistId={artist.id} />
                    </div>
                ))}
            </div>
            <div className='bottomPage'></div>
        </div>
    );
}

export default Artists;
