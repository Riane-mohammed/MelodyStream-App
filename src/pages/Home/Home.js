import React from 'react'
import './Home.css'
import MusicCard from '../../components/Cards/MusicCard/MusicCard'
import Recently from '../../assets/images/playlist-covers/recently-played.png'
import img1 from '../../assets/images/music-covers/1.jpg'
import img2 from '../../assets/images/music-covers/2.jpg'
import img3 from '../../assets/images/music-covers/3.jpg'
import img4 from '../../assets/images/music-covers/4.jpg'
import img5 from '../../assets/images/music-covers/5.jpg'
import ArtistCard from '../../components/Cards/ArtistCard/ArtistCard'
import edSheeran from '../../assets/images/profiles/ed-sheeran.jpg'
import ArianaGrande from '../../assets/images/profiles/ArianaGrande.jpg'
import Rihanna from '../../assets/images/profiles/Rihanna.jpg'
import brunoMars from '../../assets/images/profiles/bruno mars.jpg'
import travisScott from '../../assets/images/profiles/travisScott.jpg'
import play1 from '../../assets/images/playlist-covers/play1.jpg'
import play2 from '../../assets/images/playlist-covers/play2.jpg'
import play3 from '../../assets/images/playlist-covers/play3.jpg'
import play4 from '../../assets/images/playlist-covers/play4.jpg'
import play5 from '../../assets/images/playlist-covers/play5.jpg'


function Home() {
    return (
        <div className='Home'>
            <div className='Home-section'>
                <h3>Recently Played</h3>
                <MusicCard image={Recently} title='Recently Played' />
            </div>
            <div className='Home-section'>
                <h3>Popular Songs</h3>
                <div className='d-flex justify-content-between'>
                    <MusicCard image={img1} title='On My Way' subtitle='Alan Walker' />
                    <MusicCard image={img2} title='Fade' subtitle='Alan Walker' />
                    <MusicCard image={img3} title='Cartoon On & On' subtitle=' Daniel Levi' />
                    <MusicCard image={img4} title='Warriyo' subtitle='Mortals' />
                    <MusicCard image={img5} title='Gazi' subtitle='Ertugrul' />
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