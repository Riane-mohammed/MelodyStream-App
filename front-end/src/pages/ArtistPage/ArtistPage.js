import React from 'react'
import './ArtistPage.css'
import image from '../../assets/images/profiles/1.jpg'
import ArtHeader from '../../components/Artistcomponents/ArtHeader/ArtHeader'
import BtnCircle from '../../components/buttons/btn-circle/btn-circle';
import MusicInfo from '../../components/musicInfo/musicInfo';
import MusicCard from '../../components/Cards/MusicCard/MusicCard';
import img1 from '../../assets/images/music-covers/1.jpg'
import img2 from '../../assets/images/music-covers/2.jpg'
import img3 from '../../assets/images/music-covers/3.jpg'
import img4 from '../../assets/images/music-covers/4.jpg'
import img5 from '../../assets/images/music-covers/5.jpg'


function ArtistPage() {
    let number = '100.000';
    let music = [
        {
            name: 'Perfect',
            PlayNumber: '2,573,574,092',
            duration: '4:23'
        },
        {
            name: 'Eyes Closed',
            PlayNumber: '273,574,092',
            duration: '3:43'
        },
        {
            name: 'Shape of You',
            PlayNumber: '3,573,785,872',
            duration: '2:23'
        },
        {
            name: 'Shievers',
            PlayNumber: '573,574,092',
            duration: '3:23'
        },
        {
            name: 'Photograph',
            PlayNumber: '2,232,574,092',
            duration: '3:23'
        }
    ]
    return (
        <div className='artist-content'>
            <ArtHeader image={image} icon='bxs-badge-check' name='Ed Sheerane' type='Artist' subtitle={`${number} monthly listeners`} />
            <BtnCircle icon='bx-play' />
            <h1 className='mx-5'>Popular</h1>
            <div className='topMusic my-5'>
                {music.map((song, index) => (
                    <MusicInfo key={index} index={index} image={image} name={song.name} PlayNumber={song.PlayNumber} duration={song.duration} />
                ))}
            </div>
            <h1 className='ms-5 mb-5'>PlayLists</h1>
            <div className='d-flex justify-content-evenly'>
                <MusicCard image={img1} title='On My Way' subtitle='Alan Walker' />
                <MusicCard image={img2} title='Fade' subtitle='Alan Walker' />
                <MusicCard image={img3} title='Cartoon On & On' subtitle=' Daniel Levi' />
                <MusicCard image={img4} title='Warriyo' subtitle='Mortals' />
                <MusicCard image={img5} title='Gazi' subtitle='Ertugrul' />
            </div>
            <div className='bottomPage'></div>
        </div>
    )
}

export default ArtistPage