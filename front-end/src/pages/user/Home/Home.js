import React, { useState, useEffect } from 'react';
import MusicCard from '../../../components/Cards/MusicCard/MusicCard'
import Recently from '../../../assets/images/playlist-covers/recently-played.png'
import ArtistCard from '../../../components/Cards/ArtistCard/ArtistCard'
import PlaylistCard from '../../../components/Cards/PlaylistCard/PlaylistCard';
import './Home.css'
import { Link } from 'react-router-dom';


function Home() {
    const userid = localStorage.getItem("userId");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [number, setNumber] = useState(window.innerWidth <= 768 ? 6 : 5);
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loadingsongs, setLoadingsongs] = useState(true);
    const [loadingplaylists, setLoadingplaylists] = useState(true);
    const [loadingartists, setLoadingartists] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8081/PopularSongs')
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingsongs(false);
    }, []);
    
    useEffect(() => {
        fetch('http://localhost:8081/PopularPlaylists')
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingplaylists(false);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/PopularArtists`)
            .then(response => response.json())
            .then(data => setArtists(data))
            .catch(error => console.error('Error fetching data:', error));
        setLoadingartists(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
            setNumber(newWidth <= 768 ? 6 : 5);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>{!loadingsongs && !loadingplaylists && !loadingartists ? (
        <div className='Home'>
            <div className='Home-section'>
                    <h2>Recently Played</h2>
                    <div className='ms-0'>
                        <PlaylistCard image={Recently} title='Recently Played' playlistid='Recently-Played' />
                    </div>
            </div>
            <div className='Home-section'>
                <div className='d-flex justify-content-between'>
                    <h2>Popular Songs</h2>
                    <Link to='Popular-Songs' className='s-more d-flex align-items-start me-5 mt-2'>
                        <p className='m-0'>Show more</p>
                        <i class='bx bx-right-arrow-alt fs-3'></i>
                    </Link>
                </div>
                <div className='card-container'>
                    {songs.slice(0, number).map(song => (
                        <div key={song.song_id}>
                            <MusicCard image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} title={song.title} subtitle={song.username} songId={song.song_id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='Home-section'>
                <div className='d-flex justify-content-between'>
                    <h2>Popular Playlists</h2>
                    <Link to='Popular-Playlists' className='s-more d-flex align-items-start me-5 mt-2'>
                        <p className='m-0'>Show more</p>
                        <i class='bx bx-right-arrow-alt fs-3'></i>
                    </Link>
                </div>
                <div className='card-container'>
                    {playlists.slice(0, number).map(playlist => (
                        <div key={playlist.playlist_id}>
                            <PlaylistCard image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={playlist.username} playlistid={playlist.playlist_id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='Home-section'>
                <div className='d-flex justify-content-between'>
                    <h2>Popular Artists</h2>
                    <Link to='Popular-Artists' className='s-more d-flex align-items-start me-5 mt-2'>
                        <p className='m-0'>Show more</p>
                        <i class='bx bx-right-arrow-alt fs-3'></i>
                    </Link>
                </div>
                <div className='card-container'>
                    {artists.slice(0, number).map(artist => (
                        <div key={artist.id}>
                            <ArtistCard image={`http://localhost:8081/uploads/images/Profiles/${artist.profileImage}`} title={artist.username} artistId={artist.id} />
                        </div>
                    ))}
                </div>
                <div className='bottomHomePage'></div>
                </div>
            </div>
        ): 
        '' 
        }</>
    )
}

export default Home