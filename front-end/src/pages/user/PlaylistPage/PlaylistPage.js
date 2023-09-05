import React, { useState, useEffect } from 'react';
import PlayHeader from '../../../components/Playlistcomponents/PlayHeader/PlayHeader'
import BtnCircle from '../../../components/buttons/btn-circle/btn-circle'
import SongsHeader from '../../../components/Playlistsongheader/SongsHeader'
import PlaylistSongInfo from '../../../components/PlaylistSongInfo/PlaylistSongInfo'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import './PlaylistPage.css'


const PlaylistPage = () => {
    const userid = localStorage.getItem("userId");
    const {playlistid } = useParams();
    const [songs, setSongs] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [CreatedBy, setCreatedBy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [userLikedPlaylist, setUserLikedPlaylist] = useState(false);

    useEffect(() => {
        if (playlistid) {
            
            axios.get(`http://localhost:8081/checkLikeStatus/${playlistid}/${userid}`)
                .then(response => {
                    setUserLikedPlaylist(response.data.isLiked);
                })
                .catch(error => {
                    console.error('Error fetching follow status:', error);
                });
        }
    }, [playlistid]);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const [songsResponse, playlistResponse] = await Promise.all([
                    axios.get(`http://localhost:8081/Songs/${playlistid}`),
                    axios.get(`http://localhost:8081/Playlist/${playlistid}`)
                ]);

                setSongs(songsResponse.data);
                setPlaylist(playlistResponse.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching playlist data:', error);
                setLoading(false);
            }
        };

        if (playlistid) {
            fetchPlaylistData();
        }
    }, [playlistid]);

    useEffect(() => {
        const fetchCreatedByData = async () => {
            if (playlist && playlist.created_by) {
                try {
                    const response = await axios.get(`http://localhost:8081/users/${playlist.created_by}`);
                    setCreatedBy(response.data);
                    setLoadingUser(false)
                } catch (error) {
                    console.error('Error fetching created by data:', error);
                    setLoadingUser(false)
                }
            }
        };

        fetchCreatedByData();
    }, [playlist]);

    const handleLikeClick = () => {
        if (userLikedPlaylist) {
            // UnLike
            axios.delete(`http://localhost:8081/unLikePlaylist/${userid}/${playlistid}`)
                .then(response => {
                    setUserLikedPlaylist(false);
                })
                .catch(error => {
                    console.error('Error unLiking playlist:', error);
                });
        } else {
            // Like
            axios.post(`http://localhost:8081/LikePlaylist`, {
                userId: userid,
                playlistId: playlistid
            })
                .then(response => {
                    setUserLikedPlaylist(true);
                })
                .catch(error => {
                    console.error('Error Liking playlist:', error);
                });
        }
    };

    return (
        <>{ !loading && !loadingUser ? (
            <div className='artist-content'>
                <PlayHeader image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} username={CreatedBy.username} date={playlist.created_at.substring(0, 4)} imageProfile={`http://localhost:8081/uploads/images/Profiles/${CreatedBy.profileImage}`} number={songs.length} />
                <div className='playLike d-flex align-items-center'>
                    <BtnCircle icon='bx-play' />
                    {userLikedPlaylist ? (
                        <i class='bx bxs-heart fs-1 text-danger' onClick={handleLikeClick}></i>
                    ) : (
                        <i class='bx bx-heart fs-1' onClick={handleLikeClick}></i>
                    )}
                </div>
                <SongsHeader />
                {songs.map((song,index) => (
                    <PlaylistSongInfo key={song.song_id} index={index + 1} title={song.title} artist={song.username} duration={song.duration} songId={song.song_id} />
                ))}

                <div className='bottomPage'></div>
            </div >
        ) :
        ''
        }
        </>
    )
}

export default PlaylistPage