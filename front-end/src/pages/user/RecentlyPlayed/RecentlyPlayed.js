import React, { useState, useEffect } from 'react';
import PlayHeader from '../../../components/Playlistcomponents/PlayHeader/PlayHeader';
import BtnCircle from '../../../components/buttons/btn-circle/btn-circle';
import SongsHeader from '../../../components/Playlistsongheader/SongsHeader';
import PlaylistSongInfo from '../../../components/PlaylistSongInfo/PlaylistSongInfo';
import image from '../../../assets/images/playlist-covers/recently-played.png'
import axios from 'axios';

const RecentlyPlayed = () => {
    const userid = localStorage.getItem("userId");
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/getLastestPlayedSongs/${userid}`)
                .then(response => {
                    const RecentlyPlayed = response.data.LatestPlayed;
                    setSongs(RecentlyPlayed);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching Recently Played:', error);
                    setLoading(false);
                });
        }
    }, [userid]);

    console.log()

    return (
        <>{!loading ? (
            <div className='artist-content'>
                <PlayHeader image={image} title='Recently Played' username='By Me' date={songs[0].Created_at.substring(0, 4)} number={songs.length} />
                <div className='playLike d-flex align-items-center'>
                    <BtnCircle icon='bx-play' />
                </div>
                <SongsHeader />
                {songs.slice(0, 50).map((song, index) => (
                    <PlaylistSongInfo key={song.song_id} index={index + 1} title={song.title} artist={song.username} duration={song.duration} songId={song.song_id} />
                ))}

                <div className='bottomPage'></div>
            </div >
        ) :
            ''
        }
        </>
    );
}

export default RecentlyPlayed