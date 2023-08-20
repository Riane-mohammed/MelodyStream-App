import React, { useState } from 'react';
import axios from 'axios';

function AddMusic() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('album', album);
        formData.append('genre', genre);
        formData.append('file', file);

        try {
        await axios.post('http://localhost:8081/add-song', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        setTitle('');
        setArtist('');
        setAlbum('');
        setGenre('');
        setFile(null);
        } catch (error) {
        console.error('Error adding song:', error);
        }
    };

    return (
        <div>
        <h2>Add Music</h2>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Artist</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />

            <label>Album</label>
            <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />

            <label>Genre</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />

            <label>Audio File</label>
            <input type="file" accept="audio/*" onChange={handleFileChange} required />

            <button type="submit">Add Song</button>
        </form>
        </div>
    );
}

export default AddMusic;
