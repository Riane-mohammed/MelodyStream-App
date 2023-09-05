import React, { useState, useEffect } from 'react';
import './LikedSongs.css'
import BtnCircle from '../../../components/buttons/btn-circle/btn-circle';
import PlayHeader from '../../../components/Playlistcomponents/PlayHeader/PlayHeader';
import SongsHeader from '../../../components/Playlistsongheader/SongsHeader';
import PlaylistSongInfo from '../../../components/PlaylistSongInfo/PlaylistSongInfo';
import axios from 'axios';
import imageLike from '../../../assets/images/playlist-covers/liked-songs.png'

const LikedSongs = () => {
    const userid = localStorage.getItem("userId");
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/users/${userid}`)
                .then(response => {
                    setUser(response.data);
                    setLoadingUser(false)
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setLoadingUser(false)
                });
        }
    }, [userid]);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:8081/getLikedSongs/${userid}`)
                .then(response => {
                    const LikedSongs = response.data.LikedSongs;
                    setSongs(LikedSongs);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching LikedSongs:', error);
                    setLoading(false);
                });
        }
    }, [userid]);

    return (
        <>{ !loading && !loadingUser ? (
            <div className='artist-content'>
                <PlayHeader image={imageLike} title='Liked Songs' username={user.username} number={songs.length} />
                <BtnCircle icon='bx-play' />
                <SongsHeader />
                {songs.map((song,index) => (
                    <PlaylistSongInfo key={song.song_id} index={index + 1} title={song.title} duration={song.duration} songId={song.song_id} />
                ))}

                <div className='bottomPage'></div>
            </div >
        ) :
        ''
        }
        </>
    )
}

export default LikedSongs