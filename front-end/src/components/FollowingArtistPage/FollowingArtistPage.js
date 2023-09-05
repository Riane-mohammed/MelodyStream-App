import React, { useState, useEffect } from 'react';
import MusicInfo from '../musicInfo/musicInfo'
import PlaylistCard from '../Cards/PlaylistCard/PlaylistCard'
import axios from 'axios'
import './FollowingArtistPage.css'

const FollowingArtistPage = (props) => {
    const artistId = props.artistid;
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingsongs, setLoadingsongs] = useState(true);
    const [loadingplaylists, setLoadingplaylists] = useState(true);

    useEffect(() => {
        if (artistId) {
            axios.get(`http://localhost:8081/users/${artistId}`)
                .then(response => {
                    setArtist(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching artists:', error);
                    setLoading(false);
                });
            
            axios.get(`http://localhost:8081/allsongs/${artistId}`)
                .then(response => {
                    setSongs(response.data);
                    setLoadingsongs(false);
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setLoadingsongs(false);
                });
                
            axios.get(`http://localhost:8081/allplaylists/${artistId}`)
                .then(response => {
                    setPlaylists(response.data);
                    setLoadingplaylists(false);
                })
                .catch(error => {
                    console.error('Error fetching songs:', error);
                    setLoadingplaylists(false);
                });

        }
    }, [artistId]);

    return (
        <>{ !loading && !loadingsongs && !loadingplaylists ? (
        <div className='FollowingArtistPage-content'>
            <h1 className='mx-5'>Popular</h1>
            <div className='topMusic my-5'>
                {songs.map((song,index) => (
                    <MusicInfo key={song.song_id} index={index} image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} name={song.title} PlayNumber={song.views_count} duration={song.duration} />
                ))}
            </div>
            <h1 className='ms-5 mb-5'>PlayLists</h1>
            <div className='card-container'>
                {playlists.map((playlist) => (
                    <PlaylistCard playlistId={playlist.playlist_id} image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={artist.username} playlistid={playlist.playlist_id}/>
                ))}
            </div>
        </div >
        ) :
        ''
        }
            <div className='bottomPage'></div>
        </>
    )
}

export default FollowingArtistPage