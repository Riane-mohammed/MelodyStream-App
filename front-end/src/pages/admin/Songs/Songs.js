import React, { useEffect, useState } from 'react';
import './Songs.css';
import axios from 'axios';

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8081/songs')
            .then(response => {
                setSongs(response.data);
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

    return (
        <div className="songs my-5">
            <div className="cardHeader">
                <h2>Songs</h2>
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
                            AllSongs.map((song) =>
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
