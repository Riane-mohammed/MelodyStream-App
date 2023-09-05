import React, { useEffect, useState } from 'react';
import './Songs.css';
import axios from 'axios';

const Songs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedSongs, setDisplayedSongs] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8081/songs')
            .then(response => {
                setSongs(response.data);
                setDisplayedSongs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const deleteSong = (songId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this song?');

        if (confirmDelete) {
            axios.delete(`http://localhost:8081/songs/${songId}`)
                .then(() => {
                    setSongs(songs.filter(song => song.song_id !== songId));
                })
                .catch(error => {
                    console.error('Error deleting song:', error);
                });
        }
    };

    const AllSongs = loading ? [] : songs;

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        const filteredSongs = songs.filter(
            song => song.title.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedSongs(filteredSongs);
    };
    return (
        <div className="songs my-5">
            <div className="cardHeader">
                <h2>Songs</h2>
            </div>
            <div className='ms-3 ms-sm-5 '>
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
                        <td className='text-start'>Name</td>
                        <td className='text-center'>Artist</td>
                        <td className='text-center'>views</td>
                        <td className='text-center'>Date</td>
                        <td className='text-center'>Actions</td>
                    </tr>
                </thead>

                <tbody>
                    {
                            displayedSongs.map((song) =>
                                <tr key={song.song_id}>
                                    <td><img src={`http://localhost:8081/uploads/images/MusicCover/${song.Image}`} alt={song.name} /></td>
                                    <td className='text-start'>{song.title}</td>
                                    <td className='text-center'>{song.username}</td>
                                    <td className='text-center'>{song.views_count}</td>
                                    <td className='text-center'>25 juillet</td>
                                    <td className='d-flex justify-content-center'>
                                        <button className='btn btn-danger' onClick={() => deleteSong(song.song_id)}>
                                            <i className='bx bx-trash text-white'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                </tbody>
            </table>
        </div>
    );
}

export default Songs;
