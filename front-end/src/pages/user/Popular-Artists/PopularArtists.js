import React, { useState, useEffect } from 'react';
import './PopularArtists.css'
import ArtistCard from '../../../components/Cards/ArtistCard/ArtistCard';

const PopularArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loadingartists, setLoadingartists] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8081/PopularArtists`)
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingartists(false);
    }, []);

    return (
        <>
            {!loadingartists ? (
                <div className='PopularArtists'>
                    <h1 className='m-5 me-0'>Polpular Artists</h1>
                    <div className='card-container'>
                        {artists.map(artist => (
                            <div key={artist.id}>
                                <ArtistCard image={`http://localhost:8081/uploads/images/Profiles/${artist.profileImage}`} title={artist.username} artistId={artist.id} />
                            </div>
                        ))}
                    </div>
                    <div className='bottomPage'></div>
                </div>
            ) : ''}
        </>
    );
}

export default PopularArtists