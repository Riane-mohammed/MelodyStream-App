import React, { useEffect, useState } from 'react';
import './Playlists.css';
import axios from 'axios';

const PlaylistsAdmin = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [Playlists, setPlaylists] = useState([]);
    const [displayedPlaylists, setDisplayedPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCount, setLoadingCount] = useState(true);
    const [loadingLikes, setLoadingLikes] = useState(true);
    const [playlistsCount, setPlaylistsCount] = useState([]);
    const [playlistsLikesCount, setPlaylistsLikesCount] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/Playlists')
            .then(response => {
                setPlaylists(response.data);
                setDisplayedPlaylists(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const deletePlaylist = (playlistid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');

        if (confirmDelete) {
            axios.delete(`http://localhost:8081/Playlists/${playlistid}`)
                .then(() => {
                    setPlaylists(Playlists.filter(playlist => playlist.playlist_id !== playlistid));
                })
                .catch(error => {
                    console.error('Error deleting song:', error);
                });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8081/PlaylistsSongsNumber')
            .then(response => {
                setPlaylistsCount(response.data);
                setLoadingCount(false)
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoadingCount(false)
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8081/AllPlaylistsLikes')
            .then(response => {
                setPlaylistsLikesCount(response.data);
                setLoadingLikes(false)
            })
            .catch(error => {
                console.error('Error fetching user count:', error);
                setLoadingLikes(false)
            });
    }, []);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredPlaylists = Playlists.filter(
            playlist => playlist.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedPlaylists(filteredPlaylists);
    };

    return (
    <>
        {!loading && !loadingCount && !loadingLikes ? (
        <div className="playlists my-5">
            <div className="cardHeader">
                <h2>Playlists</h2>
            </div>
                <div className='ms-3 ms-sm-5'>
                    <li className="search-box">
                        <i className="bx bx-search icon"></i>
                        <input
                            type="text"
                            placeholder="Search ..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </li>
                </div>
            <table>
                <thead>
                    <tr>
                        <td>Cover</td>
                        <td className='text-start'>Title</td>
                        <td className='text-center'>Created By</td>
                        <td className='text-center'>Likes</td>
                        <td className='text-center'>Number of songs</td>
                        <td className='text-center'>Date</td>
                        <td className='text-center'>Actions</td>
                    </tr>
                </thead>

                <tbody>
                    {
                            displayedPlaylists.map((playlist, index) =>
                                <tr key={playlist.playlist_id}>
                                    <td><img src={`http://localhost:8081/uploads/images/PlaylistCover/${playlist.CoverImage}`} alt={playlist.name} /></td>
                                    <td className='text-start'>{playlist.title}</td>
                                    <td className='text-center'>{playlist.username}</td>
                                    <td className='text-center'>{playlistsLikesCount[0]['COUNT(*)']}</td>
                                    <td className='text-center'>{playlistsCount[0]['COUNT(*)']}</td>
                                    <td className='text-center'>{playlist.created_at.substring(0, 10)}</td>
                                    <td className='d-flex justify-content-center'>
                                        <button className='btn btn-danger' onClick={() => deletePlaylist(playlist.playlist_id)}>
                                            <i className='bx bx-trash text-white'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
                </div>
                ) : ''}</>
    );
}

export default PlaylistsAdmin;
