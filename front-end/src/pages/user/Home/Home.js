import React, { useState, useEffect } from 'react';
import './Home.css'
import MusicCard from '../../../components/Cards/MusicCard/MusicCard'
import Recently from '../../../assets/images/playlist-covers/recently-played.png'
import ArtistCard from '../../../components/Cards/ArtistCard/ArtistCard'
import edSheeran from '../../../assets/images/profiles/1.jpg'
import ArianaGrande from '../../../assets/images/profiles/2.jpg'
import Rihanna from '../../../assets/images/profiles/4.jpg'
import brunoMars from '../../../assets/images/profiles/3.jpg'
import travisScott from '../../../assets/images/profiles/5.jpg'
import play1 from '../../../assets/images/playlist-covers/play1.jpg'
import play2 from '../../../assets/images/playlist-covers/play2.jpg'
import play3 from '../../../assets/images/playlist-covers/play3.jpg'
import play4 from '../../../assets/images/playlist-covers/play4.jpg'
import play5 from '../../../assets/images/playlist-covers/play5.jpg'


function Home() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/songs')
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    const firstFiveSongs = songs.slice(0, 5);
    console.log(firstFiveSongs)

    return (
        <div className='Home'>
            <div className='Home-section'>
                <h3>Recently Played</h3>
                <MusicCard image={Recently} title='Recently Played' />
            </div>
            <div className='Home-section'>
                <h3>Popular Songs</h3>
                <div className='d-flex justify-content-between'>
                    {firstFiveSongs.map(song => (
                        <div key={song.song_id}>
                            <MusicCard image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} title={song.title} subtitle={song.username} songId={song.song_id} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='Home-section'>
                <h3>Popular playlists</h3>
                <div className='d-flex justify-content-between'>
                    <MusicCard image={play1} title='Relaxing' subtitle='by Arther' />
                    <MusicCard image={play2} title='Old' subtitle='by Smith' />
                    <MusicCard image={play3} title='Party Time' subtitle='by Reda' />
                    <MusicCard image={play4} title='Summer vibe' subtitle='by Caroline' />
                    <MusicCard image={play5} title='Smile' subtitle='by Jassmine' />
                </div>
            </div>
            <div className='Home-section'>
                <h3>Popular Artists</h3>
                <div className='d-flex justify-content-between'>
                    <ArtistCard image={edSheeran} title='Ed Sheeran'/>
                    <ArtistCard image={ArianaGrande} title='Ariana Grande'/>
                    <ArtistCard image={brunoMars} title='Bruno Mars'/>
                    <ArtistCard image={Rihanna} title='Rihanna'/>
                    <ArtistCard image={travisScott} title='Travis Scott'/>
                </div>
            </div>
        </div>
    )
}

export default Home