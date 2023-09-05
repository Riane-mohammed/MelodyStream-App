import React, { useState, useEffect } from 'react';
import './ArtistPage.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ArtHeader from '../../../components/Artistcomponents/ArtHeader/ArtHeader'
import BtnCircle from '../../../components/buttons/btn-circle/btn-circle';
import MusicInfo from '../../../components/musicInfo/musicInfo';
import PlaylistCard from '../../../components/Cards/PlaylistCard/PlaylistCard';
import BtnSquare from '../../../components/buttons/btn-square/btn-square';


function ArtistPage() {
    const userid = localStorage.getItem("userId");
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingsongs, setLoadingsongs] = useState(true);
    const [loadingplaylists, setLoadingplaylists] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [viewsCount, setViewsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);

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
            
            axios.get(`http://localhost:8081/checkFollowStatus/${artistId}/${userid}`)
                .then(response => {
                    setIsFollowing(response.data.isFollowing);
                })
                .catch(error => {
                    console.error('Error fetching follow status:', error);
                });


        }
    }, [artistId]);

    useEffect(() => {
        axios.get(`http://localhost:8081/ViewsNumber/${userid}`)
            .then(response => {
                setViewsCount(response.data[0]['views']);
            })
            .catch(error => {
                console.error('Error fetching view Number count:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8081/FollowersNumber/${userid}`)
            .then(response => {
                setFollowersCount(response.data[0]['COUNT(*)']);
            })
            .catch(error => {
                console.error('Error fetching followers Number count:', error);
            });
    }, []);

    const handleClick = () => {
        if (isFollowing) {
            // Unfollow
            axios.delete(`http://localhost:8081/unfollowUser/${userid}/${artistId}`)
                .then(response => {
                    setIsFollowing(false);
                })
                .catch(error => {
                    console.error('Error unfollowing artist:', error);
                });
        } else {
            // Follow
            axios.post(`http://localhost:8081/followUser`, {
                userId: userid,
                followerId: artistId
            })
                .then(response => {
                    setIsFollowing(true);
                })
                .catch(error => {
                    console.error('Error following artist:', error);
                });
        }
    };


    return (
        <>{ !loading && !loadingsongs && !loadingplaylists ? (
        <div className='artist-content'>
            <ArtHeader image={`http://localhost:8081/uploads/images/Profiles/${artist.profileImage}`} icon='bxs-badge-check' name={artist.username} type='Artist' subtitle={`${followersCount} Followers | ${viewsCount} listeners`} />
            <div className='d-flex align-items-center'>
                <BtnCircle icon='bx-play' />
                {isFollowing ? (
                    <div onClick={handleClick}>
                        <BtnSquare btnContent="Following"/>
                    </div>
                    ) : (
                    <div onClick={handleClick}>
                        <BtnSquare btnContent="Follow" />
                    </div>
                )}
            </div>
            <h1 className='mx-5'>Popular</h1>
            <div className='topMusic my-5'>
                {songs.map((song,index) => (
                    <MusicInfo key={song.song_id} index={index} image={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} name={song.title} PlayNumber={song.views_count} duration={song.duration} songId={song.song_id} />
                ))}
            </div>
            <h1 className='ms-5 mb-5'>PlayLists</h1>
            <div className='card-container play-container'>
                {playlists.map((playlist) => (
                    <PlaylistCard playlistId={playlist.playlist_id} image={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} title={playlist.title} subtitle={artist.username} playlistid={playlist.playlist_id}/>
                ))}
            </div>
            <div className='bottomPage'></div>
        </div >
        ) :
        ''
        }
        </>
    )
}

export default ArtistPage