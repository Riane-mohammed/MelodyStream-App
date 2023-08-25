import React, { useState } from 'react';
import axios from 'axios';

const AddSongForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        file: null,
        image: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const songData = new FormData();
        for (const key in formData) {
            songData.append(key, formData[key]);
        }

        try {
            await axios.post('http://localhost:8081/add-songs', songData);
            setFormData({
                title: '',
                artist: '',
                album: '',
                genre: '',
                file: null,
                image: null,
            });
            alert('Song added successfully!');
        } catch (error) {
            console.error('Error adding song:', error);
            alert('An error occurred while adding the song.');
        }
    };

    return (
        <div>
            <h2>Add a New Song</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

                <label>Artist:</label>
                <input type="text" name="artist" value={formData.artist} onChange={handleInputChange} />

                <label>Album:</label>
                <input type="text" name="album" value={formData.album} onChange={handleInputChange} />

                <label>Genre:</label>
                <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />

                <label>Audio File:</label>
                <input type="file" accept="audio/*" name="file" onChange={handleFileChange} />

                <label>Music Cover Image:</label>
                <input type="file" accept="image/*" name="image" onChange={handleFileChange} />

                <button type="submit">Add Song</button>
            </form>
        </div>
    );
};

export default AddSongForm;
