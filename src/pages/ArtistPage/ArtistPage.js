import React from 'react'
import image from '../../assets/images/ed-sheeran.jpg'
import ArtHeader from '../../components/Artistcomponents/ArtHeader/ArtHeader'
import BtnCircle from '../../components/buttons/btn-circle/btn-circle';
import MusicInfo from '../../components/musicInfo/musicInfo';

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
        <div className='mb-5'>
            <ArtHeader image={image} name='Ed Sheerane' type='Artist' subtitle={`${number} monthly listeners`} />
            <BtnCircle icon='bx-play' />
            <h1 className='ms-5'>Popular</h1>
            {music.map((song, index) => (
                <MusicInfo key={index} index={index} image={image} name={song.name} PlayNumber={song.PlayNumber} duration={song.duration} />
            ))}
        </div>
    )
}

export default ArtistPage